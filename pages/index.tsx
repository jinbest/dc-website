import React from "react"
import { GetStaticProps } from "next"
import Header from "../components/Header"
import Main from "../views/Main"

interface Props {
  test: string
}

export default function Home(data: Props) {
  console.log("props", data)
  return (
    <div>
      <Header />
      <Main />
      <footer></footer>
    </div>
  )
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  return {
    props: {
      test: "test-props",
    },
  }
}
