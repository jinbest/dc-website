import React, { useState, useEffect } from "react"
import config from "../../static/config.json"
import { Grid } from "@material-ui/core"
import _ from "lodash"
import { Sec3ChildParams, Sec3ChildButtonParams } from "../../models/sec3-child-params"
import ChildButton from "./child-button"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { ChildVariantsProps } from "../../models/child-variants-params"
import { variants, childVariants, rand } from "../../service/helper"

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
  // const [refData, inViewData] = useInView({
  //   threshold: 0.3,
  //   triggerOnce: true,
  // })

  const [openTitle, setOpenTitle] = useState(false)
  const [openContent, setOpenContent] = useState(false)
  // const [openData, setOpenData] = useState(false)

  useEffect(() => {
    setOpenTitle(inViewTitle)
  }, [inViewTitle])

  useEffect(() => {
    setOpenContent(inViewContent)
  }, [inViewContent])

  // useEffect(() => {
  //   setOpenData(inViewData)
  // }, [inViewData])

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
                  <Grid container spacing={2} className="children">
                    <Grid
                      item
                      xs={12}
                      md={6}
                      className="child-data"
                      style={{ order: 2 - item.direction }}
                    >
                      <img className="child-icon" src={item.icon} alt={`child-icon-${index}`} />
                      <p className="sub-title sec3-subtitle" style={{ color: brandOxford }}>
                        {item.title}
                      </p>
                      <div className="child-button-container">
                        {_.sortBy(item.data, (o) => o.order).map(
                          (it: Sec3ChildButtonParams, idx: number) => {
                            return (
                              <React.Fragment key={`${index}-${idx}`}>
                                {it.visible ? (
                                  <ChildButton title={it.title} icon={it.icon} />
                                ) : (
                                  // <motion.div
                                  //   initial="close"
                                  //   animate={openData ? "open" : "close"}
                                  //   variants={variants(rand(1.3, 2.5))}
                                  // >
                                  //   <ChildButton title={it.title} icon={it.icon} />
                                  // </motion.div>
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
                      <img src={item.img} alt={`child-img-${index}`} />
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
