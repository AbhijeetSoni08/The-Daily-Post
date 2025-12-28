import { Newspaper } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function About() {
  const Navigate = useNavigate();
  function navigate(){
    Navigate('/');
  }
  return (
    <section className="w-full bg-gray-50 py-16 md:py-24">
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-10 items-center">
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <Newspaper className="w-9 h-9 text-gray-700" />
            <h1 className="text-4xl md:text-5xl font-bold leading-tight">
              Welcome to <span className="text-gray-700">The Daily Post</span>
            </h1>
          </div>

          <p className="text-gray-600 text-lg leading-relaxed">
            Fresh stories, practical insights, and thoughtful perspectives — written to keep you informed,
            inspired, and always learning.
          </p>

          <div className="flex flex-wrap gap-4 pt-2">
            <button onClick={() => navigate()} className="rounded-2xl px-6 py-5 bg-gray-900 text-white hover:bg-gray-800">
              Start Reading
            </button>
          </div>
        </div>

        <div className="bg-white border rounded-2xl shadow-sm p-6 md:p-8 space-y-4">
          <p className="font-semibold text-gray-700">Why read The Daily Post?</p>
          <ul className="text-gray-600 list-disc pl-5 space-y-2">
            <li>Clear, research-backed writing</li>
            <li>Topics that add value to your day</li>
            <li>Simple ideas explained beautifully</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
