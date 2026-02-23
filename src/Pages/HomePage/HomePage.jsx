// HomePage.jsx
import { useState } from "react";
import api from "../../Hooks/api";
import Result from "./Result";
function HomePage() {
  const [jobDescription, setJobDescription] = useState("");
  const [resumeFile, setResumeFile] = useState(null);
  const [status, setStatus] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [resultData, setResultData] = useState(null);
  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setStatus("File size exceeds 5MB limit.");
        return;
      }
      setResumeFile(file);
      setStatus("");
    }
  };

  const handleRemoveFile = () => {
    setResumeFile(null);
    setStatus("");
  };

  const handleCheck = async (e) => {
    e.preventDefault();

    if (!resumeFile || !jobDescription.trim()) {
      setStatus("Please provide both a resume and job description.");
      return;
    }

    try {
      setIsAnalyzing(true);
      setStatus("Analyzing your resume for ATS match...");

      // Create FormData (for file upload)
      const formData = new FormData();
      formData.append("resumeFile", resumeFile);
      formData.append("jobDescription", jobDescription);
      console.log(api);
      const response = await api.post("/v1/resume/ats", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          // "x-tenant-id": "ROHIXEHA", //  Important for multi-tenant
          // Authorization: `Bearer ${localStorage.getItem("token")}`, // if auth exists
        },
      });

      const data = response.data;
      setResultData(data);
      // console.log(data);
      setStatus(`Your ATS Score: ${data.atsScore}%`);

      // If you have Result modal

      // setIsResultOpen(true);
    } catch (error) {
      console.error("ATS Check Error:", error);

      if (error.response?.data?.message) {
        setStatus(error.response.data.message);
      } else {
        setStatus("Something went wrong. Please try again.");
      }
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <>
      <Result
        isOpen={resultData}
        onClose={() => {
          setResultData(null);
          setStatus(null);
          setResumeFile(null);
          setJobDescription("");
        }}
        resultData={resultData}
      />
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-blue-50/40">
        <div className="w-full py-4 px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 xl:gap-16 items-start lg:items-center">
            {/* LEFT SIDE – Header + Text */}
            <div className="space-y-10 lg:space-y-12 text-center lg:text-left">
              <div className="space-y-6">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-indigo-950 leading-tight">
                  Make Your Resume ATS-Proof
                </h1>
                <p className="text-xl sm:text-2xl font-semibold text-indigo-700">
                  Get your ATS score, keyword gaps & fixes instantly
                </p>
                <p className="text-base sm:text-lg text-gray-700 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                  Over 80% of resumes never reach a human recruiter because they
                  fail Applicant Tracking Systems. Upload your resume + paste
                  the job description — see your match score and improvement
                  tips in seconds.
                </p>

                <div className="flex flex-wrap justify-center lg:justify-start gap-4 pt-4">
                  <div className="flex items-center gap-2 text-sm font-medium text-green-700">
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    100% Free Check
                  </div>
                  <div className="flex items-center gap-2 text-sm font-medium text-green-700">
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    No Sign-up Needed
                  </div>
                </div>
              </div>

              {/* Floating score badge (decorative) */}
              <div className="hidden lg:block relative mt-8">
                <div className="inline-block bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-6 border border-indigo-100 transform rotate-2 hover:rotate-0 transition-transform duration-500">
                  <div className="text-center">
                    <div className="text-5xl font-extrabold text-indigo-700">
                      95<span className="text-2xl font-bold">%</span>
                    </div>
                    <div className="mt-1 text-base font-semibold text-gray-700">
                      Average Optimized Score
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT SIDE – Form (Job Desc + Upload) */}
            <div className="bg-white shadow-2xl shadow-indigo-200/40 rounded-2xl p-7 sm:p-9 border border-indigo-100/60">
              <form onSubmit={handleCheck} className="space-y-8">
                {/* Job Description */}
                <div className="space-y-3">
                  <label
                    htmlFor="job-desc"
                    className="block text-xl font-bold text-indigo-900"
                  >
                    Paste Job Description
                  </label>
                  <textarea
                    id="job-desc"
                    rows={6}
                    value={jobDescription}
                    onChange={(e) => setJobDescription(e.target.value)}
                    placeholder="Copy and paste the full job posting here..."
                    className="w-full rounded-xl border border-indigo-200 px-5 py-4 text-gray-800 placeholder-gray-400 
                           focus:border-indigo-500 focus:ring-2 focus:ring-indigo-300/50 outline-none 
                           transition-all duration-200 resize-none shadow-sm hover:shadow-md"
                  />
                </div>

                {/* Resume Upload */}
                <div className="space-y-3">
                  <label
                    htmlFor="resume-upload"
                    className="block text-xl font-bold text-indigo-900"
                  >
                    Upload Your Resume
                  </label>

                  <label
                    htmlFor="resume-upload"
                    className={`group relative flex flex-col items-center justify-center w-full h-52 sm:h-56 
                             border-2 border-dashed rounded-2xl cursor-pointer transition-all duration-300
                             ${
                               resumeFile
                                 ? "border-green-500 bg-green-50/50 hover:bg-green-50"
                                 : "border-indigo-300 hover:border-indigo-400 bg-indigo-50/40 hover:bg-indigo-50"
                             }`}
                  >
                    <div className="flex flex-col items-center justify-center pt-6 pb-8 px-6 text-center">
                      {!resumeFile ? (
                        <>
                          <svg
                            className="w-14 h-14 mb-4 text-indigo-400 group-hover:text-indigo-500 transition-colors"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                            />
                          </svg>
                          <p className="mb-2 text-base font-semibold text-indigo-700 group-hover:text-indigo-800">
                            Click to upload or drag & drop
                          </p>
                          <p className="text-sm text-gray-600">
                            PDF, DOC, DOCX • max 5MB
                          </p>
                        </>
                      ) : (
                        <div className="text-center space-y-3 w-full px-4">
                          <p className="text-lg font-semibold text-green-700 truncate">
                            {resumeFile.name}
                          </p>
                          <p className="text-sm text-gray-600">
                            {(resumeFile.size / 1024).toFixed(1)} KB
                          </p>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.preventDefault();
                              handleRemoveFile();
                            }}
                            className="mt-2 text-sm text-red-600 hover:text-red-700 font-medium underline transition-colors"
                          >
                            Remove file
                          </button>
                        </div>
                      )}
                    </div>
                    <input
                      id="resume-upload"
                      type="file"
                      accept=".pdf,.doc,.docx"
                      className="hidden"
                      onChange={handleFileChange}
                    />
                  </label>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={
                    isAnalyzing || !resumeFile || !jobDescription.trim()
                  }
                  className={`w-full py-4 px-8 rounded-xl text-white font-bold text-lg shadow-xl
                           transition-all duration-300 transform
                           ${
                             isAnalyzing ||
                             !resumeFile ||
                             !jobDescription.trim()
                               ? "bg-indigo-400 cursor-not-allowed"
                               : "bg-indigo-600 hover:bg-indigo-700 hover:shadow-2xl hover:scale-[1.02] active:scale-95"
                           } focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2`}
                >
                  {isAnalyzing ? (
                    <span className="flex items-center justify-center gap-3">
                      <svg
                        className="animate-spin h-6 w-6 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8v8h8a8 8 0 01-16 0z"
                        />
                      </svg>
                      Analyzing...
                    </span>
                  ) : (
                    "Get ATS Score & Suggestions"
                  )}
                </button>

                {status && (
                  <p
                    className={`text-center font-medium pt-3 text-lg ${
                      status.includes("Analyzing") || status.includes("%")
                        ? "text-indigo-700"
                        : "text-red-600"
                    }`}
                  >
                    {status}
                  </p>
                )}
              </form>
            </div>
          </div>
        </div>

        {/* Bottom subtle fade */}
        <div className="h-32 bg-gradient-to-t from-blue-50/50 to-transparent pointer-events-none" />
      </div>
    </>
  );
}

export default HomePage;
