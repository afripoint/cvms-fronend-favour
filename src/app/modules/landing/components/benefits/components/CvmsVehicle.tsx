import type React from "react"
import { workflowSteps } from "../../../constants/benefits"

const CvmsVehicle: React.FC = () => {
  return (
    <div className="bg-white px-12 rounded-lg shadow-sm max-w-6xl mx-auto min-h-[350px] flex flex-col justify-center">
      {/* <h2 id="how-it-works" className="text-2xl font-bold text-center text-[#000000] mb-10">
        How does CVMS Work?
      </h2> */}

<h2 id="how-it-works" className="text-2xl font-bold text-center text-[#000000] mb-10">
  How does CVMS Work?
</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 relative pr-16">
        {workflowSteps.map((step) => (
          <div key={step.id} className="flex">
            <div className="mr-4">
              <div className="h-8 w-8 bg-green-100 rounded-full flex items-center justify-center">
                <img src={`/icons/${step.icon}.svg`} alt="" className="w-5 h-5" />
              </div>
            </div>
            <div>
              <h3 className="text-green-500 font-medium mb-1">{step.title}</h3>
              <p className="text-sm text-gray-700 leading-snug">{step.description}</p>
            </div>
          </div>
        ))}

        {/* Vehicle Image - moved much further to the right */}
        <div className="absolute right-0 bottom-0 transform translate-y-1/2 translate-x-20">
          <img src='/images/vehicle.svg' alt="Vehicle" className="w-48 h-auto" />
        </div>
      </div>
    </div>
  )
}

export default CvmsVehicle

