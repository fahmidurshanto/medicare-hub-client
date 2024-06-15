import { useState } from "react";

const Appointments = () => {
  const [appointments, setAppointments] = useState([
    { id: 1, testName: "Blood Test", date: "2024-06-20", time: "10:00 AM" },
    { id: 2, testName: "MRI Scan", date: "2024-06-25", time: "2:00 PM" },
    // Add more appointments as needed
  ]);

  const handleCancel = (id) => {
    setAppointments(
      appointments.filter((appointment) => appointment.id !== id)
    );
  };

  return (
    <div className="card shadow-lg p-4">
      <h2 className="text-2xl mb-4">My Upcoming Appointments</h2>
      <div className="appointment-list">
        {appointments.map((appointment) => (
          <div
            key={appointment.id}
            className="appointment mb-4 p-4 border rounded shadow-sm"
          >
            <p>
              <strong>Test Name:</strong> {appointment.testName}
            </p>
            <p>
              <strong>Date:</strong> {appointment.date}
            </p>
            <p>
              <strong>Time:</strong> {appointment.time}
            </p>
            <button
              className="btn btn-error mt-2"
              onClick={() => handleCancel(appointment.id)}
            >
              Cancel
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Appointments;
