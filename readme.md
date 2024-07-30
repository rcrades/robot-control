# Robot Dashboard

## To Run
This setup allows you to:
1. Run the frontend with npm run dev
2. Run the backend with npm run backend
3. Run both concurrently with npm run dev:all


## Overview
The Robot Dashboard is a web-based application designed to monitor and control autonomous robots in real-time. It provides a user-friendly interface for visualizing robot positions, sensor data, and operational status.

## Key Features
1. Real-time Robot Tracking
2. Interactive Mapping
3. Sensor Data Visualization
4. Task Management
5. Alert System

## Layout and Functionality
The Robot Dashboard is divided into four main sections:

1. **Header Bar**:
    - Located at the top of the page.
    - Contains the application title, a search bar for filtering robots, and a menu button.
    - The search bar allows users to quickly find robots by name.
    - The menu button toggles the visibility of the sidebar.

2. **Robot List (Left Sidebar)**:
    - Positioned on the left side of the screen.
    - Displays a list of all robots with their name, model, status, and battery level.
    - Each robot item is clickable, allowing users to select a robot and view its details in the right info panel.
    - The sidebar can be hidden or shown using the menu button in the header.

3. **Map (Center)**:
    - Occupies the central part of the screen.
    - Displays the real-time locations of all robots on an interactive map.
    - Users can zoom, pan, and click on map markers to view robot details.
    - The map updates continuously to reflect the current positions of the robots.

4. **Robot Info Panel (Right Sidebar)**:
    - Located on the right side of the screen.
    - Shows detailed information about the selected robot, including its status, battery level, model, and last maintenance date.
    - The panel is initially hidden and expands when a robot is selected from the list or map.
    - Users can close the panel to return to the full map view.


This layout ensures a user-friendly interface for monitoring and controlling robots in real-time, providing quick access to essential information and controls.

## Mapping Functionality
Our mapping system is a core feature of the Robot Dashboard, offering:

- Real-time Updates: The map refreshes continuously, showing current robot positions.
- Interactive Elements: Users can zoom, pan, and click on robots for detailed information.
- Obstacle Visualization: Detected obstacles are displayed on the map.
- Path Planning: Planned and executed robot paths are visible.
- Multi-floor Support: For buildings with multiple levels, users can switch between floor plans.

## How It Works
1. Data Collection: Robots continuously send telemetry data to the server.
2. Data Processing: The server processes incoming data and updates the database.
3. Web Interface: The dashboard fetches data from the server and renders it in the browser.
4. User Interaction: Operators can send commands back to the robots through the interface.

## Technologies Used
- TBD

## Getting Started
- if local, run vercel dev
- if deployed, navigate to https://robot-control-coral.vercel.app/

## Contributing
Please read CONTRIBUTING.md for details on our code of conduct and the process for submitting pull requests.

## License
This project is licensed under the MIT License - see the LICENSE.md file for details.



## API and server
- codebase has a pages/api/kv-robots.ts file that is used to fetch data from the server, but currently the json is stored in a facility that is read-only; as a result we can currently read data via the API but can not write to. We are now working on migration to vercel kv which will enable us to write to the json file.
- to get that working I'll need to run npx ts-node scripts/init-kv.ts in the terinal.
- Vercel KV has already provided you with a `.env.development.local` file containing the necessary environment variables. This file should be in your project root.
- When using these variables in your code, you'll typically use KV_REST_API_URL and KV_REST_API_TOKEN for REST API operations, and KV_URL for Redis client operations.



## Future Steps for KV Integration

1. Update `pages/api/kv-robots.ts`:
   - This file currently uses the local JSON file. It should be updated to use Vercel KV for all CRUD operations.
   - Status = complete

2. Review and update `src/components/AddRobot.tsx`:
   - Ensure it's using the new KV-based API endpoint for adding robots.
   - Status = to do

3. Update `src/components/RobotDetails.tsx`:
   - If it has any direct data manipulation, ensure it's using the KV-based API.
   - Status = to do

4. Review `src/components/RobotList.tsx`:
   - Confirm it's fetching data from the new KV-based API endpoint.
   - Status = complete

5. Check `src/components/Map.tsx`:
   - If it's fetching or updating robot locations, ensure it's using the KV-based API.
   - Status = to do

6. Update any utility functions or services:
   - Look for any files in `src/utils` or `src/services` that might be handling data operations and update them to use the KV-based API.
   - Status = to do

7. Review and update error handling:
   - Ensure all components and API routes have appropriate error handling for KV operations.
   - Status = to do

8. Update tests:
   - Any unit or integration tests that mock API calls will need to be updated to reflect the new KV-based API structure.
   - Status = to do

9. Create migration script:
   - Develop a script to migrate existing data from the JSON file to Vercel KV, and then run it.
   - Status = complete

10. Update documentation:
    - Ensure all documentation reflects the new KV-based data storage and API structure.
    - Status = to do

11. Environment variable management:
    - Ensure all necessary environment variables are set up in your Vercel project settings for production deployment.
    - Status = complete

12. Performance optimization:
    - After implementation, monitor and optimize KV usage to ensure efficient data retrieval and storage.
    - Status = to do

13. Other Items
    - Update pages/api/kv-robots.ts to use Vercel KV instead of the local file system.
Test your GET and POST routes to ensure they're working with the KV database.
Update any other parts of your application that were previously interacting with the local JSON file to now use the API routes that interact with KV.

Remember to test thoroughly after each update to ensure the application works as expected with the new KV-based data storage.

Note: The API endpoint for robot operations has been changed from `/api/robots` to `/api/kv-robots`. Ensure all components are updated to use the new endpoint.