import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import { Line } from "react-chartjs-2";

function App() {
  const [sensorData, setSensorData] = useState([]);
  const [darkMode, setDarkMode] = useState(false);
  const [hiddenSensors, setHiddenSensors] = useState([]); 

  
  useEffect(() => {
    const socket = io("http://localhost:3001");

    socket.on("sensorData", (data) => {
      setSensorData(data);
    });

    return () => socket.disconnect();
  }, []);

  // ฟังก์ชันสำหรับปิดการแสดงผลเซ็นเซอร์
  const toggleSensor = (sensorId) => {
    setHiddenSensors((prevHiddenSensors) => {
      // (เปิด)
      if (prevHiddenSensors.includes(sensorId)) {
        return prevHiddenSensors.filter((id) => id !== sensorId);
      }
      // (ปิด)
      return [...prevHiddenSensors, sensorId];
    });
  };

  // ข้อมูลสำหรับ Line Chart (แสดงเฉพาะเซ็นเซอร์ที่ไม่ถูกปิด)
  const lineData = {
    labels: sensorData.map((sensor) => sensor.timestamp), // ใช้ timestamp ที่ได้จากเซ็นเซอร์
    datasets:
      sensorData.length > 0
        ? sensorData
            .filter((sensor) => !hiddenSensors.includes(sensor.id)) // แสดงเฉพาะเซ็นเซอร์ที่ไม่ถูกปิด
            .map((sensor, index) => ({
              label: sensor.id,
              data: [sensor.temperature], // แสดงค่าอุณหภูมิของแต่ละเซ็นเซอร์
              borderColor: `rgba(${(index + 1) * 50}, 99, 132, 1)`,
              backgroundColor: `rgba(${(index + 1) * 50}, 99, 132, 0.2)`,
              fill: false,
            }))
        : [],
  };

  return (
    <div
      className={`${
        darkMode ? "bg-gray-900 text-white" : "bg-white text-white"
      } min-h-screen`}
    >
      <header className="p-4 flex justify-between items-center bg-blue-500 text-white">
        <h1 className="text-2xl font-bold">IoT Sensor Dashboard</h1>
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-700"
        >
          Dark Mode
        </button>
      </header>

      {/* ปุ่ม Sensor Controls */}
      <div className="p-4 flex space-x-2">
        {sensorData.map((sensor) => (
          <button
            key={sensor.id}
            onClick={() => toggleSensor(sensor.id)}
            className={`px-4 py-2 rounded ${
              hiddenSensors.includes(sensor.id) ? "bg-gray-400" : "bg-blue-500"
            } text-white`}
          >
            {sensor.id}
          </button>
        ))}
      </div>

      
      <div className="p-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        <div className="lg:col-span-2 bg-white shadow-lg rounded-lg p-4 dark:bg-gray-800">
          <h2 className="text-xl font-semibold mb-4">
            Temperature Data (Line Chart)
          </h2>
          <Line data={lineData} />
        </div>

      
        <div className="bg-white shadow-lg rounded-lg p-4 dark:bg-gray-800">
          <h2 className="text-xl font-semibold mb-4">Sensor Data (Details)</h2>
          <ul>
            {sensorData.map(
              (sensor) =>
                !hiddenSensors.includes(sensor.id) && ( // แสดงเฉพาะเซ็นเซอร์ที่ไม่ได้ถูกปิด
                  <li key={sensor.id} className="mb-4">
                    <div className="text-lg font-medium">
                      Sensor ID: {sensor.id}
                    </div>
                    <div>Temperature: {sensor.temperature} °C</div>
                    <div>Timestamp: {sensor.timestamp}</div>
                  </li>
                )
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;
