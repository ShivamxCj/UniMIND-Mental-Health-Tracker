



import React, { useState, useEffect } from "react";
import { Trash2 } from "lucide-react";

export default function CommunityForum() {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState("");
  const [category, setCategory] = useState("General");
  const [isAnonymous, setIsAnonymous] = useState(false);

  const categories = [
    "General",
    "Stress & Exams",
    "Anxiety & Sleep",
    "Motivation",
    "Wellness Activities",
  ];

  // Load posts from localStorage
  useEffect(() => {
    const savedPosts = JSON.parse(localStorage.getItem("forumPosts")) || [];
    setPosts(savedPosts);
  }, []);

  // Save posts to localStorage whenever updated
  useEffect(() => {
    localStorage.setItem("forumPosts", JSON.stringify(posts));
  }, [posts]);

  const handleAddPost = () => {
    if (newPost.trim() === "") return;
    const post = {
      id: Date.now(),
      text: newPost,
      category,
      author: isAnonymous ? "Anonymous" : "Student",
      likes: 0,
      comments: [],
    };
    setPosts([post, ...posts]);
    setNewPost("");
  };

  const handleLike = (id) => {
    setPosts(
      posts.map((p) =>
        p.id === id ? { ...p, likes: p.likes + 1 } : p
      )
    );
  };

  const handleAddComment = (id, comment) => {
    if (comment.trim() === "") return;
    setPosts(
      posts.map((p) =>
        p.id === id
          ? { ...p, comments: [...p.comments, comment] }
          : p
      )
    );
  };

  const handleDelete = (id) => {
    setPosts(posts.filter((p) => p.id !== id));
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
     <h1 className="text-4xl font-bold tracking-tight text-center mb-6 text-gray-800">
        Community Forum
      </h1>

      {/* New Post Section */}
      <div className="bg-white p-4 rounded-xl shadow-md mb-6">
        <textarea
          className="w-full border rounded-lg p-2 mb-3 focus:ring-2 focus:ring-indigo-400"
          placeholder="Share your thoughts, experiences, or questions..."
          value={newPost}
          onChange={(e) => setNewPost(e.target.value)}
        />

        <div className="flex flex-wrap items-center gap-3 mb-3">
          <select
            className="border p-2 rounded-lg"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            {categories.map((cat) => (
              <option key={cat}>{cat}</option>
            ))}
          </select>

          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={isAnonymous}
              onChange={(e) => setIsAnonymous(e.target.checked)}
            />
            Post as Anonymous
          </label>
        </div>

        <button
          className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
          onClick={handleAddPost}
        >
          Post
        </button>
      </div>

      {/* Posts */}
      {posts.length === 0 ? (
        <p className="text-gray-500 text-center">
          No posts yet. Be the first to share something!
        </p>
      ) : (
        posts.map((post) => (
          <div
            key={post.id}
            className="bg-white p-4 mb-4 rounded-xl shadow-md"
          >
            <div className="flex justify-between mb-2">
              <span className="font-semibold text-indigo-600">
                {post.author}
              </span>
              <div className="flex items-center gap-2">
                <span className="text-sm bg-indigo-100 text-indigo-700 px-2 py-1 rounded-lg">
                  {post.category}
                </span>
                <button
                  onClick={() => handleDelete(post.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
            <p className="mb-3 text-gray-800">{post.text}</p>

            <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
              <button
                className="flex items-center gap-1 hover:text-indigo-600"
                onClick={() => handleLike(post.id)}
              >
                👍 {post.likes}
              </button>
            </div>

            {/* Comments */}
            <div className="ml-4">
              {post.comments.map((c, i) => (
                <p
                  key={i}
                  className="bg-gray-100 p-2 rounded-lg mb-2 text-sm"
                >
                  💬 {c}
                </p>
              ))}

              <CommentBox
                onAdd={(comment) => handleAddComment(post.id, comment)}
              />
            </div>
          </div>
        ))
      )}
    </div>
  );
}

// Comment Input Box
function CommentBox({ onAdd }) {
  const [comment, setComment] = useState("");
  return (
    <div className="flex gap-2 mt-2">
      <input
        type="text"
        placeholder="Write a comment..."
        className="flex-1 border rounded-lg p-2 text-sm"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />
      <button
        className="bg-gray-200 px-3 rounded-lg text-sm hover:bg-gray-300"
        onClick={() => {
          if (comment.trim() === "") return;
          onAdd(comment);
          setComment("");
        }}
      >
        Send
      </button>
    </div>
  );
}

