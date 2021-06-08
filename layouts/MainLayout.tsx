import React from "react"
import Header from "../components/Header"

type Props = {
  children: any
}

const MainLayout = ({ children }: Props) => {
  return (
    <div>
      <Header />
      {children}
    </div>
  )
}

export default MainLayout
