import type React from "react"
import DashboardHeader from "./DashboardHeader"
import { useDashboardAnimation } from "../../../hooks/useDashboardAnimation"

const Dashboard: React.FC = () => {
  const { isSliding } = useDashboardAnimation()

  return (
    <div className="max-w-5xl bg-green-900 mx-auto mt-20 border-2 border-green-900 h-screen rounded-md relative overflow-hidden">
      <div
        className={`absolute bottom-0 left-0 right-0 transition-transform duration-1000 ease-out transform ${
          isSliding ? "translate-y-0" : "translate-y-full"
        }`}
      >
        <DashboardHeader />
      </div>
    </div>
  )
}

export default Dashboard

