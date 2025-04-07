import type { NavigationItem } from "../types"

export const navigationItems: NavigationItem[] = [
  { label: "Home", href: "/" },
  { label: "VIN Check", href: "vin" },
  { label: "Status Tracker", href: "#" },
  { label: "Accredify", href: "#" },
  { label: "Supply Chain", href: "#" },
  { label: "How it Works", href: "how-it-works" },
]

export const footerNavSections = {
  aboutUs: {
    title: "About Us",
    links: [
      { text: "Why Choose CVMS?", href: "#" },
      { text: "Company", href: "#" },
      { text: "Pricing", href: "#" },
      { text: "Career", href: "#" },
      { text: "Privacy", href: "#" },
      { text: "Testimonial", href: "#" },
    ],
  },
  learn: {
    title: "Learn",
    links: [
      { text: "Blog", href: "#" },
      { text: "User Guides", href: "#" },
    ],
  },
  developers: {
    title: "Developers",
    links: [
      { text: "Documentation", href: "#" },
      { text: "Integrations", href: "#" },
    ],
  },
  support: {
    title: "Support",
    links: [
      { text: "Help Desk", href: "#" },
      { text: "Contact Us", href: "#" },
      { text: "FAQ", href: "#" },
    ],
  },
}

export const socialLinks = [
  {
    src: "https://cdn.builder.io/api/v1/image/assets/TEMP/5ffb1dcbb5c64e47676f4eed1898be2f42d5f9053a442301ab7307c934f9c18e?placeholderIfAbsent=true&apiKey=fc2525aed0dd41cca84f4f0ce35f4505",
    alt: "Social Media Link 1",
  },
  {
    src: "https://cdn.builder.io/api/v1/image/assets/TEMP/6ae5b834db9d5b756c716dfd3272b2fce39bff5435417d66b3b7f69115330167?placeholderIfAbsent=true&apiKey=fc2525aed0dd41cca84f4f0ce35f4505",
    alt: "Social Media Link 2",
  },
  {
    src: "https://cdn.builder.io/api/v1/image/assets/TEMP/1af1ca6c8f7eb4a78f422d1a5e26b427c444095660268832180788c8e7ccc901?placeholderIfAbsent=true&apiKey=fc2525aed0dd41cca84f4f0ce35f4505",
    alt: "Social Media Link 3",
  },
  {
    src: "https://cdn.builder.io/api/v1/image/assets/TEMP/345d3edeec0bde62915027cede578fcb0d37c19460025c7d8fcfd57aafb69b29?placeholderIfAbsent=true&apiKey=fc2525aed0dd41cca84f4f0ce35f4505",
    alt: "Social Media Link 4",
  },
]

