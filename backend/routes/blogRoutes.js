import express from 'express';
import Blog from '../models/Blog.js';
import { protect, admin } from '../middleware/auth.js';

const router = express.Router();

// @desc    Get all blogs
// @route   GET /api/blogs
// @access  Public
router.get('/', async (req, res) => {
  const { category } = req.query;

  try {
    let blogs = await Blog.find({});
    
    if (category) {
      blogs = blogs.filter(b => b.category.toLowerCase() === category.toLowerCase());
    }

    res.json(blogs);
  } catch (error) {
    console.error('Fetch blogs error:', error.message);
    res.status(500).json({ message: 'Failed to retrieve blogs.' });
  }
});

// @desc    Get single blog by ID
// @route   GET /api/blogs/:id
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({ message: 'Blog article not found.' });
    }
    res.json(blog);
  } catch (error) {
    console.error('Fetch blog error:', error.message);
    res.status(500).json({ message: 'Failed to fetch blog article.' });
  }
});

// @desc    Create new blog post
// @route   POST /api/blogs
// @access  Private/Admin
router.post('/', protect, admin, async (req, res) => {
  try {
    const newBlog = await Blog.create(req.body);
    res.status(201).json({
      message: 'Blog post created successfully',
      blog: newBlog
    });
  } catch (error) {
    console.error('Create blog error:', error.message);
    res.status(500).json({ message: 'Failed to publish blog post.' });
  }
});

// @desc    Update a blog post
// @route   PUT /api/blogs/:id
// @access  Private/Admin
router.put('/:id', protect, admin, async (req, res) => {
  try {
    const updated = await Blog.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) {
      return res.status(404).json({ message: 'Blog article not found.' });
    }
    res.json({
      message: 'Blog post updated successfully',
      blog: updated
    });
  } catch (error) {
    console.error('Update blog error:', error.message);
    res.status(500).json({ message: 'Failed to update blog post.' });
  }
});

// @desc    Delete a blog post
// @route   DELETE /api/blogs/:id
// @access  Private/Admin
router.delete('/:id', protect, admin, async (req, res) => {
  try {
    const deleted = await Blog.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: 'Blog article not found.' });
    }
    res.json({ message: 'Blog post deleted successfully' });
  } catch (error) {
    console.error('Delete blog error:', error.message);
    res.status(500).json({ message: 'Failed to delete blog post.' });
  }
});

export default router;
