import express from 'express';
import Event from '../models/Event.js';
import { protect, admin } from '../middleware/auth.js';

const router = express.Router();

// @desc    Get all events
// @route   GET /api/events
// @access  Public
router.get('/', async (req, res) => {
  try {
    const events = await Event.find({});
    res.json(events);
  } catch (error) {
    console.error('Fetch events error:', error.message);
    res.status(500).json({ message: 'Failed to retrieve events.' });
  }
});

// @desc    Register for an event
// @route   POST /api/events/:id/register
// @access  Public
router.post('/:id/register', async (req, res) => {
  const { name, email, phone } = req.body;

  if (!name || !email) {
    return res.status(400).json({ message: 'Name and email are required to register for events.' });
  }

  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).json({ message: 'Event details not found.' });
    }

    // Check if email already registered
    const alreadyRegistered = event.registrations?.some(r => r.email === email);
    if (alreadyRegistered) {
      return res.status(400).json({ message: 'You have already registered for this event!' });
    }

    const registration = {
      name,
      email,
      phone: phone || '',
      registeredAt: new Date()
    };

    const updated = await Event.findByIdAndUpdate(
      req.params.id,
      {
        $push: { registrations: registration }
      },
      { new: true }
    );

    res.status(200).json({
      message: 'Successfully registered for this event! Check your email for joining coordinates.',
      event: updated
    });
  } catch (error) {
    console.error('Register event error:', error.message);
    res.status(500).json({ message: 'Failed to process event registration.' });
  }
});

// @desc    Create new event listing
// @route   POST /api/events
// @access  Private/Admin
router.post('/', protect, admin, async (req, res) => {
  try {
    const newEvent = await Event.create(req.body);
    res.status(201).json({
      message: 'Event created successfully',
      event: newEvent
    });
  } catch (error) {
    console.error('Create event error:', error.message);
    res.status(500).json({ message: 'Failed to create event.' });
  }
});

// @desc    Update event details
// @route   PUT /api/events/:id
// @access  Private/Admin
router.put('/:id', protect, admin, async (req, res) => {
  try {
    const updated = await Event.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) {
      return res.status(404).json({ message: 'Event not found.' });
    }
    res.json({
      message: 'Event details updated successfully',
      event: updated
    });
  } catch (error) {
    console.error('Update event error:', error.message);
    res.status(500).json({ message: 'Failed to update event details.' });
  }
});

// @desc    Delete event listing
// @route   DELETE /api/events/:id
// @access  Private/Admin
router.delete('/:id', protect, admin, async (req, res) => {
  try {
    const deleted = await Event.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: 'Event not found.' });
    }
    res.json({ message: 'Event listing deleted successfully' });
  } catch (error) {
    console.error('Delete event error:', error.message);
    res.status(500).json({ message: 'Failed to delete event.' });
  }
});

export default router;
