import express from 'express';
import Testimonial from '../models/Testimonial.js';
import { protect, admin } from '../middleware/auth.js';

const router = express.Router();

// @desc    Get all testimonials
// @route   GET /api/testimonials
// @access  Public
router.get('/', async (req, res) => {
  try {
    const testimonials = await Testimonial.find({});
    res.json(testimonials);
  } catch (error) {
    console.error('Fetch testimonials error:', error.message);
    res.status(500).json({ message: 'Failed to retrieve testimonials.' });
  }
});

// @desc    Create a student testimonial
// @route   POST /api/testimonials
// @access  Public (students can submit reviews)
router.post('/', async (req, res) => {
  try {
    const testimonial = await Testimonial.create(req.body);
    res.status(201).json({
      message: 'Thank you for your feedback! Your review has been saved.',
      testimonial
    });
  } catch (error) {
    console.error('Create testimonial error:', error.message);
    res.status(500).json({ message: 'Failed to process testimonial review.' });
  }
});

// @desc    Delete a testimonial
// @route   DELETE /api/testimonials/:id
// @access  Private/Admin
router.delete('/:id', protect, admin, async (req, res) => {
  try {
    const deleted = await Testimonial.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: 'Testimonial not found.' });
    }
    res.json({ message: 'Testimonial deleted successfully' });
  } catch (error) {
    console.error('Delete testimonial error:', error.message);
    res.status(500).json({ message: 'Failed to delete testimonial.' });
  }
});

export default router;
