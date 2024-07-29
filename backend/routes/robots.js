const express = require('express');
const router = express.Router();
const robotData = require('../data/robotData');

// GET /api/robots: Retrieve all robots
router.get('/', (req, res) => {
  try {
    const robots = robotData.getAllRobots();
    res.json(robots);
  } catch (error) {
    console.error('Error in GET /api/robots:', error);
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
});

// GET /api/robots/:id: Retrieve a specific robot
router.get('/:id', (req, res) => {
  try {
    const robot = robotData.getRobotById(req.params.id);
    if (robot) {
      res.json(robot);
    } else {
      res.status(404).json({ message: 'Robot not found' });
    }
  } catch (error) {
    console.error('Error in GET /api/robots/:id:', error);
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
});

// POST /api/robots: Add a new robot
router.post('/', (req, res) => {
  try {
    console.log('Received POST request with body:', req.body);
    const newRobot = robotData.addRobot(req.body);
    console.log('New robot added:', newRobot);
    res.status(201).json(newRobot);
  } catch (error) {
    console.error('Error in POST /api/robots:', error);
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
});

// PUT /api/robots/:id: Update an existing robot
router.put('/:id', (req, res) => {
  try {
    const updatedRobot = robotData.updateRobot(req.params.id, req.body);
    if (updatedRobot) {
      res.json(updatedRobot);
    } else {
      res.status(404).json({ message: 'Robot not found' });
    }
  } catch (error) {
    console.error('Error in PUT /api/robots/:id:', error);
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
});

// DELETE /api/robots/:id: Delete a robot
router.delete('/:id', (req, res) => {
  try {
    const deleted = robotData.deleteRobot(req.params.id);
    if (deleted) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: 'Robot not found' });
    }
  } catch (error) {
    console.error('Error in DELETE /api/robots/:id:', error);
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
});

module.exports = router;