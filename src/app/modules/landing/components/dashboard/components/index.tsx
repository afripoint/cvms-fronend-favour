import type React from "react"
import DashboardHeader from "./DashboardHeader"
import { useDashboardAnimation } from "../../../hooks/useDashboardAnimation"

const Dashboard: React.FC = () => {
  const { isSliding } = useDashboardAnimation()

  return (
    <div className="mb-12">
      <DashboardHeader />
    </div>
  )
}

export default Dashboard

