const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');  

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "http://localhost:3000",  
    methods: ["GET", "POST"],
    credentials: true
  }
});


app.use(cors({
  origin: 'http://localhost:3000', 
  methods: ['GET', 'POST'],
  credentials: true
}));

// ฟังก์ชันสุ่มค่าของอุณหภูมิและเวลาที่อ่านค่า
const generateSensorData = () => {
  const sensorData = [];
  for (let i = 1; i <= 5; i++) {
    sensorData.push({
      id: `Sensor-${i}`,
      temperature: (Math.random() * 40).toFixed(2),
      timestamp: new Date().toLocaleTimeString(),
    });
  }
  return sensorData;
};

// ส่งข้อมูลเซ็นเซอร์ไปยัง client ทุกๆ 5 วินาที
io.on('connection', (socket) => {
  console.log('Client connected');
  setInterval(() => {
    socket.emit('sensorData', generateSensorData());
  }, 5000);

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

server.listen(3001, () => {
  console.log('Listening on port 3001');
});
