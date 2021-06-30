import React, { useState, useEffect } from "react"
import Shape from "./shape"
import config from "../../static/config.json"
import { Grid } from "@material-ui/core"
import CustomButton from "../../components/CustomButton"
import ApiConfig from "../../config/config"
import { PostEmailParams } from "../../models/post-email-params"
import { ToastMsgParams } from "../../components/toast/toast-msg-params"
import { ValidateEmail, variants, childVariants } from "../../service/helper"
import Toast from "../../components/toast/toast"
import ApiClient from "../../service/api-client"
import Loading from "../../components/Loading"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { ChildVariantsProps } from "../../models/child-variants-params"
import TermsModal from "../../components/TermsModal"
import PrivacyModal from "../../components/PrivacyModal"

const apiClient = ApiClient.getInstance()

const Section1 = () => {
  const bg = config.general.colorPalle.bg1,
    brandDark = config.general.colorPalle.brandDark,
    brandOxford = config.general.colorPalle.brandOxford
  const thisPage = config.main.section1

  const [refTitle, inViewTitle] = useInView({
    triggerOnce: true,
  })
  const [refContent, inViewContent] = useInView({
    triggerOnce: true,
  })
  const [refButton, inViewButton] = useInView({
    triggerOnce: true,
  })
  const [refTrust, inViewTrust] = useInView({
    triggerOnce: true,
  })
  const [refImage, inViewImage] = useInView({
    triggerOnce: true,
  })

  const [value, setValue] = useState("")
  const [toastParams, setToastParams] = useState<ToastMsgParams>({} as ToastMsgParams)
  const [errEmail, setErrEmail] = useState(false)
  const [isSubmiting, setIsSubmiting] = useState(false)

  const [openTitle, setOpenTitle] = useState(false)
  const [openContent, setOpenContent] = useState(false)
  const [openButton, setOpenButton] = useState(false)
  const [openTrust, setOpenTrust] = useState(false)
  const [openImage, setOpenImage] = useState(false)

  const [openTermsModal, setOpenTermsModal] = useState(false)
  const [openPrivacyModal, setOpenPrivacyModal] = useState(false)

  useEffect(() => {
    setOpenTitle(inViewTitle)
  }, [inViewTitle])

  useEffect(() => {
    setOpenContent(inViewContent)
  }, [inViewContent])

  useEffect(() => {
    setOpenButton(inViewButton)
  }, [inViewButton])

  useEffect(() => {
    setOpenTrust(inViewTrust)
  }, [inViewTrust])

  useEffect(() => {
    setOpenImage(inViewImage)
  }, [inViewImage])

  const handleSubmitEmail = async () => {
    const apiUrl = `${ApiConfig.ADMIN_SERVICE_API_URL}dc/waitlist`
    const params: PostEmailParams = {
      email: value,
      is_signed_up: false,
    }

    let msg = "Successfully added to the waitlist",
      failed = false

    try {
      setIsSubmiting(true)
      await apiClient.post<any>(apiUrl, params)
    } catch (error) {
      if (error.response.status === 409) {
        msg = "That email already exist on the waitlist"
      } else {
        msg = "Something went wrong, failed to add email to the waitlist"
      }
      failed = true
    } finally {
      setIsSubmiting(false)
      setToastParams({
        msg,
        isSuccess: !failed,
        isError: failed,
      })
      setValue("")
    }
  }

  const onSubmit = (event: any) => {
    event.preventDefault()
    if (value && ValidateEmail(value)) {
      handleSubmitEmail()
    } else {
      setErrEmail(true)
      setTimeout(() => {
        setErrEmail(false)
        setValue("")
      }, 1500)
      return
    }
  }

  const resetStatuses = () => {
    setToastParams({
      msg: "",
      isError: false,
      isWarning: false,
      isInfo: false,
      isSuccess: false,
    })
  }

  return (
    <div className="section1" style={{ background: bg }}>
      <Shape />
      <Grid container spacing={2} className="section1-container">
        <Grid item xs={12} md={6}>
          <motion.div
            initial="close"
            animate={openTitle ? "open" : "close"}
            variants={variants(0.1)}
          >
            <motion.p
              variants={childVariants({ y: 150 } as ChildVariantsProps)}
              transition={{ duration: 0.3 }}
              className="main-title section1-title"
              style={{ color: brandOxford }}
              ref={refTitle}
            >
              {thisPage.title}
            </motion.p>
          </motion.div>

          <motion.div
            initial="close"
            animate={openContent ? "open" : "close"}
            variants={variants(0.5)}
          >
            <motion.p
              variants={childVariants({ y: 100 } as ChildVariantsProps)}
              transition={{ duration: 1 }}
              className="main-content section1-content"
              style={{ color: brandDark }}
              ref={refContent}
            >
              {thisPage.content}
            </motion.p>
          </motion.div>

          <motion.div
            initial="close"
            animate={openButton ? "open" : "close"}
            variants={variants(1)}
          >
            <motion.form className="flex justify-between" ref={refButton} onSubmit={onSubmit}>
              <div className="custom-input">
                <input
                  value={value}
                  placeholder="Enter your email address"
                  onChange={(e) => {
                    setValue(e.target.value)
                  }}
                  style={{ border: errEmail ? "1px solid red" : "1px solid #465876" }}
                />
                {errEmail ? <p>Please input correct Email</p> : <></>}
              </div>
              <CustomButton
                text={thisPage.button.text}
                iconName={thisPage.button.iconName}
                // onClick={onSubmit}
                disable={isSubmiting}
                type="submit"
              >
                {isSubmiting && <Loading />}
              </CustomButton>
            </motion.form>
          </motion.div>

          <motion.div
            initial="close"
            animate={openTrust ? "open" : "close"}
            variants={variants(1.5)}
          >
            <motion.p
              className="main-content section1-content"
              style={{ color: brandDark }}
              ref={refTrust}
            >
              {thisPage.entering}&nbsp;
              <span onClick={() => setOpenTermsModal(true)}>terms of service</span>&nbsp; and&nbsp;
              <span onClick={() => setOpenPrivacyModal(true)}>privacy policy.</span>
            </motion.p>
          </motion.div>
        </Grid>
        <Grid item xs={12} md={6}>
          <motion.div
            initial="close"
            animate={openImage ? "open" : "close"}
            variants={variants(0.5)}
          >
            <motion.img
              variants={childVariants({ y: -150 } as ChildVariantsProps)}
              transition={{ duration: 1 }}
              className="section1-asset"
              src={thisPage.img}
              alt="section1-asset"
              ref={refImage}
            />
          </motion.div>
        </Grid>
      </Grid>
      <TermsModal openModal={openTermsModal} handleModal={setOpenTermsModal} />
      <PrivacyModal openModal={openPrivacyModal} handleModal={setOpenPrivacyModal} />
      <Toast params={toastParams} resetStatuses={resetStatuses} />
    </div>
  )
}

export default Section1
