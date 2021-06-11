import React from "react"
// import { GetStaticProps } from "next"
import Main from "../views/Main"
import MainLayout from "../layouts/MainLayout"

// interface Props {
//   test: string
// }

export default function Index() {
  return (
    <MainLayout>
      <Main />
    </MainLayout>
  )
}

// export const getStaticProps: GetStaticProps<Props> = async () => {
//   return {
//     props: {
//       test: "test",
//     },
//   }
// }
