// "use client"

// import { useState } from "react"
// import { X, Check } from "lucide-react"
// import { VinButton } from "../../../../../shared/components/ui/VinButton"
// import Button from "../../../../../shared/components/ui/Button"

// interface ArticleViewerProps {
//   content: string
//   title: string
// }

// // Define the CheckboxIcon component
// interface CheckboxIconProps {
//   id: string;
//   checked: boolean;
//   onCheckedChange: (checked: boolean) => void;
// }

// const CheckboxIcon = ({ id, checked, onCheckedChange }: CheckboxIconProps) => {
//   return (
//     <div 
//       id={id}
//       className={`flex h-4 w-4 items-center justify-center rounded-sm border ${
//         checked ? "bg-primary border-primary" : "border-gray-300"
//       } cursor-pointer`}
//       onClick={() => onCheckedChange(!checked)}
//     >
//       {checked && <Check className="h-3 w-3 text-white" />}
//     </div>
//   );
// };

// export default function ArticleViewer({ content, title }: ArticleViewerProps) {
//   const [isCompleted, setIsCompleted] = useState(false)

//   const renderMarkdown = (markdown: string) => {
//     // Very simple markdown parser for headings and lists
//     const html = markdown
//       .replace(/^# (.*$)/gm, '<h1 class="text-2xl font-bold mb-4 mt-6">$1</h1>')
//       .replace(/^## (.*$)/gm, '<h2 class="text-xl font-bold mb-3 mt-5">$1</h2>')
//       .replace(/^### (.*$)/gm, '<h3 class="text-lg font-bold mb-2 mt-4">$1</h3>')
//       .replace(/^- (.*$)/gm, '<li class="ml-4 mb-1">$1</li>')
//       .replace(/\n\n/g, '<p class="mb-4"></p>')

//     return { __html: html }
//   }

//   return (
//     <div className="bg-white text-gray-800 max-h-[80vh] overflow-y-auto">
//       <div className="p-4 flex justify-between items-center border-b">
//         <h2 className="font-bold text-lg">{title}</h2>
//         <VinButton variant="ghost" size="icon">
//           <X className="h-5 w-5" />
//         </VinButton>
//       </div>

//       <div className="p-6">
//         <div dangerouslySetInnerHTML={renderMarkdown(content)} />

//         <div className="mt-8 pt-4 border-t">
//           <div className="flex items-center space-x-2">
//             <CheckboxIcon
//               id="article-completed"
//               checked={isCompleted}
//               onCheckedChange={(checked) => setIsCompleted(checked)}
//             />
//             <label
//               htmlFor="article-completed"
//               className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
//             >
//               Mark as completed
//             </label>
//           </div>

//           <div className="mt-6 flex gap-4">
//             <Button className="bg-[#2a9f47] hover:bg-[#238c3d]">Next Article</Button>
//             <Button variant="outline">Download PDF</Button>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }