import React, { useState, useEffect, useRef } from "react"
import config from "../../data/config.json"
import { Grid } from "@material-ui/core"
import _ from "lodash"
import { Sec3ChildParams, Sec3ChildButtonParams } from "../../models/sec3-child-params"
import ChildButton from "./child-button"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { ChildVariantsProps } from "../../models/child-variants-params"
import { variants, childVariants, rand } from "../../service/helper"

type RectProps = {
  top: number
  height: number
}

const Section3 = () => {
  const bg = config.general.colorPalle.bg1,
    brandDark = config.general.colorPalle.brandDark,
    brandOxford = config.general.colorPalle.brandOxford,
    thisPage = config.main.section3

  const children: Sec3ChildParams[] = _.sortBy(thisPage.children, (o) => o.order)

  const [refTitle, inViewTitle] = useInView({
    triggerOnce: true,
  })
  const [refContent, inViewContent] = useInView({
    triggerOnce: true,
  })
  const refsChildren = useRef<(HTMLDivElement | null)[]>(
    _.cloneDeep(new Array(children.length).fill(null))
  )

  const [openTitle, setOpenTitle] = useState(false)
  const [openContent, setOpenContent] = useState(false)
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
    setOpenContent(inViewContent)
  }, [inViewContent])

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
    <div className="section3" style={{ background: bg }} id="features">
      <div className="section3-container">
        <motion.div initial="close" animate={openTitle ? "open" : "close"} variants={variants(0.1)}>
          <motion.p
            variants={childVariants({ y: 150 } as ChildVariantsProps)}
            transition={{ duration: 0.5 }}
            className="main-title section3-title"
            style={{ color: brandOxford }}
            ref={refTitle}
          >
            {thisPage.title}
          </motion.p>
        </motion.div>

        <motion.div
          initial="close"
          animate={openContent ? "open" : "close"}
          variants={variants(0.8)}
        >
          <motion.p
            variants={childVariants({ y: 100 } as ChildVariantsProps)}
            transition={{ duration: 1.2 }}
            className="main-content section3-content"
            style={{ color: brandDark }}
            ref={refContent}
          >
            {thisPage.content}
          </motion.p>
        </motion.div>

        <div className="children-container">
          {children.map((item: Sec3ChildParams, index: number) => {
            return (
              <React.Fragment key={index}>
                {item.visible ? (
                  <Grid
                    container
                    spacing={2}
                    className="children"
                    ref={(ref) => (refsChildren.current[index] = ref)}
                  >
                    <Grid
                      item
                      xs={12}
                      md={6}
                      className="child-data"
                      style={{ order: 2 - item.direction }}
                    >
                      <motion.div
                        initial="close"
                        animate={openChildren[index] ? "open" : "close"}
                        variants={variants(0.5)}
                      >
                        <motion.div
                          variants={childVariants({
                            y: (0.5 - item.direction) * 500,
                          } as ChildVariantsProps)}
                          transition={{ duration: 1 }}
                        >
                          <img className="child-icon" src={item.icon} alt={`child-icon-${index}`} />
                          <p className="sub-title sec3-subtitle" style={{ color: brandOxford }}>
                            {item.title}
                          </p>
                        </motion.div>
                      </motion.div>
                      <div className="child-button-container">
                        {_.sortBy(item.data, (o) => o.order).map(
                          (it: Sec3ChildButtonParams, idx: number) => {
                            return (
                              <React.Fragment key={`${index}-${idx}`}>
                                {it.visible ? (
                                  <motion.div
                                    initial="close"
                                    animate={openChildren[index] ? "open" : "close"}
                                    variants={variants(rand(0.8, 1.5))}
                                  >
                                    <ChildButton title={it.title} icon={it.icon} />
                                  </motion.div>
                                ) : (
                                  <></>
                                )}
                              </React.Fragment>
                            )
                          }
                        )}
                      </div>
                    </Grid>
                    <Grid
                      item
                      xs={12}
                      md={6}
                      className="child-img"
                      style={{ order: item.direction + 1 }}
                    >
                      <motion.div
                        initial="close"
                        animate={openChildren[index] ? "open" : "close"}
                        variants={variants(0.5)}
                      >
                        <motion.img
                          variants={childVariants({
                            y: (item.direction - 0.5) * 500,
                          } as ChildVariantsProps)}
                          transition={{ duration: 1 }}
                          src={item.img}
                          alt={`child-img-${index}`}
                        />
                      </motion.div>
                    </Grid>
                  </Grid>
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

export default Section3
