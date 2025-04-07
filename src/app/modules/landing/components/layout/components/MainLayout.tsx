import type React from "react"
import Header from "./Header"
import Footer from "./footer/Footer"
import ChatWidget from "../../chat/ChatWidget"

interface MainLayoutProps {
  children: React.ReactNode
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="pt-20 w-full relative z-0">{children}</main>
      <Footer />
      <ChatWidget />
    </div>
  )
}

export default MainLayout