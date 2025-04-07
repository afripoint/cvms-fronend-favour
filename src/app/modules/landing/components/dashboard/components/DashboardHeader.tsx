import type React from "react"
import QuickActionCard from "./QuickActionCard"

import TransactionsSection from "./TransactionSection"
import CircleIcon from "../../../../shared/components/icons/CircleIcon"
import DocumentIcon from "../../../../shared/components/icons/DocumentIcon"
import CheckCircleIcon from "../../../../shared/components/icons/CheckCircleIcon"
import SearchIcon from "../../../../shared/components/icons/SearchIcon"

const DashboardHeader: React.FC = () => {
  return (
    <div className="max-w-3xl mx-auto shadow-lg">
      <div className="bg-white p-2 px-6 flex justify-center items-center rounded-t-md">
        <div className="relative">
          <input
            type="text"
            placeholder="Search for anything..."
            className="bg-white rounded-md px-4 py-2 w-64 text-sm border border-gray-200"
          />
          <svg
            className="absolute right-3 top-2.5 text-gray-400 h-4 w-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            ></path>
          </svg>
        </div>
      </div>

      <div className="bg-gray-100 p-6 rounded-b-md">
        <div className="mb-6">
          <h2 className="text-lg font-medium">Welcome back to CVMS</h2>
        </div>

        <div className="mb-6">
          <h3 className="text-sm font-medium mb-3">Quick Actions</h3>
          <div className="grid grid-cols-4 gap-4">
            <QuickActionCard icon={<CircleIcon color="#FF6B6B" />} title="VIN Verification History" />
            <QuickActionCard icon={<DocumentIcon color="#4CAF50" />} title="Transaction History" />
            <QuickActionCard icon={<CheckCircleIcon color="#FFD700" />} title="Verification Status" />
            <QuickActionCard icon={<SearchIcon color="#3498DB" />} title="Completed VIN Searches" />
          </div>
        </div>

        <TransactionsSection />
      </div>
    </div>
  )
}

export default DashboardHeader

