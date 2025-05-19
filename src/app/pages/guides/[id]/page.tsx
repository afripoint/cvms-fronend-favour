// "use client"

// import { useEffect, useState } from "react"
// import { useNavigate, useParams } from "react-router-dom"

// import { ChevronLeft } from "lucide-react"
// import { GuideItem } from "../../../modules/landing/types"
// import { guides } from "../../../modules/landing/lib/data"
// import { MainLayout } from "../../../modules/landing/components/layout"
// import Button from "../../../modules/shared/components/ui/Button"
// import { VinButton } from "../../../modules/shared/components/ui/VinButton"
// import YouTubePlayer from "../../../modules/landing/components/layout/components/youtube-player"
// import VideoPlayer from "../../../modules/landing/components/layout/components/style-guide/video-player"
// import ArticleViewer from "../../../modules/landing/components/layout/components/style-guide/article-viewer"


// export default function GuidePage() {
//   const navigate = useNavigate()
//   const params = useParams()
//   const id = params.id
//   const [guide, setGuide] = useState<GuideItem | null>(null)
//   const [loading, setLoading] = useState(true)

//   useEffect(() => {
//     const foundGuide = guides.find((g) => g.id === id)
//     setGuide(foundGuide || null)
//     setLoading(false)
//   }, [id])

//   if (loading) {
//     return (
//       <MainLayout>
//         <div className="flex-1 flex items-center justify-center py-20">
//           <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#2a9f47]"></div>
//         </div>
//       </MainLayout>
//     )
//   }

//   if (!guide) {
//     return (
//       <MainLayout>
//         <div className="flex-1 flex flex-col items-center justify-center p-4 py-20">
//           <h1 className="text-2xl font-bold mb-4">Guide Not Found</h1>
//           <p className="text-gray-500 mb-6">The guide you're looking for doesn't exist or has been removed.</p>
//           <Button 
//             className="bg-[#2a9f47] hover:bg-[#238c3d]" 
//             onClick={() => navigate("/guides")}
//           >
//             Back to Guides
//           </Button>
//         </div>
//       </MainLayout>
//     )
//   }

//   const renderContent = () => {
//     // Handle YouTube videos
//     if (guide.type === "video" && guide.youtubeId) {
//       return <YouTubePlayer youtubeId={guide.youtubeId} title={guide.title} />;
//     }
    
//     // Handle direct video URLs
//     if (guide.type === "video" && guide.videoUrl) {
//       return <VideoPlayer videoUrl={guide.videoUrl} title={guide.title} />;
//     }
    
//     // Handle articles
//     if (guide.type === "article" && guide.content) {
//       return <ArticleViewer content={guide.content} title={guide.title} />;
//     }
    
//     // Fallback for missing content
//     return (
//       <div className="p-6">
//         <h1 className="text-2xl font-bold mb-4">{guide.title}</h1>
//         <p className="text-gray-500">Content unavailable</p>
//       </div>
//     );
//   };

//   return (
//     <MainLayout>
//       <div className="container mx-auto px-4 py-8">
//         <VinButton 
//           variant="ghost" 
//           className="mb-4 flex items-center gap-1" 
//           onClick={() => navigate(-1)}
//         >
//           <ChevronLeft className="h-4 w-4" />
//           Back to guides
//         </VinButton>

//         <div className="bg-white rounded-lg shadow-sm overflow-hidden">
//           {renderContent()}
//         </div>

//         <div className="mt-8">
//           <h2 className="text-xl font-bold mb-4">Related Guides</h2>
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//             {guides
//               .filter((g) => g.id !== guide.id)
//               .slice(0, 3)
//               .map((relatedGuide) => (
//                 <div
//                   key={relatedGuide.id}
//                   className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 cursor-pointer hover:shadow-md transition-shadow"
//                   onClick={() => navigate(`/guides/${relatedGuide.id}`)}
//                 >
//                   <h3 className="font-medium mb-2">{relatedGuide.title}</h3>
//                   <p className="text-sm text-gray-500">
//                     {relatedGuide.duration} minutes {relatedGuide.type}
//                   </p>
//                 </div>
//               ))}
//           </div>
//         </div>
//       </div>
//     </MainLayout>
//   )
// }