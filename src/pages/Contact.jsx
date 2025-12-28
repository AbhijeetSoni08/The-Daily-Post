import { Mail } from "lucide-react";

import { useForm } from "react-hook-form";
import appwriteService from "../appwrite/config";

export default function Contact() {
  const { register, handleSubmit, reset } = useForm();
  const handleSubmitForm = async (data) => {
    try {
      await appwriteService.sendEmail({ name: data.name, email: data.email, message: data.message });
      alert("Message sent successfully! We will get back to you soon.");
      reset();
    } catch (error) {
      console.error("Error sending message:", error);
      alert("Failed to send message. Please try again later.");
    }
  };

  
  return (
    <section className="w-full bg-gray-50 py-16 md:py-24">
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-10 items-start">
        {/* Left content */}
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <Mail className="w-9 h-9 text-gray-700" />
            <h1 className="text-4xl md:text-5xl font-bold leading-tight">
              Contact <span className="text-gray-700">The Daily Post</span>
            </h1>
          </div>

          <p className="text-gray-600 text-lg leading-relaxed">
            Have feedback, suggestions, or a story to share?  
            We’d love to hear from you — drop us a message below.
          </p>

          <div className="bg-white border rounded-2xl shadow-sm p-6 space-y-4">
            <h2 className="font-semibold text-gray-700 text-lg">
              Reach out to us
            </h2>

            <form className="space-y-4" onSubmit={handleSubmit((data) => {
              handleSubmitForm(data);
            })}>
              <div>
                <label className="block text-sm text-gray-600 mb-1">Name</label>
                <input
                  type="text"
                  className="w-full border rounded-xl px-4 py-2 outline-none focus:ring focus:ring-gray-200"
                  placeholder="Your name"
                  {...register("name")}
                />
              </div>

              <div>
                <label className="block text-sm text-gray-600 mb-1">Email</label>
                <input
                  type="email"
                  className="w-full border rounded-xl px-4 py-2 outline-none focus:ring focus:ring-gray-200"
                  placeholder="you@example.com"
                  {...register("email")}
                />
              </div>

              <div>
                <label className="block text-sm text-gray-600 mb-1">Message</label>
                <textarea
                  rows="4"
                  className="w-full border rounded-xl px-4 py-2 outline-none focus:ring focus:ring-gray-200"
                  placeholder="Write your message..."
                  {...register("message")}
                ></textarea>
              </div>

              <button
                type="submit"
                onSubmit={handleSubmit}
                className="rounded-2xl px-6 py-3 bg-gray-900 text-white hover:bg-gray-800"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>

        {/* Right side card */}
        <div className="bg-white border rounded-2xl shadow-sm p-6 md:p-8 space-y-4">
          <p className="font-semibold text-gray-700">Other ways to connect</p>
          <ul className="text-gray-600 list-disc pl-5 space-y-2">
            <li>Email responses within 24–48 hours</li>
            <li>We welcome guest posts and ideas</li>
            <li>Feedback helps us improve every day</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
