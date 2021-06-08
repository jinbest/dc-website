interface Item {
  title: string
  icon: string
  order: number
  visible: boolean
}

export interface Sec3ChildParams {
  title: string
  icon: string
  img: string
  direction: number
  order: number
  visible: boolean
  data: Item[]
}
