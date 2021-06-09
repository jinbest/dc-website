import { ChildVariantsProps } from "../models/child-variants-params"

export function ValidateEmail(e: string) {
  const re =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return re.test(e)
}

export function variants(val: number) {
  return {
    open: {
      opacity: 1,
      transition: {
        staggerChildren: 0.02,
        delay: val,
      },
    },
    close: {
      opacity: 0,
      transition: {
        delay: 0.1,
        staggerChildren: 0.02,
      },
    },
  }
}

export function childVariants(val: ChildVariantsProps) {
  return {
    open: {
      x: 0,
      y: 0,
      opacity: 1,
    },
    close: {
      x: val.x ? val.x : 0,
      y: val.y ? val.y : 0,
      opacity: 0,
    },
  }
}

export function rand(min: number, max: number) {
  return Math.random() * (max - min) + min
}
