import type * as React from "react"

const FooterLogo: React.FC = () => {
  return (
    <div className="w-full font-semibold text-black">
      <img 
        src="/images/CustomsImg.svg"
        alt="Custom Image" 
        className="object-contain w-16 sm:w-20 aspect-square" 
      />
      <h1 className="text-lg sm:text-xl mt-2">CVMS</h1>
      <p className="text-base sm:text-xl mt-1">Customs Verification Management System</p>
    </div>
  )
}

export default FooterLogo