import React from "react";
import { Link } from "react-router-dom";

export default function Landing() {
  return (
    <section className="w-full min-h-screen flex flex-col justify-center items-center bg-linear-to-br from-blue-100 via-white to-purple-100">
      <div className="max-w-2xl text-center p-8 bg-white/80 rounded-3xl shadow-2xl border border-gray-200">
        <h1 className="text-5xl font-extrabold font-serif mb-6 text-gray-900 drop-shadow-lg">
          Welcome to <span className="text-blue-600">The Daily Post</span>
        </h1>
        <p className="text-lg text-gray-700 mb-8">
          Discover insightful articles, practical tips, and inspiring stories. Join our community to read, write, and connect with like-minded readers and writers.
        </p>
        <div className="flex flex-col md:flex-row gap-4 justify-center">
          <Link
            to="/signup"
            className="px-8 py-4 rounded-xl bg-blue-600 text-white font-bold text-lg shadow-lg hover:bg-blue-700 transition-all duration-200"
          >
            Get Started
          </Link>
          <Link
            to="/login"
            className="px-8 py-4 rounded-xl bg-white text-blue-700 border border-blue-600 font-bold text-lg shadow-lg hover:bg-blue-50 transition-all duration-200"
          >
            Login
          </Link>
        </div>
      </div>
    </section>
  );
}
