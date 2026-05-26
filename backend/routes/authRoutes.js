import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import User from '../models/User.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || 'bright_spot_secret_key_12345';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const UPLOADS_DIR = path.join(__dirname, '..', 'uploads');

// Ensure uploads folder exists
if (!fs.existsSync(UPLOADS_DIR)) {
  fs.mkdirSync(UPLOADS_DIR, { recursive: true });
}

// Multer Storage Configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, UPLOADS_DIR);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname.replace(/\s+/g, '_')}`);
  }
});

const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
  fileFilter: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    if (ext === '.pdf' || ext === '.doc' || ext === '.docx' || ext === '.jpg' || ext === '.png' || ext === '.jpeg') {
      cb(null, true);
    } else {
      cb(new Error('Only document files (PDF, DOC, DOCX) and image files (JPG, PNG) are allowed!'));
    }
  }
});

// @desc    Register a new student
// @route   POST /api/auth/signup
// @access  Public
router.post('/signup', async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists with this email address' });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role: 'student',
      documents: [],
      notifications: [{
        title: 'Welcome to Bright Spot!',
        message: 'Your educational consultancy profile has been successfully created. Explore universities and start your global admission journey!',
        isRead: false
      }]
    });

    const token = jwt.sign({ id: user._id || user.id }, JWT_SECRET, { expiresIn: '30d' });

    res.status(201).json({
      _id: user._id || user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      token
    });
  } catch (error) {
    console.error('Signup error:', error.message);
    res.status(500).json({ message: 'Server error during signup operations.' });
  }
});

// @desc    Authenticate User & get token
// @route   POST /api/auth/login
// @access  Public
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password.' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password.' });
    }

    const token = jwt.sign({ id: user._id || user.id }, JWT_SECRET, { expiresIn: '30d' });

    res.json({
      _id: user._id || user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      token
    });
  } catch (error) {
    console.error('Login error:', error.message);
    res.status(500).json({ message: 'Server error during authentication.' });
  }
});

// @desc    Get current user profile details
// @route   GET /api/auth/profile
// @access  Private
router.get('/profile', protect, async (req, res) => {
  try {
    const user = await User.findById(req.user._id || req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'Profile not found.' });
    }
    
    // Omit password
    const { password, ...userData } = user;
    res.json(userData);
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve profile.' });
  }
});

// @desc    Upload documents to student portfolio
// @route   POST /api/auth/upload-doc
// @access  Private
router.post('/upload-doc', protect, upload.single('document'), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'Please upload a file' });
  }

  try {
    const docUrl = `/uploads/${req.file.filename}`;
    const newDoc = {
      name: req.body.name || req.file.originalname,
      url: docUrl
    };

    const updatedUser = await User.findByIdAndUpdate(
      req.user._id || req.user.id,
      {
        $push: { documents: newDoc }
      },
      { new: true }
    );

    res.json({
      message: 'Document uploaded successfully',
      document: newDoc,
      documents: updatedUser.documents
    });
  } catch (error) {
    console.error('Document upload error:', error.message);
    res.status(500).json({ message: 'Failed to register file upload.' });
  }
});

// @desc    Clear or read notifications
// @route   PUT /api/auth/notifications/read
// @access  Private
router.put('/notifications/read', protect, async (req, res) => {
  try {
    const user = await User.findById(req.user._id || req.user.id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    const notifications = user.notifications.map(n => ({ ...n, isRead: true }));
    await User.findByIdAndUpdate(req.user._id || req.user.id, { notifications });
    
    res.json({ message: 'All notifications marked as read', notifications });
  } catch (error) {
    res.status(500).json({ message: 'Failed to update notification logs.' });
  }
});

export default router;
