export interface Sec4ChildCardParams {
  title: string
  flags: string[]
  tags: string[]
  content: string
  order: number
  visible: boolean
}

export interface Sec4ChildParams {
  title: string
  visible: boolean
  order: number
  display: number
  data: Sec4ChildCardParams[]
}
