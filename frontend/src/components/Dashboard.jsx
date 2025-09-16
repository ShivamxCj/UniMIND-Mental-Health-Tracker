

import { useState } from "react";
import { Link } from "react-router-dom";
import {
  MessageCircle,
  ClipboardList,
  Bot,
  CheckSquare,
  Video,
  Headphones,
  BookOpen,
  Users,
  Calendar,
  Activity,
  Phone,
  X,
  Send,
} from "lucide-react";

const Dashboard = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Hello 👋 I’m MANn, your mental health companion. How are you feeling today?" },
  ]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages([...messages, { sender: "user", text: input }]);
    setInput("");

    // simple bot reply (for MVP, you can connect AI later)
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "Thanks for sharing 💙 I’m here to support you." },
      ]);
    }, 1000);
  };

  return (
    <div className="  min-h-screen bg-gray-50 px-8 py-10 relative">
      {/* Hero Section */}
      <section className="bg-white rounded-2xl shadow-md p-10 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Your Mental Health Matters
          </h1>
          <p className="text-gray-600 mb-6 text-lg">
            Talk to our AI-guided companion or connect with a counselor –
            confidential, stigma-free, anytime.
          </p>
          <div className="flex gap-4 flex-wrap">
            <button
              onClick={() => setIsChatOpen(true)}
              className="px-6 py-3 rounded-lg bg-gradient-to-r from-pink-500 to-indigo-500 text-white font-semibold flex items-center gap-2 shadow hover:opacity-90"
            >
              <MessageCircle className="w-5 h-5" />
              Start Chat with MANn
            </button>
            <Link
              to="/test/phq9"
              className="px-6 py-3 rounded-lg bg-gray-100 text-gray-700 font-medium flex items-center gap-2 border hover:bg-gray-200"
            >
              <ClipboardList className="w-5 h-5" />
              Take Self-Test
            </Link>
          </div>
        </div>
        <div className="flex justify-center">
          <img
            src="https://cdn-icons-png.flaticon.com/512/4140/4140048.png"
            alt="Mental Health"
            className="w-72 h-72 object-contain"
          />
        </div>
      </section>

      {/* How It Works */}
      <section className="mt-16">
        <h2 className="text-2xl font-bold text-gray-800 mb-8">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            { icon: Bot, text: "Get instant coping tips" },
            { icon: CheckSquare, text: "Know your stress level" },
            { icon: Video, text: "Guides, audios, videos" },
            { icon: Headphones, text: "Talk to a counselor" },
          ].map((item, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition flex flex-col items-center text-center"
            >
              <item.icon className="w-10 h-10 text-indigo-500 mb-3" />
              <p className="text-gray-700 font-medium">{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Quick Access */}
      <section className="mt-16">
        <h2 className="text-2xl font-bold text-gray-800 mb-8">Quick Access</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            { icon: ClipboardList, text: "Self-Test", link: "/test/phq9" },
            { icon: BookOpen, text: "Resources Hub", link: "/resources" },
            { icon: Users, text: "Peer Support Forum", link: "/forum" },
            { icon: Calendar, text: "Book Appointment", link: "/appointments" },
          ].map((item, index) => (
            <Link
              key={index}
              to={item.link}
              className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition flex flex-col items-center text-center"
            >
              <item.icon className="w-10 h-10 text-pink-500 mb-3" />
              <p className="text-gray-700 font-medium">{item.text}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Daily Wellness Tips */}
      <section className="mt-16">
        <h2 className="text-2xl font-bold text-gray-800 mb-8">
          Daily Wellness Tips
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { icon: Activity, text: "Try 5 minutes of breathing" },
            { icon: Activity, text: "Go for a short walk" },
            { icon: Phone, text: "Call a friend" },
          ].map((item, index) => (
            <div
              key={index}
              className="bg-gradient-to-r from-indigo-50 to-purple-50 p-6 rounded-2xl shadow hover:shadow-md transition flex items-center gap-4"
            >
              <item.icon className="w-8 h-8 text-indigo-600" />
              <p className="text-gray-700 font-medium">{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Chatbot Modal */}
      {isChatOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-end z-50">
          <div className="bg-white w-full sm:w-[400px] h-full flex flex-col shadow-2xl">
            {/* Header */}
            <div className="flex justify-between items-center p-4 bg-indigo-600 text-white rounded-t-lg">
              <h3 className="font-semibold">Chat with MANn</h3>
              <button onClick={() => setIsChatOpen(false)}>
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`p-3 rounded-lg max-w-[80%] ${
                    msg.sender === "user"
                      ? "bg-indigo-100 text-right ml-auto"
                      : "bg-gray-100 text-left"
                  }`}
                >
                  {msg.text}
                </div>
              ))}
            </div>

            {/* Input */}
            <div className="p-3 border-t flex gap-2">
              <input
                type="text"
                placeholder="Type a message..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="flex-1 border rounded-lg px-3 py-2 text-sm"
              />
              <button
                onClick={handleSend}
                className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 flex items-center gap-1"
              >
                <Send className="w-4 h-4" />
                Send
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
