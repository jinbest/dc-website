import React from "react"
import config from "../static/config.json"
import _ from "lodash"
import { FooterLinkParams, FooterDataParams } from "../models/footer-params"
import { Grid } from "@material-ui/core"

const Footer = () => {
  const bg = config.general.colorPalle.footerBg,
    thisPage = config.footer

  const socials: FooterLinkParams[] = _.sortBy(thisPage.socials, (o) => o.order),
    data: FooterDataParams[] = _.sortBy(thisPage.data, (o) => o.order)

  return (
    <div className="footer" style={{ background: bg }}>
      <div className="footer-container">
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <a href="#">
              <img src={thisPage.logo} alt="footer-logo" />
            </a>
            <p className="footer-content">{thisPage.content}</p>
            <div className="socials-container">
              {socials.map((item: FooterLinkParams, index: number) => {
                return (
                  <React.Fragment key={index}>
                    {item.visible ? (
                      <a href={item.link}>
                        <img src={item.img} alt={`social-${index}`} />
                      </a>
                    ) : (
                      <></>
                    )}
                  </React.Fragment>
                )
              })}
            </div>
          </Grid>
          <Grid item xs={12} md={6} className="footer-data-container">
            {data.map((item: FooterDataParams, index: number) => {
              return (
                <React.Fragment key={index}>
                  {item.visible ? (
                    <div className="footer-child-data">
                      <p className="footer-child-title">{item.title}</p>
                      <div className="footer-child-link-container">
                        {item.child.map((it: FooterLinkParams, idx: number) => {
                          return (
                            <React.Fragment key={`${index}-${idx}`}>
                              {it.visible ? (
                                <div>
                                  <a href={it.link}>{it.title}</a>
                                </div>
                              ) : (
                                <></>
                              )}
                            </React.Fragment>
                          )
                        })}
                      </div>
                    </div>
                  ) : (
                    <></>
                  )}
                </React.Fragment>
              )
            })}
          </Grid>
        </Grid>
        <div className="footer-bottom">
          <p className="footer-copyright">{thisPage.copyright}</p>
          <div className="flex align-center">
            {thisPage.terms.visible ? (
              <a href={thisPage.terms.link}>{thisPage.terms.title}</a>
            ) : (
              <></>
            )}
            {thisPage.privacy.visible ? (
              <a href={thisPage.privacy.link}>{thisPage.privacy.title}</a>
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Footer
