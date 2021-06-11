import React, { useState, useEffect } from "react"
import config from "../../static/config.json"
import { Grid } from "@material-ui/core"
import _ from "lodash"
import Card from "./card"
import { Sec2IconDataParams } from "../../models/sec2-icon-data-params"
import { motion, animate } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { ChildVariantsProps } from "../../models/child-variants-params"
import { variants, childVariants } from "../../service/helper"

type Style = {
  opacity: number
  scale: number
}

const Section2 = () => {
  const bg = config.general.colorPalle.bg2,
    brandDark = config.general.colorPalle.brandDark,
    brandOxford = config.general.colorPalle.brandOxford,
    thisPage = config.main.section2

  const iconData: Sec2IconDataParams[] = _.sortBy(thisPage.icons, (o) => o.order)

  const [refMain, inViewMain] = useInView({
    threshold: 0.2,
    triggerOnce: true,
  })
  const [refData, inViewData] = useInView({
    threshold: 0.3,
    triggerOnce: true,
  })

  const [openMain, setOpenMain] = useState(false)
  const [aniStatus, setAniStatus] = useState(false)
  const [style, setStyle] = useState<Style>({ opacity: 0, scale: 1 })

  useEffect(() => {
    setOpenMain(inViewMain)
  }, [inViewMain])

  useEffect(() => {
    if (inViewData) {
      handleAnimate()
    }
  }, [inViewData])

  const handleAnimate = () => {
    if (aniStatus) return
    setAniStatus(true)
    setStyle({
      opacity: 0,
      scale: 1.1,
    })
    setTimeout(() => {
      const controls = animate(0, 1, {
        duration: 0.2,
        onUpdate(value) {
          setStyle({
            opacity: value,
            scale: 1.1 - 0.1 * value,
          })
        },
      })
      return () => controls.stop()
    }, 500)
  }

  return (
    <div className="section2" style={{ background: bg }}>
      <div className="section2-container">
        <motion.div initial="close" animate={openMain ? "open" : "close"} variants={variants(0.1)}>
          <motion.div
            variants={childVariants({ y: 250 } as ChildVariantsProps)}
            transition={{ duration: 0.3 }}
            ref={refMain}
          >
            <div className="section2-topic">
              <img src={thisPage.topic.img} alt="section2-flag" />
              <p className="main-content" style={{ color: brandOxford }}>
                {thisPage.topic.text}
              </p>
            </div>
            <p className="main-title section2-title" style={{ color: brandOxford }}>
              {thisPage.title}
            </p>
            <p className="main-content section2-content" style={{ color: brandDark }}>
              {thisPage.content}
            </p>
          </motion.div>
        </motion.div>

        <Grid
          container
          spacing={3}
          className="section2-card-container"
          ref={refData}
          style={{ opacity: style.opacity, transform: `scale(${style.scale})` }}
        >
          {iconData.map((item: Sec2IconDataParams, index: number) => {
            return (
              <React.Fragment key={index}>
                {item.visible ? (
                  <Grid item xs={12} md={3}>
                    <Card title={item.title} content={item.content} img={item.img} />
                  </Grid>
                ) : (
                  <></>
                )}
              </React.Fragment>
            )
          })}
        </Grid>
      </div>
    </div>
  )
}

export default Section2
