import { Link } from "react-router-dom";

export default function CTASection() {
  return (
    <section className="bg-gray-900 py-24 text-center">
      <div className="mx-auto max-w-2xl">
        <h2 className="text-3xl sm:text-5xl font-semibold text-white">
          Ready to take your resume to the next level?
        </h2>
        <p className="mt-6 text-gray-400 text-xl">
          Don’t wait — analyze your resume now and see how you can improve instantly.
        </p>
        <div className="mt-10 flex flex-col sm:flex-row justify-center  items-center gap-x-6">
          <Link to={'/upload-resume'}
            className="rounded-md bg-gradient-to-r from-indigo-500 to-purple-500 px-6 py-3 text-white font-semibold hover:scale-105 transition-transform"
          >
            Get Started
          </Link>
          <a
            href="#how-it-works"
            className="text-white text-sm font-semibold hover:text-indigo-400"
          >
            Learn More
          </a>
        </div>
      </div>
    </section>
  );
}
