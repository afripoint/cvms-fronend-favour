// "use client"

// import React from 'react'

// interface VideoEmbedProps {
//   src: string
//   title: string
//   width?: string
//   height?: string
//   allow?: string
//   allowFullScreen?: boolean
//   referrerPolicy?: React.HTMLAttributeReferrerPolicy
//   className?: string
// }

// export default function VideoEmbed({
//   src,
//   title,
//   width = "560",
//   height = "315",
//   allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture",
//   allowFullScreen = true,
//   referrerPolicy = "strict-origin-when-cross-origin" as React.HTMLAttributeReferrerPolicy,
//   className = "",
// }: VideoEmbedProps) {
//   return (
//     <iframe
//       width={width}
//       height={height}
//       src={src}
//       title={title}
//       frameBorder="0"
//       allow={allow}
//       allowFullScreen={allowFullScreen}
//       referrerPolicy={referrerPolicy}
//       className={className}
//     />
//   )
// }