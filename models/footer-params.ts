export interface FooterLinkParams {
  link: string
  img: string
  title: string
  order: number
  visible: boolean
}

export interface FooterDataParams {
  title: string
  order: number
  visible: boolean
  child: FooterLinkParams[]
}
