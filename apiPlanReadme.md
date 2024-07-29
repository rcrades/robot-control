# Backend API Implementation Plan for Robot Dashboard

## Overview
We will create a server-side API using Node.js and Express to handle CRUD operations for our robot data. This API will interact with the `robot_assets.json` file, allowing us to persist changes made through the frontend.

## Implementation Timeline
**Day 1: Setup and Basic Server**

* Set up the backend environment
* Create the main server file
* Implement basic GET and POST routes

**Day 2: Complete CRUD Operations**

* Implement remaining routes (GET /:id, PUT /:id, DELETE /:id)
* Create the data access layer
* Implement error handling and basic validation

**Day 3: Testing and Frontend Integration**

* Test all API endpoints using Postman
* Update the frontend to use the new API endpoints
* Modify fetchRobots and handleSaveNewRobot functions

**Day 4: Refinement and Deployment**

* Add more robust error handling and input validation
* Prepare for deployment (environment variables, configuration)
* Deploy the backend API to a hosting platform



## Detailed Steps

1. **Set up the backend environment**
   - Create a new directory for the backend (e.g., `robot-api`)
   - Initialize a new Node.js project with `npm init -y`
   - Install necessary dependencies:
     ```
     npm install express cors body-parser
     ```

2. **Create the main server file**
   - Create `server.js` in the root of the backend directory
   - Set up a basic Express server with CORS and body-parser middleware
   - Status = complete

3. **Implement API routes**
   - Create a new file `routes/robots.js` for robot-related routes
   - Implement the following endpoints:
     - GET `/api/robots`: Retrieve all robots
     - GET `/api/robots/:id`: Retrieve a specific robot
     - POST `/api/robots`: Add a new robot
     - PUT `/api/robots/:id`: Update an existing robot
     - DELETE `/api/robots/:id`: Delete a robot
    - Status = complete


4. **Create a data access layer**
   - Create a new file `data/robotData.js`
   - Implement functions to read from and write to the `robot_assets.json` file

5. **Error handling and validation**
   - Implement error handling middleware
   - Add input validation for POST and PUT requests

6. **Testing**
   - Use a tool like Postman to test all API endpoints

7. **Update frontend**
   - Modify the React application to use the new API endpoints instead of directly reading the JSON file
   - Update the `fetchRobots` function to make an API call
   - Modify the `handleSaveNewRobot` function to send a POST request to the API

8. **Deployment**
   - Choose a hosting platform for the backend (e.g., Heroku, DigitalOcean)
   - Set up environment variables for configuration
   - Deploy the backend API

## Detailed Implementation

### 1. Server Setup (server.js)

```javascript
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const robotRoutes = require('./routes/robots');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(bodyParser.json());

app.use('/api/robots', robotRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
```

### 2. Robot Routes (routes/robots.js)

```javascript
const express = require('express');
const router = express.Router();
const robotData = require('../data/robotData');

router.get('/', (req, res) => {
  const robots = robotData.getAllRobots();
  res.json(robots);
});

router.post('/', (req, res) => {
  const newRobot = robotData.addRobot(req.body);
  res.status(201).json(newRobot);
});

// Implement other routes (GET /:id, PUT /:id, DELETE /:id)

module.exports = router;
```

### 3. Data Access (data/robotData.js)

```javascript
const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, '../data/robot_assets.json');

function getAllRobots() {
  const data = fs.readFileSync(dataPath, 'utf8');
  return JSON.parse(data).robots;
}

function addRobot(robot) {
  const robots = getAllRobots();
  const newRobot = {
    ...robot,
    id: `HRM${(robots.length + 1).toString().padStart(3, '0')}`,
  };
  robots.push(newRobot);
  fs.writeFileSync(dataPath, JSON.stringify({ robots }, null, 2));
  return newRobot;
}

// Implement other data access functions

module.exports = {
  getAllRobots,
  addRobot,
  // Export other functions
};
```

### Next Steps
