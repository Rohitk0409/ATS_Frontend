// FeedBackPage.jsx
import { useQueryClient } from "@tanstack/react-query";
import {
  AlertCircle,
  CheckCircle,
  Loader2,
  Mail,
  MessageSquare,
  Quote,
  Send,
  Star,
  ThumbsUp,
  User,
} from "lucide-react";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useFeedbackQuery } from "../Hooks/useFeedbackQuery";

import api from "../Hooks/api";
function FeedBackPage() {
  const queryClient = useQueryClient();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    rating: 0,
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [hoveredRating, setHoveredRating] = useState(0);
  const [loading, setLoading] = useState(false);

  const { data, isLoading, error2 } = useFeedbackQuery();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!formData.email.trim()) {
      return setError("Email is required");
    }
    if (!formData.message.trim()) {
      return setError("Please share your feedback");
    }

    try {
      setLoading(true);

      const payload = {
        name: formData.name,
        email: formData.email,
        // rating: formData.rating,
        feedback: formData.message,
      };

      console.log(payload);
      await api.post("/v1/feedback", payload);

      toast.success("Feedback submitted!");

      setSubmitted(true);

      setFormData({
        name: "",
        email: "",
        rating: 0,
        message: "",
      });
      queryClient.invalidateQueries(["feedbacks"]);
    } catch (err) {
      console.log(err);
      toast.error(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-indigo-50/80 py-10 sm:py-12 md:py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-10 md:mb-14">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-indigo-900 tracking-tight">
              Your Feedback Matters
            </h1>
            <p className="mt-3 text-base sm:text-lg md:text-xl text-indigo-700 max-w-3xl mx-auto">
              Help us make{" "}
              <span className="font-semibold text-indigo-800">
                ResumeMetric
              </span>{" "}
              even better for job seekers like you.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
            {/* LEFT: Feedback Form */}
            <div className="bg-white rounded-2xl sm:rounded-3xl shadow-xl border border-indigo-100/60 overflow-hidden order-2 lg:order-1">
              {!submitted ? (
                <form
                  onSubmit={handleSubmit}
                  className="p-6 sm:p-8 lg:p-10 space-y-6 sm:space-y-8"
                >
                  {/* Name */}
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-indigo-800 mb-2 flex items-center gap-2"
                    >
                      <User className="w-4 h-4" />
                      Name (optional)
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Rohit Kumar"
                      className="w-full px-4 py-3 rounded-xl border border-indigo-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200/50 outline-none transition-all duration-200 text-gray-800 placeholder-gray-400 shadow-sm"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-indigo-800 mb-2 flex items-center gap-2"
                    >
                      <Mail className="w-4 h-4" />
                      Email{" "}
                      <span className="text-red-500 text-xs ml-1.5">
                        (required)
                      </span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="your.email@example.com"
                      required
                      className="w-full px-4 py-3 rounded-xl border border-indigo-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200/50 outline-none transition-all duration-200 text-gray-800 placeholder-gray-400 shadow-sm"
                    />
                  </div>

                  {/* Message */}
                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium text-indigo-800 mb-2 flex items-center gap-2"
                    >
                      <MessageSquare className="w-4 h-4" />
                      Your thoughts, suggestions or issues{" "}
                      <span className="text-red-500 text-xs ml-1.5">
                        (required)
                      </span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="What do you love about ResumeMetric? Any improvements? Bugs? New features you'd like?"
                      required
                      className="w-full px-4 py-3 rounded-xl border border-indigo-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200/50 outline-none transition-all duration-200 text-gray-800 placeholder-gray-400 shadow-sm resize-y min-h-[130px]"
                    />
                  </div>

                  {error && (
                    <div className="flex items-center gap-2.5 text-red-600 bg-red-50 px-4 py-3 rounded-xl">
                      <AlertCircle className="w-5 h-5 flex-shrink-0" />
                      <p className="text-sm">{error}</p>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white font-semibold py-3.5 px-6 rounded-xl shadow-lg transition-all duration-300 flex items-center justify-center gap-2.5 text-base sm:text-lg group focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2 transform hover:scale-[1.02]"
                  >
                    {loading ? "Sending" : "Send Feedback"}

                    {loading ? (
                      <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                      <Send className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                    )}
                  </button>
                </form>
              ) : (
                <div className="p-10 sm:p-14 lg:p-16 text-center space-y-6">
                  <CheckCircle className="w-20 h-20 sm:w-24 sm:h-24 text-green-500 mx-auto animate-pulse-once" />
                  <h2 className="text-2xl sm:text-3xl font-bold text-indigo-900">
                    Thank You, Rohit!
                  </h2>
                  <p className="text-base sm:text-lg text-gray-700 max-w-md mx-auto leading-relaxed">
                    Your feedback means a lot to us. We'll use it to make
                    ResumeMetric better for everyone.
                  </p>
                  <p className="text-sm text-indigo-600 font-medium">
                    We'll reach out if we need more details ❤️
                  </p>
                </div>
              )}
            </div>

            {/* RIGHT: Feedback Highlights / Testimonials */}
            <div className="space-y-8 lg:space-y-10 order-1 lg:order-2">
              <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 sm:p-8 border border-indigo-100/50 shadow-lg">
                <div className="flex items-center gap-3 mb-5">
                  <Quote className="w-8 h-8 text-indigo-500" />
                  <h2 className="text-2xl sm:text-3xl font-bold text-indigo-900">
                    Recent Feedback
                  </h2>
                </div>
                <div className="space-y-6">
                  {isLoading && (
                    <p className="text-gray-500">Loading feedback...</p>
                  )}

                  {error2 && (
                    <p className="text-red-500">Failed to load feedback</p>
                  )}

                  {data?.length === 0 && (
                    <p className="text-gray-500">No feedback available</p>
                  )}

                  {data?.map((item) => (
                    <div
                      key={item._id}
                      className="border-l-4 border-indigo-400 pl-4 py-1"
                    >
                      <div className="flex items-center justify-between mb-1.5">
                        <div>
                          <p className="font-semibold text-indigo-900">
                            {item.name || "Anonymous"}
                          </p>
                          <p className="text-sm text-gray-600">{item.email}</p>
                        </div>

                        {/* Rating Stars */}
                        <div className="flex">
                          {Array.from({ length: item.rating || 0 }).map(
                            (_, idx) => (
                              <Star
                                key={idx}
                                className="w-4 h-4 fill-indigo-500 text-indigo-500"
                              />
                            ),
                          )}
                        </div>
                      </div>

                      <p className="text-gray-700 text-sm leading-relaxed">
                        "{item.feedback}"
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-gradient-to-br from-indigo-100/60 to-indigo-50/40 rounded-2xl p-6 sm:p-8 border border-indigo-200/50 shadow-md text-center">
                <ThumbsUp className="w-12 h-12 text-indigo-600 mx-auto mb-4" />
                <h3 className="text-xl sm:text-2xl font-bold text-indigo-900 mb-3">
                  Why Your Feedback Helps
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  Every suggestion improves keyword detection, UI experience,
                  new features, and helps more job seekers in India and beyond
                  land interviews.
                </p>
              </div>
            </div>
          </div>

          {/* Bottom encouragement */}
          <p className="text-center text-sm sm:text-base text-gray-500 mt-10 sm:mt-14">
            Thank you for helping shape ResumeMetric — built with ❤️ in Varanasi
          </p>
        </div>
      </div>
    </>
  );
}

export default FeedBackPage;
