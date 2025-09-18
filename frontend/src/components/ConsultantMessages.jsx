import { useState } from "react";
import { useNavigate } from "react-router-dom";

const ConsultantMessages = () => {
  const navigate = useNavigate();

  // List of students
  const [students] = useState([
    { id: 1, name: "Arjun Singh" },
    { id: 2, name: "Priya Sharma" },
    { id: 3, name: "Rahul Mehta" },
  ]);

  const [selectedStudent, setSelectedStudent] = useState(students[0]);

  // Messages per student (dummy data)
  const [messages, setMessages] = useState({
    1: [
      { sender: "student", text: "Hello Sir, I feel very stressed lately.", time: "10:00 AM" },
      { sender: "consultant", text: "Thanks for reaching out. Can you tell me more?", time: "10:05 AM" },
    ],
    2: [
      { sender: "student", text: "I am confused about my career path.", time: "11:00 AM" },
    ],
    3: [
      { sender: "student", text: "Can we reschedule our session?", time: "12:30 PM" },
    ],
  });

  const [input, setInput] = useState("");

  // Send message
  const handleSend = () => {
    if (!input.trim()) return;

    const newMessage = {
      sender: "consultant",
      text: input,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages({
      ...messages,
      [selectedStudent.id]: [...(messages[selectedStudent.id] || []), newMessage],
    });

    setInput("");
  };

  // Handle Enter key to send
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSend();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-md p-6 flex h-[80vh]">
        {/* Sidebar - Students */}
        <div className="w-1/4 border-r pr-4">
          <h2 className="text-lg font-bold mb-4 text-gray-800">Students</h2>
          <ul className="space-y-2">
            {students.map((student) => (
              <li
                key={student.id}
                onClick={() => setSelectedStudent(student)}
                className={`p-2 rounded-md cursor-pointer ${
                  selectedStudent.id === student.id
                    ? "bg-indigo-100 text-indigo-800 font-semibold"
                    : "hover:bg-gray-100"
                }`}
              >
                {student.name}
              </li>
            ))}
          </ul>
        </div>

        {/* Chat Area */}
        <div className="flex-1 flex flex-col pl-4">
          {/* Header */}
          <div className="flex justify-between items-center border-b pb-3 mb-4">
            <h1 className="text-xl font-bold text-gray-900">
              Chat with {selectedStudent.name}
            </h1>
            <button
              onClick={() => navigate("/consultant")}
              className="bg-gray-100 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-200"
            >
              ⬅ Back to Dashboard
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto space-y-3">
            {(messages[selectedStudent.id] || []).map((msg, i) => (
              <div
                key={i}
                className={`p-3 rounded-lg max-w-[70%] text-sm ${
                  msg.sender === "consultant"
                    ? "bg-indigo-600 text-white ml-auto"
                    : "bg-gray-100 text-gray-800"
                }`}
              >
                <p>{msg.text}</p>
                <span className="block text-xs mt-1 opacity-70">
                  {msg.time}
                </span>
              </div>
            ))}
          </div>

          {/* Input */}
          <div className="flex gap-2 mt-4">
            <input
              type="text"
              placeholder="Type your reply..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyPress}
              className="flex-1 border rounded-lg px-3 py-2"
            />
            <button
              onClick={handleSend}
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConsultantMessages;
