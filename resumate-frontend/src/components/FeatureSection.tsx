import { LightBulbIcon, DocumentChartBarIcon, ChatBubbleBottomCenterTextIcon, ShieldCheckIcon } from '@heroicons/react/24/outline'

const features = [
  {
    name: 'Instant Resume Analysis',
    description:
      'Upload your resume and get a detailed analysis within minutes. Identify strengths, weaknesses, and areas for improvement instantly.',
    icon: DocumentChartBarIcon,
  },
  {
    name: 'ATS Optimization',
    description:
      'Get actionable tips to make your resume compatible with Applicant Tracking Systems so recruiters notice you faster.',
    icon: ShieldCheckIcon,
  },
  {
    name: 'Skill & Keyword Suggestions',
    description:
      'Receive recommendations on essential skills and keywords to include in your resume to increase your chances of selection.',
    icon: LightBulbIcon,
  },
  {
    name: 'Personalized Feedback',
    description:
      'Get customized guidance to improve your resume layout, clarity, and overall impact so you can land your dream job.',
    icon: ChatBubbleBottomCenterTextIcon,
  },
]

export default function Features() {
  return (
      <div className="mx-auto max-w-7xl px-6 lg:px-8 -mt-20" id="features">
        <div className="mx-auto max-w-2xl lg:text-center">
          <p className="mt-2 text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-balance">
            Make your resume <span className="bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent">stand out</span> and impress recruiters
          </p>
          <p className="mt-6 text-lg/8 text-gray-300">
            ResuMate provides smart insights, keyword suggestions, and personalized feedback to help you optimize your resume and land your dream job.
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
            {features.map((feature) => (
              <div key={feature.name} className="relative pl-16">
                <dt className="text-base/7 font-semibold text-white">
                  <div className="absolute top-0 left-0 flex size-10 items-center justify-center rounded-lg bg-indigo-500">
                    <feature.icon aria-hidden="true" className="size-6 text-white" />
                  </div>
                  {feature.name}
                </dt>
                <dd className="mt-2 text-base/7 text-gray-400">{feature.description}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
   
     )
}
