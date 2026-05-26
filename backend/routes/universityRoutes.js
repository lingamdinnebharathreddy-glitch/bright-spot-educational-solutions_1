import express from 'express';
import University from '../models/University.js';
import { protect, admin } from '../middleware/auth.js';

const router = express.Router();

// @desc    Get all universities with search and filters
// @route   GET /api/universities
// @access  Public
router.get('/', async (req, res) => {
  const { search, course, ranking, maxFee } = req.query;

  try {
    let universities = await University.find({});

    // Filter results programmatically to support rich hybrid database filters uniformly
    if (search) {
      const searchLower = search.toLowerCase();
      universities = universities.filter(u => 
        u.name.toLowerCase().includes(searchLower) || 
        u.location.toLowerCase().includes(searchLower)
      );
    }

    if (course) {
      const courseLower = course.toLowerCase();
      universities = universities.filter(u => 
        u.courses.some(c => c.name.toLowerCase().includes(courseLower))
      );
    }

    if (ranking) {
      const rankNum = parseInt(ranking, 10);
      if (!isNaN(rankNum)) {
        universities = universities.filter(u => {
          const uRank = parseInt(u.rankings?.replace(/[^0-9]/g, '') || '9999', 10);
          return uRank <= rankNum;
        });
      }
    }

    if (maxFee) {
      const maxFeeNum = parseInt(maxFee, 10);
      if (!isNaN(maxFeeNum)) {
        universities = universities.filter(u => 
          u.courses.some(c => c.fee <= maxFeeNum)
        );
      }
    }

    res.json(universities);
  } catch (error) {
    console.error('Fetch universities error:', error.message);
    res.status(500).json({ message: 'Failed to retrieve universities.' });
  }
});

// @desc    Get a single university by ID
// @route   GET /api/universities/:id
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const university = await University.findById(req.params.id);
    if (!university) {
      return res.status(404).json({ message: 'University details not found.' });
    }
    res.json(university);
  } catch (error) {
    console.error('Fetch university detail error:', error.message);
    res.status(500).json({ message: 'Failed to fetch university details.' });
  }
});

// @desc    Create a new university listing
// @route   POST /api/universities
// @access  Private/Admin
router.post('/', protect, admin, async (req, res) => {
  try {
    const university = await University.create(req.body);
    res.status(201).json({
      message: 'University listing created successfully',
      university
    });
  } catch (error) {
    console.error('Create university error:', error.message);
    res.status(500).json({ message: 'Failed to create university listing.' });
  }
});

// @desc    Update a university listing
// @route   PUT /api/universities/:id
// @access  Private/Admin
router.put('/:id', protect, admin, async (req, res) => {
  try {
    const updated = await University.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) {
      return res.status(404).json({ message: 'University not found' });
    }
    res.json({
      message: 'University listing updated successfully',
      university: updated
    });
  } catch (error) {
    console.error('Update university error:', error.message);
    res.status(500).json({ message: 'Failed to update university listing.' });
  }
});

// @desc    Delete a university listing
// @route   DELETE /api/universities/:id
// @access  Private/Admin
router.delete('/:id', protect, admin, async (req, res) => {
  try {
    const deleted = await University.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: 'University not found' });
    }
    res.json({ message: 'University listing deleted successfully' });
  } catch (error) {
    console.error('Delete university error:', error.message);
    res.status(500).json({ message: 'Failed to delete university listing.' });
  }
});

export default router;
