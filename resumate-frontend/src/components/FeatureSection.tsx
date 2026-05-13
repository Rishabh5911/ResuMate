import { Check, Search, Zap, Layout } from "lucide-react";

const features = [
  {
    name: "Keyword Gap Analysis",
    description:
      "Compares your profile against a specific JD to extract missing technical and soft skills.",
    icon: Search,
  },
  {
    name: "ATS Score Breakdown",
    description:
      "Detailed evaluation of formatting, content quality, and machine-readability.",
    icon: Layout,
  },
  {
    name: "Actionable Guidance",
    description:
      "Real insights on how to improve your bullet points and organize your resume.",
    icon: Zap,
  },
  {
    name: "Strength Identification",
    description:
      "Highlights well-represented areas in your resume for recruiter impact.",
    icon: Check,
  },
];

const Features = () => {
  return (
    <div
      className="mx-auto max-w-7xl px-6 lg:px-8 py-20 bg-slate-50/50"
      id="features"
    >
      <div className="grid grid-cols-1 gap-y-16 lg:grid-cols-3 lg:gap-x-12">
        <div className="lg:col-span-1">
          <h2 className="text-sm font-semibold text-indigo-600 uppercase tracking-widest">
            Capabilities
          </h2>
          <p className="mt-4 text-3xl font-bold tracking-tight text-slate-900">
            Technical analysis of your profile.
          </p>
          <p className="mt-4 text-base leading-7 text-slate-600">
            Built to provide transparency into how automated systems and
            recruiters evaluate your resume.
          </p>
        </div>

        <div className="lg:col-span-2">
          <dl className="grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2">
            {features.map((feature) => (
              <div key={feature.name} className="relative pl-14">
                <dt className="text-base font-semibold leading-7 text-slate-900">
                  <div className="absolute top-0 left-0 flex h-9 w-9 items-center justify-center rounded-lg bg-white border border-slate-200">
                    <feature.icon className="h-5 w-5 text-indigo-600" />
                  </div>
                  {feature.name}
                </dt>
                <dd className="mt-2 text-sm leading-6 text-slate-600">
                  {feature.description}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
};

export default Features;