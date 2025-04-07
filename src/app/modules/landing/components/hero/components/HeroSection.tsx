// import herobg from "../../../../../../assets/images/herosection.svg";
// import HeroContent from "../HeroContent";



// export default function HeroSection() {
//   return (
//     <>
//       <link
//         href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500&family=Manrope:wght@600;700&display=swap"
//         rel="stylesheet"
//       />
//       <section className="flex justify-center items-center px-0 py-48 w-full bg-center bg-no-repeat bg-cover min-h-[648px] max-md:px-0 max-md:py-36 max-sm:px-0 max-sm:py-24"
//       style={{ backgroundImage: `url(${herobg})` }}
//       >
//         <HeroContent/>
//       </section>
//     </>
//   );
// }




import type React from "react"
import HeroContent from "./HeroContent"
import type { HeroSectionProps } from "../../../types/hero"

const HeroSection: React.FC<HeroSectionProps> = ({ backgroundImage = "src/assets/images/herosection.svg" }) => {
  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500&family=Manrope:wght@600;700&display=swap"
        rel="stylesheet"
      />
      <section
        className="flex justify-center items-center px-0 py-48 w-full bg-center bg-no-repeat bg-cover min-h-[648px] max-md:px-0 max-md:py-36 max-sm:px-0 max-sm:py-24"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        <HeroContent />
      </section>
    </>
  )
}

export default HeroSection

