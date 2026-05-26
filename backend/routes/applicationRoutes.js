import express from 'express';
import Application from '../models/Application.js';
import User from '../models/User.js';
import { protect, admin } from '../middleware/auth.js';

const router = express.Router();

// @desc    Get all applications or user specific applications
// @route   GET /api/applications
// @access  Private
router.get('/', protect, async (req, res) => {
  try {
    if (req.user.role === 'admin') {
      const applications = await Application.find({});
      res.json(applications);
    } else {
      const userId = String(req.user._id || req.user.id);
      const applications = await Application.find({ userId });
      res.json(applications);
    }
  } catch (error) {
    console.error('Fetch applications error:', error.message);
    res.status(500).json({ message: 'Failed to retrieve applications.' });
  }
});

// @desc    Submit a new admission application
// @route   POST /api/applications
// @access  Private
router.post('/', protect, async (req, res) => {
  const { 
    universityId, 
    universityName, 
    courseName, 
    userName, 
    userEmail, 
    userPhone, 
    documents 
  } = req.body;

  if (!universityId || !universityName || !courseName) {
    return res.status(400).json({ message: 'University details and course name are required.' });
  }

  try {
    const userId = String(req.user._id || req.user.id);

    const application = await Application.create({
      userId,
      userName: userName || req.user.name,
      userEmail: userEmail || req.user.email,
      userPhone: userPhone || '',
      universityId,
      universityName,
      courseName,
      status: 'Pending',
      documents: documents || []
    });

    // Add alert notification to the student's profile
    const studentNotification = {
      title: 'Application Submitted!',
      message: `Your application for ${courseName} at ${universityName} has been successfully submitted. Our academic consultants will review your files shortly.`,
      isRead: false,
      date: new Date()
    };

    await User.findByIdAndUpdate(userId, {
      $push: { notifications: studentNotification }
    });

    res.status(201).json({
      message: 'Application submitted successfully',
      application
    });
  } catch (error) {
    console.error('Submit application error:', error.message);
    res.status(500).json({ message: 'Failed to submit admission application.' });
  }
});

// @desc    Update application status (Admin only)
// @route   PUT /api/applications/:id
// @access  Private/Admin
router.put('/:id', protect, admin, async (req, res) => {
  const { status, adminComments, admissionLetterUrl } = req.body;

  try {
    const application = await Application.findById(req.params.id);
    if (!application) {
      return res.status(404).json({ message: 'Application not found' });
    }

    const updatedApp = await Application.findByIdAndUpdate(
      req.params.id,
      {
        status: status || application.status,
        adminComments: adminComments !== undefined ? adminComments : application.adminComments,
        admissionLetterUrl: admissionLetterUrl !== undefined ? admissionLetterUrl : application.admissionLetterUrl
      },
      { new: true }
    );

    // Push notification to applicant
    let alertMsg = `Your application status for ${application.courseName} at ${application.universityName} has been updated to "${status}".`;
    if (status === 'Approved') {
      alertMsg += ' Congratulations! Your provisional admission letter is ready for download in your dashboard.';
    }

    const updateNotification = {
      title: 'Application Status Update',
      message: alertMsg,
      isRead: false,
      date: new Date()
    };

    await User.findByIdAndUpdate(application.userId, {
      $push: { notifications: updateNotification }
    });

    res.json({
      message: 'Application updated and student notified.',
      application: updatedApp
    });
  } catch (error) {
    console.error('Update application error:', error.message);
    res.status(500).json({ message: 'Failed to update application details.' });
  }
});

export default router;
