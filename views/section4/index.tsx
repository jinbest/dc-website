import React, { useState, useEffect, useRef } from "react"
import config from "../../static/config.json"
import { Grid } from "@material-ui/core"
import _ from "lodash"
import { Sec4ChildCardParams, Sec4ChildParams } from "../../models/sec4-child-params"
import ChildCard from "./child-card"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { ChildVariantsProps } from "../../models/child-variants-params"
import { variants, childVariants, rand } from "../../service/helper"

type RectProps = {
  top: number
  height: number
}

const Section4 = () => {
  const bg = config.general.colorPalle.bg1,
    brandOxford = config.general.colorPalle.brandOxford,
    thisPage = config.main.section4

  const children: Sec4ChildParams[] = _.sortBy(thisPage.children, (o) => o.order)

  const [refTitle, inViewTitle] = useInView({
    triggerOnce: true,
  })
  const refsChildren = useRef<(HTMLDivElement | null)[]>(
    _.cloneDeep(new Array(children.length).fill(null))
  )

  const [openTitle, setOpenTitle] = useState(false)
  const [openChildren, setOpenChildren] = useState<boolean[]>(
    _.cloneDeep(new Array(children.length).fill(false))
  )
  const [childrenRects, setChildrenRects] = useState<RectProps[]>(
    _.cloneDeep(new Array(children.length).fill({ top: 0, height: 0 } as RectProps))
  )

  useEffect(() => {
    setOpenTitle(inViewTitle)
  }, [inViewTitle])

  useEffect(() => {
    CalcChildRefsRects()
  }, [refsChildren])

  const ChildStatus = (children: boolean[]) => {
    let status = true
    for (let i = 0; i < children.length; i++) {
      if (!children[i]) {
        status = false
        break
      }
    }
    return status
  }

  const CalcChildRefsRects = () => {
    if (ChildStatus(openChildren)) {
      return
    }
    const cntChildRects = []
    let ele = null,
      eleRect = null
    for (let i = 0; i < refsChildren.current.length; i++) {
      ele = refsChildren.current[i] as HTMLDivElement
      eleRect = ele.getBoundingClientRect()
      cntChildRects.push({
        top: eleRect.top,
        height: eleRect.height,
      })
    }
    setChildrenRects(cntChildRects)
  }

  useEffect(() => {
    const cntOpenChild = _.cloneDeep(openChildren)
    const height = window.innerHeight
    for (let i = 0; i < childrenRects.length; i++) {
      if (childrenRects[i].top < height - 250) {
        cntOpenChild[i] = true
      } else {
        cntOpenChild[i] = false
      }
    }
    setOpenChildren(cntOpenChild)
  }, [childrenRects])

  useEffect(() => {
    window.addEventListener("scroll", CalcChildRefsRects, false)
    return () => {
      window.removeEventListener("scroll", CalcChildRefsRects)
    }
  }, [openChildren])

  return (
    <div className="section4" style={{ background: bg }} id="partners">
      <div className="section4-container">
        <motion.div initial="close" animate={openTitle ? "open" : "close"} variants={variants(0.1)}>
          <motion.p
            variants={childVariants({ y: 150 } as ChildVariantsProps)}
            transition={{ duration: 0.5 }}
            className="main-title section4-title"
            style={{ color: brandOxford }}
            ref={refTitle}
          >
            {thisPage.title}
          </motion.p>
        </motion.div>

        <div>
          {children.map((item: Sec4ChildParams, index: number) => {
            return (
              <React.Fragment key={index}>
                {item.visible ? (
                  <div
                    className="child-card-container"
                    ref={(ref) => (refsChildren.current[index] = ref)}
                  >
                    <motion.div
                      initial="close"
                      animate={openChildren[index] ? "open" : "close"}
                      variants={variants(0.5)}
                    >
                      <motion.p
                        variants={childVariants({
                          y: -100,
                        } as ChildVariantsProps)}
                        transition={{ duration: 0.8 }}
                        className="sub-title sec4-subtitle"
                        style={{ color: brandOxford }}
                      >
                        {item.title}
                      </motion.p>
                    </motion.div>
                    <Grid container spacing={2}>
                      {_.sortBy(item.data, (o) => o.order).map(
                        (it: Sec4ChildCardParams, idx: number) => {
                          return (
                            <React.Fragment key={`${index}-${idx}`}>
                              {it.visible ? (
                                <Grid item xs={12} md={item.display === 1 ? 6 : 4}>
                                  <motion.div
                                    initial="close"
                                    animate={openChildren[index] ? "open" : "close"}
                                    variants={variants(rand(0.8, 1.5))}
                                  >
                                    <ChildCard
                                      title={it.title}
                                      flags={it.flags}
                                      tags={it.tags}
                                      content={it.content}
                                    />
                                  </motion.div>
                                </Grid>
                              ) : (
                                <></>
                              )}
                            </React.Fragment>
                          )
                        }
                      )}
                    </Grid>
                  </div>
                ) : (
                  <></>
                )}
              </React.Fragment>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default Section4
