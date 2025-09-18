import { useNavigate } from "react-router-dom";

const ConsultantAppointments = () => {
  const navigate = useNavigate();

  // Dummy appointment data
  const appointments = [
    { id: 1, student: "Arjun Singh", date: "2025-09-20", time: "10:00 AM", status: "Confirmed" },
    { id: 2, student: "Priya Sharma", date: "2025-09-21", time: "2:00 PM", status: "Pending" },
    { id: 3, student: "Rahul Mehta", date: "2025-09-22", time: "4:30 PM", status: "Cancelled" },
    { id: 4, student: "Sneha Verma", date: "2025-09-23", time: "11:30 AM", status: "Confirmed" },
    { id: 5, student: "Karan Yadav", date: "2025-09-23", time: "3:00 PM", status: "Pending" },
    { id: 6, student: "Meera Nair", date: "2025-09-24", time: "1:00 PM", status: "Confirmed" },
   
  ];

  // Function to render status badge (minimal colors)
  const getStatusBadge = (status) => {
    let colorClasses =
      status === "Confirmed"
        ? "text-green-600"
        : status === "Pending"
        ? "text-yellow-600"
        : "text-red-600";

    return (
      <span className={`px-2 py-1 rounded-md text-sm font-medium ${colorClasses}`}>
        {status}
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-5xl mx-auto bg-white rounded-lg shadow-md p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Upcoming Appointments</h1>
          <button
            onClick={() => navigate("/consultant")}
            className="bg-gray-100 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-200"
          >
            ⬅ Back to Dashboard
          </button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full border border-gray-200 rounded-lg overflow-hidden">
            <thead className="bg-gray-100 text-gray-800">
              <tr>
                <th className="p-3 text-left border">Student</th>
                <th className="p-3 text-left border">Date</th>
                <th className="p-3 text-left border">Time</th>
                <th className="p-3 text-left border">Status</th>
                <th className="p-3 text-left border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {appointments.map((appt) => (
                <tr key={appt.id} className="hover:bg-gray-50 transition">
                  <td className="p-3 border font-medium">{appt.student}</td>
                  <td className="p-3 border">{appt.date}</td>
                  <td className="p-3 border">{appt.time}</td>
                  <td className="p-3 border">{getStatusBadge(appt.status)}</td>
                  <td className="p-3 border space-x-2">
                    <button className="px-3 py-1 text-sm bg-indigo-600 text-white rounded hover:bg-indigo-700">
                      View
                    </button>
                    <button className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded hover:bg-gray-200">
                      Reschedule
                    </button>
                    <button className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded hover:bg-gray-200">
                      Cancel
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer Info */}
        <div className="mt-6 text-gray-600 text-sm">
          Showing {appointments.length} scheduled appointments.
        </div>
      </div>
    </div>
  );
};

export default ConsultantAppointments;
