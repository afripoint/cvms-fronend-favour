"use client"
import type * as React from "react"
import FooterNavSection from "./FooterNavSection"
import FooterLogo from "./FooterLogo"
import FooterSocialLinks from "./FooterSocialLinks"
import { footerNavSections } from "../../../../constants/navigation"

const Footer: React.FC = () => {
  return (
    <footer className="overflow-hidden px-20 py-6 bg-gray-100 max-md:px-5" role="contentinfo">
      <div className="flex gap-5 max-md:flex-col">
        <section className="w-[21%] max-md:ml-0 max-md:w-full">
          <div className="flex flex-col w-full max-md:mt-10">
            <FooterLogo />
            <FooterSocialLinks />
          </div>
        </section>

        <section className="ml-5 w-[79%] max-md:ml-0 max-md:w-full">
          <div className="max-md:mt-10 max-md:max-w-full">
            <div className="flex gap-5 max-md:flex-col">
              <div className="w-[34%] max-md:ml-0 max-md:w-full">
                <FooterNavSection {...footerNavSections.aboutUs} />
              </div>
              <div className="ml-5 w-1/5 max-md:ml-0 max-md:w-full">
                <FooterNavSection {...footerNavSections.learn} />
              </div>
              <div className="ml-5 w-[27%] max-md:ml-0 max-md:w-full">
                <FooterNavSection {...footerNavSections.developers} />
              </div>
              <div className="ml-5 w-[19%] max-md:ml-0 max-md:w-full">
                <FooterNavSection {...footerNavSections.support} />
              </div>
            </div>
          </div>
        </section>
      </div>
    </footer>
  )
}

export default Footer

