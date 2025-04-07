import type * as React from "react"
import type { FooterNavSectionProps } from "../../../../types"

export const FooterNavSection: React.FC<FooterNavSectionProps> = ({ title, links }) => {
  return (
    <nav className="grow max-md:mt-10">
      <h2 className="text-xl font-semibold text-black">{title}</h2>
      <ul className="mt-3 w-full text-base font-light text-black">
        {links.map((link, index) => (
          <li key={index} className={index > 0 ? "mt-2" : ""}>
            <a
              href={link.href}
              className="hover:text-gray-600 transition-colors"
              aria-label={`Navigate to ${link.text}`}
            >
              {link.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default FooterNavSection

