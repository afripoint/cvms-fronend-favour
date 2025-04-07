// User related types
export interface User {
    first_name?: string
    last_name?: string
    email?: string
  }
  
  // Navigation related types
  export interface NavigationItem {
    label: string
    href: string
  }
  
  export interface NavLink {
    text: string
    href: string
  }
  
  export interface FooterNavSectionProps {
    title: string
    links: NavLink[]
  }
  
  export interface ProfileSectionProps {
    firstName?: string
    lastName?: string
    email?: string
  }
  
  