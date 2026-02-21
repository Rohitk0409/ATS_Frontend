// AboutPage.jsx
import {
  ArrowRight,
  Github,
  Instagram,
  LayoutDashboard,
  Linkedin,
  Mail,
  Target,
  Zap,
} from "lucide-react";

function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 via-white to-indigo-50 flex flex-col">
      {/* Main Content */}
      <main className="flex-grow">
        {/* Hero Section - Enhanced with subtle animation */}
        <section className="bg-gradient-to-br from-indigo-800 to-indigo-950 text-white py-16 sm:py-24 md:py-32">
          <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight mb-4 md:mb-6 animate-fade-in">
              Resume<span className="text-indigo-300">Metric</span>
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-indigo-200 max-w-4xl mx-auto leading-relaxed">
              Smart ATS score checker & resume optimizer — helping talented
              people beat applicant tracking systems and land interviews faster.
            </p>
            <div className="mt-8 sm:mt-10">
              <a
                href="/"
                className="group inline-flex items-center gap-2 bg-white text-indigo-900 font-semibold px-7 sm:px-10 py-4 rounded-full text-base sm:text-lg shadow-2xl hover:bg-indigo-50 transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-indigo-300"
              >
                Get Started Free
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </a>
            </div>
          </div>
        </section>

        {/* Mission & Story - Responsive grid */}
        <section className="py-16 sm:py-20 md:py-24">
          <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
              <div className="space-y-6 order-2 lg:order-1">
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-indigo-900">
                  Why we built ResumeMetric
                </h2>
                <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
                  Every day, qualified candidates are silently rejected by ATS
                  software before any recruiter sees their resume. We believe
                  skills should matter more than keyword tricks or outdated
                  formatting.
                </p>
                <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
                  ResumeMetric analyzes your resume against real job
                  descriptions in seconds — giving you an honest ATS score,
                  missing keywords, structure issues, and actionable fixes to
                  help you get noticed.
                </p>
              </div>

              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-8 border-indigo-100/50 order-1 lg:order-2 transform hover:scale-[1.02] transition-transform duration-500">
                <img
                  src="https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?auto=format&fit=crop&w=1200&q=80"
                  alt="Modern ATS resume analysis dashboard"
                  className="w-full h-auto object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-indigo-950/70 via-indigo-950/30 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 text-white">
                  <p className="text-4xl sm:text-5xl font-bold">92%</p>
                  <p className="text-indigo-200 text-lg sm:text-xl">
                    ATS Compatibility Score
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features - Card grid, very responsive */}
        <section className="bg-indigo-50/70 py-16 sm:py-20 md:py-24">
          <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-indigo-900 text-center mb-12 md:mb-16">
              Features Job Seekers Love
            </h2>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 lg:gap-10">
              {[
                {
                  icon: <Zap className="w-10 h-10 text-indigo-600" />,
                  title: "Instant ATS Score",
                  desc: "Upload resume + paste job → get compatibility percentage and priority fixes in under 10 seconds.",
                },
                {
                  icon: <Target className="w-10 h-10 text-indigo-600" />,
                  title: "Keyword Intelligence",
                  desc: "Discover missing high-impact keywords recruiters & ATS systems are looking for.",
                },
                {
                  icon: (
                    <LayoutDashboard className="w-10 h-10 text-indigo-600" />
                  ),
                  title: "Formatting & Structure Tips",
                  desc: "Avoid ATS-killing elements: tables, graphics, headers, custom fonts — get clean suggestions.",
                },
              ].map((feature, i) => (
                <div
                  key={i}
                  className="group bg-white p-6 sm:p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-indigo-100/70"
                >
                  <div className="mb-5">{feature.icon}</div>
                  <h3 className="text-xl sm:text-2xl font-semibold text-indigo-900 mb-3 group-hover:text-indigo-700 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 text-base sm:text-lg">
                    {feature.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Footer - Clean & centered */}
      <footer className="bg-indigo-950 text-indigo-200 py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8 text-center">
          <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4">
            ResumeMetric
          </h3>
          <p className="text-base sm:text-lg mb-8 max-w-2xl mx-auto">
            Helping every skilled candidate get the fair shot they deserve —
            past the bots, into the inbox.
          </p>

          {/* Social Icons - Larger touch targets on mobile */}
          <div className="flex justify-center gap-8 sm:gap-10 text-3xl sm:text-4xl">
            <a
              href="mailto:rohit@example.com"
              aria-label="Email"
              className="hover:text-white transition-colors hover:scale-110 transform duration-200"
            >
              <Mail />
            </a>
            <a
              href="https://linkedin.com/in/rohitkumar-varanasi"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="hover:text-white transition-colors hover:scale-110 transform duration-200"
            >
              <Linkedin />
            </a>
            <a
              href="https://github.com/yourusername"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="hover:text-white transition-colors hover:scale-110 transform duration-200"
            >
              <Github />
            </a>
            <a
              href="https://instagram.com/yourhandle"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="hover:text-white transition-colors hover:scale-110 transform duration-200"
            >
              <Instagram />
            </a>
          </div>

          <p className="mt-10 text-sm sm:text-base text-indigo-300">
            © {new Date().getFullYear()} ResumeMetric. Built with passion in
            Varanasi.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default AboutPage;
