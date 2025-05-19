// "use client"

// import { useState } from "react"
// import { Play } from "lucide-react"
// import { GuideItem } from "../../../../types"
// import VideoPlayer from "./video-player"
// import ArticleViewer from "./article-viewer"
// import { Dialog, DialogContent } from "@radix-ui/react-dialog"


// interface GuideCardProps {
//   guide: GuideItem
// }

// export default function GuideCard({ guide }: GuideCardProps) {
//   const [isOpen, setIsOpen] = useState(false)

//   const handleOpenGuide = () => {
//     setIsOpen(true)
//   }

//   return (
//     <>
//       <div className="bg-white rounded-lg overflow-hidden shadow-sm border border-[#dcdcdc] transition-all hover:shadow-md">
//         <div className="relative cursor-pointer" onClick={handleOpenGuide}>
//           <img
//             src={guide.thumbnail || "/placeholder.svg"}
//             alt={guide.title}
//             width={400}
//             height={225}
//             className="w-full h-48 object-cover"
//           />
//           <div className="absolute inset-0 flex items-center justify-center">
//             <div className="bg-black bg-opacity-50 rounded-full p-3">
//               <Play className="h-6 w-6 text-white" fill="white" />
//             </div>
//           </div>
//         </div>
//         <div className="p-4">
//           <h3 className="font-bold text-lg mb-2 cursor-pointer hover:text-[#2a9f47]" onClick={handleOpenGuide}>
//             {guide.title}
//           </h3>
//           <p className="text-sm text-[#667085] mb-3">{guide.description}</p>
//           <div className="flex items-center text-xs text-[#7d7f81]">
//             <span>
//               {guide.duration} minutes {guide.type}
//             </span>
//             {guide.completed ? (
//               <svg className="ml-2 h-4 w-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//                 <rect x="3" y="3" width="18" height="18" rx="2" stroke="#7d7f81" strokeWidth="2" />
//                 <path
//                   d="M7 12L10 15L17 8"
//                   stroke="#7d7f81"
//                   strokeWidth="2"
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                 />
//               </svg>
//             ) : (
//               <svg className="ml-2 h-4 w-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//                 <path
//                   d="M12 8V16M8 12H16"
//                   stroke="#7d7f81"
//                   strokeWidth="2"
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                 />
//                 <rect x="3" y="3" width="18" height="18" rx="2" stroke="#7d7f81" strokeWidth="2" />
//               </svg>
//             )}
//           </div>
//         </div>
//       </div>

//       <Dialog open={isOpen} onOpenChange={setIsOpen}>
//         <DialogContent className="max-w-4xl p-0 overflow-hidden">
//           {guide.type === "video" && guide.videoUrl && <VideoPlayer videoUrl={guide.videoUrl} title={guide.title} />}
//           {guide.type === "article" && guide.content && <ArticleViewer content={guide.content} title={guide.title} />}
//         </DialogContent>
//       </Dialog>
//     </>
//   )
// }
