const dataPath = '../public/data/robot_assets.json';
const fs = require('fs');
const path = require('path');

let robots = [];

function loadRobots() {
  try {
    const data = fs.readFileSync(dataPath, 'utf8');
    const parsedData = JSON.parse(data);
    robots = Array.isArray(parsedData.robots) ? parsedData.robots : [];
  } catch (err) {
    console.error('Error reading or parsing file:', err);
    robots = [];
  }
}

function addRobot(newRobot) {
  console.log('Adding new robot:', newRobot);
  loadRobots(); // Ensure we have the latest data
  console.log('Robots before adding:', robots);
  if (!Array.isArray(robots)) {
    console.error('robots is not an array, initializing it');
    robots = [];
  }
  
  // Find the highest existing ID
  const highestId = robots.reduce((max, robot) => {
    const idNumber = parseInt(robot.id.slice(3));
    return idNumber > max ? idNumber : max;
  }, 0);
  
  // Generate a new unique ID
  const newId = `HRM${(highestId + 1).toString().padStart(3, '0')}`;
  
  const robotWithId = { 
    id: newId,
    ...newRobot
  };
  robots.push(robotWithId);
  console.log('Robots after adding:', robots);
  fs.writeFileSync(dataPath, JSON.stringify({ robots }, null, 2));
  return robotWithId;
}

function getRobotById(id) {
  const robots = getAllRobots();
  console.log('Looking for robot with id:', id); // Add this line
  console.log('Available robots:', robots); // Add this line
  const robot = robots.find(robot => robot.id === id);
  console.log('Found robot:', robot); // Add this line
  return robot;
}

function updateRobot(id, updatedRobot) {
  const robots = getAllRobots();
  const index = robots.findIndex(robot => robot.id === id);
  if (index !== -1) {
    robots[index] = { ...robots[index], ...updatedRobot };
    fs.writeFileSync(dataPath, JSON.stringify({ robots }, null, 2));
    return robots[index];
  }
  return null;
}

function deleteRobot(id) {
  const robots = getAllRobots();
  const index = robots.findIndex(robot => robot.id === id);
  if (index !== -1) {
    robots.splice(index, 1);
    fs.writeFileSync(dataPath, JSON.stringify({ robots }, null, 2));
    return true;
  }
  return false;
}

// Define the getAllRobots function
function getAllRobots() {
  loadRobots();
  return robots;
}

module.exports = {
  getAllRobots,
  addRobot,
  getRobotById,
  updateRobot,
  deleteRobot,
};