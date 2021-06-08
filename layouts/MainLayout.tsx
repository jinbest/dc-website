import React from "react"
import Header from "../components/Header"
import Footer from "../components/Footer"

type Props = {
  children: any
}

const MainLayout = ({ children }: Props) => {
  return (
    <div>
      <Header />
      {children}
      <Footer />
    </div>
  )
}

export default MainLayout
