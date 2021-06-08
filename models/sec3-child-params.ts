export interface Sec3ChildParams {
  title: string
  icon: string
  img: string
  direction: number
  order: number
  visible: boolean
  data: Sec3ChildButtonParams[]
}

export interface Sec3ChildButtonParams {
  title: string
  icon: string
  order: number
  visible: boolean
}
