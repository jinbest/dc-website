import React from "react"
import { IconButton } from "@material-ui/core"
import { Close } from "@material-ui/icons"
import Modal from "@material-ui/core/Modal"
import Backdrop from "@material-ui/core/Backdrop"
import Fade from "@material-ui/core/Fade"
import privacy from "../static/privacy.json"
import _ from "lodash"

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
              <ol className="modal-data-container">
                {_.sortBy(privacyData.data, (o) => o.order).map((item: any, index: number) => {
                  return (
                    <div key={index}>
                      {item.visible ? (
                        <div>
                          <li
                            className="modal-conten"
                            style={{
                              textTransform: "uppercase",
                              padding: "7px 0",
                              fontWeight: item.contentBold ? "bold" : "inherit",
                            }}
                          >
                            <span>{item.title}</span>
                          </li>
                          <div>
                            {item.children.map((it: any, idx: number) => {
                              return (
                                <div key={`${index}-${idx}`}>
                                  <p className="modal-content">
                                    <span className="bold" style={{ marginRight: "15px" }}>{`${
                                      index + 1
                                    }.${idx + 1}`}</span>
                                    <span className="bold">{it.title.bold}</span>&nbsp;
                                    <span
                                      style={{ fontWeight: item.contentBold ? "bold" : "inherit" }}
                                    >
                                      {it.title.thin}
                                    </span>
                                  </p>
                                  {it.child.length ? (
                                    <ul>
                                      {it.child.map((itChild: any, idxChild: number) => {
                                        return (
                                          <div key={`${index}-${idx}-${idxChild}`}>
                                            <li
                                              style={{ listStyle: "lower-alpha" }}
                                              className="modal-content"
                                            >
                                              <div style={{ marginLeft: "10px" }}>
                                                <span
                                                  className="modal-content"
                                                  style={{
                                                    fontWeight: item.contentBold
                                                      ? "bold"
                                                      : "inherit",
                                                  }}
                                                >
                                                  {itChild.title}
                                                </span>
                                                {itChild.child.length ? (
                                                  <ul>
                                                    {itChild.child.map((itC: any, idxC: number) => {
                                                      return (
                                                        <li
                                                          style={{
                                                            listStyle: "lower-roman",
                                                            fontWeight: item.contentBold
                                                              ? "bold"
                                                              : "inherit",
                                                          }}
                                                          className="modal-content"
                                                          key={`${index}-${idx}-${idxChild}-${idxC}`}
                                                        >
                                                          {itC}
                                                        </li>
                                                      )
                                                    })}
                                                  </ul>
                                                ) : (
                                                  <></>
                                                )}
                                              </div>
                                            </li>
                                          </div>
                                        )
                                      })}
                                    </ul>
                                  ) : (
                                    <></>
                                  )}
                                </div>
                              )
                            })}
                          </div>
                        </div>
                      ) : (
                        <></>
                      )}
                    </div>
                  )
                })}
              </ol>
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
