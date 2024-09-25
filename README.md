# Dashboard Sensor IoT
  ## Overview
  The Dashboard Sensor IoT is a real-time web application designed to display temperature sensor data using Node.js + Express on the backend and React + Chart.js on the frontend. 
  The application simulates sensor data and updates the dashboard every 5 seconds using Socket.io for real-time communication.
 ## Features
 - Real-time temperature data display from 5 sensors
 - Ability to toggle (show/hide) data for each sensor
 -  Supports Dark Mode and Light Mode
 -  Real-time communication between backend and frontend using Socket.io

# Installation
  ## Prerequisites
    Before you begin, ensure you have the following installed:
   -  Node.js (Version 14.x or higher)
   -  Git
   -  npm (Comes pre-installed with Node.js)
## Installation Steps
  ### Clone this repository from GitHub:
  - git clone https://github.com/fossi13/dashboard-temperature-iot
  - cd dashboard-temperature-iot
  ### Install dependencies for the Backend:
  - cd server
  - npm install
  ### Install dependencies for the Frontend:
  - cd client
  - npm install

  ## Running the Project
  ### Backend (Server):
    Navigate to the server folder and run:
  - npm start
  - The server will start at http://localhost:3001 and will send real-time sensor data using Socket.io.

  ### Frontend (Client):
    Navigate to the client folder and run:
  - npm start
  - The frontend application will start at http://localhost:3000.

  # Usage
   - Open your browser and go to http://localhost:3000
   - You will see a real-time graph displaying temperature data from 5 sensors.
   - You can click on the buttons representing each sensor to toggle (show/hide) the data of that sensor from both the graph and the details section on the right.
 
 
 # Technologies Used
  ## Frontend:
  - React
  - Tailwind CSS
  - Chart.js
  - Socket.io (client-side)
  ## Backend:
  - Node.js
  - Express.js
  - Socket.io (server-side)
  - CORS
    

# Contact
    If you have any questions or suggestions regarding this project, feel free to contact me at:
- Email: lizl3eth03@gmail.com

 
