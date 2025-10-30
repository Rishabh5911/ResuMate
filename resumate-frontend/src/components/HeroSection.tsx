import { Link } from 'react-router-dom'
import {ArrowRightIcon} from "@heroicons/react/24/outline";

export default function HeroSection() {
  return (
    <div>
      <div className="relative isolate px-6 pt-14 lg:px-8">
        <div
          aria-hidden="true"
          className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
        >
          <div
            style={{
              clipPath:
                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            }}
            className="relative left-[calc(50%-11rem)] aspect-1155/678 w-144.5 -translate-x-1/2 rotate-30 bg-linear-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-288.75"
          />
        </div>
        <div className="mx-auto max-w-3xl py-20 sm:py-32 lg:py-40">
          
          <div className="text-center">
            <h1 className="text-5xl font-semibold tracking-tight text-balance text-white sm:text-7xl">
              Boost Your <span className="bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent">Resume</span> Land Your Dream Job
            </h1>
            <p className="mt-8 text-lg font-medium text-pretty text-gray-400 sm:text-xl/8">
              ResuMate analyzes your resume in minutes and gives actionable tips to help you stand out and impress recruiters.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link to={'/upload-resume'}
                
                className="rounded-md bg-gradient-to-r from-indigo-500 to-purple-500 px-6 py-3 text-white font-semibold hover:scale-105 transition-transform"
              >
                Analyze Your Resume
              </Link>
              <a href="#features" className="text-white text-sm  hover:text-indigo-400 font-semibold flex">
                Learn more <ArrowRightIcon className="ml-2 h-5 w-5"/>
              </a>
            </div>
          </div>
           <hr className="border-t border-gray-700 mt-12" /> 
        </div>
         
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
        >
          <div
            style={{
              clipPath:
                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            }}
            className="relative left-[calc(50%+3rem)] aspect-1155/678 w-144.5 -translate-x-1/2 bg-linear-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-288.75"
          />
        </div>
      </div>
    </div> 
  )
}
