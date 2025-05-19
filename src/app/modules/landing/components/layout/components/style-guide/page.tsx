// "use client"

// import { useState, useEffect } from "react"
// import { ChevronRight } from "lucide-react"
// import { FilterType, GuideItem } from "../../../../types"
// import { guides } from "../../../../lib/data"
// import MainLayout from "../MainLayout"
// import { Link } from "react-router-dom"
// import SearchBar from "./search-bar"
// import GuideCard from "./card-guide"



// export default function UserGuidePage() {
//   const [filter, setFilter] = useState<FilterType>("all")
//   const [searchQuery, setSearchQuery] = useState("")
//   const [filteredGuides, setFilteredGuides] = useState<GuideItem[]>(guides)

//   useEffect(() => {
//     let result = guides

//     // Apply type filter
//     if (filter === "articles") {
//       result = result.filter((guide) => guide.type === "article")
//     } else if (filter === "videos") {
//       result = result.filter((guide) => guide.type === "video")
//     }

//     // Apply search filter
//     if (searchQuery) {
//       const query = searchQuery.toLowerCase()
//       result = result.filter(
//         (guide) => guide.title.toLowerCase().includes(query) || guide.description.toLowerCase().includes(query),
//       )
//     }

//     setFilteredGuides(result)
//   }, [filter, searchQuery])

//   const handleFilterChange = (newFilter: FilterType) => {
//     setFilter(newFilter)
//   }

//   const handleSearch = (query: string) => {
//     setSearchQuery(query)
//   }

//   return (
//     <MainLayout>
//       {/* Hero Banner */}
//       <div className="bg-[#2a9f47] text-white py-12">
//         <div className="container mx-auto px-4 text-center">
//           <h1 className="text-3xl font-bold mb-2">User Guide</h1>
//           <p className="max-w-2xl mx-auto">
//             Explore our FAQ section for quick and easy answers
//             <br />
//             to the most common questions
//           </p>
//         </div>
//       </div>

//       {/* Breadcrumb */}
//       <div className="container mx-auto px-4 py-4">
//         <div className="flex items-center text-sm text-[#667085]">
//           <Link to="/resources" className="hover:underline">
//             Resources
//           </Link>
//           <ChevronRight className="h-4 w-4 mx-1" />
//           <span>User Guide</span>
//         </div>
//       </div>

//       {/* Search Bar */}
//       <div className="container mx-auto px-4">
//         <SearchBar onSearch={handleSearch} />
//       </div>

//       {/* Filter Tabs */}
//       <div className="container mx-auto px-4 mb-8">
//         <div className="flex gap-2">
//           <button
//             className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${
//               filter === "all" ? "bg-[#2a9f47] text-white" : "bg-white text-[#333436] hover:bg-gray-100"
//             }`}
//             onClick={() => handleFilterChange("all")}
//           >
//             All
//           </button>
//           <button
//             className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${
//               filter === "articles" ? "bg-[#2a9f47] text-white" : "bg-white text-[#333436] hover:bg-gray-100"
//             }`}
//             onClick={() => handleFilterChange("articles")}
//           >
//             Articles
//           </button>
//           <button
//             className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${
//               filter === "videos" ? "bg-[#2a9f47] text-white" : "bg-white text-[#333436] hover:bg-gray-100"
//             }`}
//             onClick={() => handleFilterChange("videos")}
//           >
//             Videos
//           </button>
//         </div>
//       </div>

//       {/* Guide Grid */}
//       <div className="container mx-auto px-4 mb-16">
//         {filteredGuides.length > 0 ? (
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//             {filteredGuides.map((guide) => (
//               <GuideCard key={guide.id} guide={guide} />
//             ))}
//           </div>
//         ) : (
//           <div className="text-center py-12">
//             <h3 className="text-xl font-medium mb-2">No guides found</h3>
//             <p className="text-gray-500">Try adjusting your search or filter to find what you're looking for.</p>
//           </div>
//         )}
//       </div>
//     </MainLayout>
//   )
// }
