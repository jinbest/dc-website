import React from "react"
import { IconButton } from "@material-ui/core"
import { Close } from "@material-ui/icons"
import Modal from "@material-ui/core/Modal"
import Backdrop from "@material-ui/core/Backdrop"
import Fade from "@material-ui/core/Fade"
import privacy from "../static/privacy.json"
import _, { isEmpty } from "lodash"

type Props = {
  openModal: boolean
  handleModal: (val: boolean) => void
}

const PrivacyModal = ({ openModal, handleModal }: Props) => {
  const privacyData = _.cloneDeep(privacy)

  const handleClose = () => {
    handleModal(false)
  }

  return (
    <div>
      <Modal
        className="terms-privacy-modal"
        open={openModal}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={openModal}>
          <div className="paper custom-scroll-bar">
            <div className="modal-header">
              <IconButton aria-label="close" className="modal-close-icon" onClick={handleClose}>
                <Close />
              </IconButton>
            </div>
            <p className="modal-title">{privacyData.title}</p>
            <div className="modal-body">
              <p className="modal-content bold">{privacyData.date}</p>
              {privacyData.abstract.map((item: string, index: number) => {
                return (
                  <p className="modal-content bold upper-case" key={index}>
                    {item}
                  </p>
                )
              })}
              <p className="modal-content">{privacyData.content}</p>

              <p className="modal-content bold">{privacyData.footer.name}</p>
              <p className="modal-content bold">{`Mailing Address: ${privacyData.footer.address}`}</p>
              <p className="modal-content bold">
                Telephone No.:&nbsp;
                <span>
                  <a href={`tel:${privacyData.footer.telephone}`}>{privacyData.footer.telephone}</a>
                </span>
              </p>
              <p className="modal-content bold">
                E-mail:&nbsp;
                <span>
                  <a href={`mailto:${privacyData.footer.email}`}>{privacyData.footer.email}</a>
                </span>
              </p>
            </div>
          </div>
        </Fade>
      </Modal>
    </div>
  )
}

export default PrivacyModal
