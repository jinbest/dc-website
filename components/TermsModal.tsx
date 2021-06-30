import React from "react"
import { IconButton } from "@material-ui/core"
import { Close } from "@material-ui/icons"
import Modal from "@material-ui/core/Modal"
import Backdrop from "@material-ui/core/Backdrop"
import Fade from "@material-ui/core/Fade"
import terms from "../data/terms.json"
import _, { isEmpty } from "lodash"

type Props = {
  openModal: boolean
  handleModal: (val: boolean) => void
}

const TermsModal = ({ openModal, handleModal }: Props) => {
  const termsData = _.cloneDeep(terms)

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
          <div className="paper">
            <div className="modal-header">
              <IconButton aria-label="close" className="modal-close-icon" onClick={handleClose}>
                <Close />
              </IconButton>
            </div>
            <p className="modal-title">{termsData.title}</p>
            <div className="modal-body">
              <p className="modal-content bold">{termsData.date}</p>
              {termsData.abstract.map((item: string, index: number) => {
                return (
                  <p className="modal-content bold upper-case" key={index}>
                    {item}
                  </p>
                )
              })}
              <ol className="modal-data-container">
                {_.sortBy(termsData.data, (o) => o.order).map((item: any, index: number) => {
                  return (
                    <div key={index}>
                      {item.visible ? (
                        <div>
                          <li className="modal-content bold">
                            <span>{item.title}</span>
                          </li>
                          <div>
                            {item.content.map((it: string, idx: number) => {
                              return (
                                <p className="modal-content" key={`${index}-${idx}`}>
                                  {it}
                                </p>
                              )
                            })}
                          </div>
                          {!isEmpty(item.childlist) ? (
                            <div>
                              <p className="modal-content">{item.childlist.title}</p>
                              <ul className="childlist-data">
                                {_.sortBy(item.childlist.data, (o) => o.order).map(
                                  (it: any, idx: number) => {
                                    return (
                                      <React.Fragment key={`${index}-${idx}`}>
                                        {it.visible ? (
                                          <li>
                                            <p className="modal-content">
                                              {it.keyword.map((itKey: string, idxKey: number) => {
                                                return (
                                                  <span
                                                    className="bold"
                                                    key={`${index}-${idx}-${idxKey}`}
                                                  >
                                                    {`"${itKey}", `}
                                                  </span>
                                                )
                                              })}
                                              {it.content.map((itCont: any, idxCont: number) => {
                                                return (
                                                  <span key={`${index}-${idx}-${idxCont}`}>
                                                    {`${itCont.text} `}
                                                    {!isEmpty(itCont.link) ? (
                                                      <a
                                                        href={itCont.link.href}
                                                        target="_blank"
                                                        rel="noreferrer"
                                                      >{`${itCont.link.text} `}</a>
                                                    ) : (
                                                      <></>
                                                    )}
                                                  </span>
                                                )
                                              })}
                                            </p>
                                            {it.child.length ? (
                                              <ul className="it-child-list">
                                                {it.child.map(
                                                  (itChild: string, idxChild: number) => {
                                                    return (
                                                      <li key={`${index}-${idx}-${idxChild}`}>
                                                        {itChild}
                                                      </li>
                                                    )
                                                  }
                                                )}
                                              </ul>
                                            ) : (
                                              <></>
                                            )}
                                          </li>
                                        ) : (
                                          <></>
                                        )}
                                      </React.Fragment>
                                    )
                                  }
                                )}
                              </ul>
                            </div>
                          ) : (
                            <></>
                          )}
                          {item.childData.length ? (
                            <ul className="childdata-container">
                              {_.sortBy(item.childData, (o) => o.order).map(
                                (it: any, idx: number) => {
                                  return (
                                    <React.Fragment key={`${index}-${idx}`}>
                                      {it.visible ? (
                                        <div>
                                          <li>
                                            <span className="bold">{it.title}</span>
                                            {it.content.map((itCont: string, idxCont: number) => {
                                              return (
                                                <p
                                                  className="modal-content"
                                                  key={`${index}-${idx}-${idxCont}`}
                                                >
                                                  {itCont}
                                                </p>
                                              )
                                            })}
                                          </li>
                                        </div>
                                      ) : (
                                        <></>
                                      )}
                                    </React.Fragment>
                                  )
                                }
                              )}
                            </ul>
                          ) : (
                            <></>
                          )}
                        </div>
                      ) : (
                        <></>
                      )}
                    </div>
                  )
                })}
              </ol>
              <p className="modal-content bold">{termsData.footer.name}</p>
              <p className="modal-content bold">{`Mailing Address: ${termsData.footer.address}`}</p>
              <p className="modal-content bold">
                Email Address:&nbsp;
                <span>
                  <a href={`mailto:${termsData.footer.email}`}>{termsData.footer.email}</a>
                </span>
              </p>
              <p className="modal-content bold">{termsData.footer.copyright}</p>
            </div>
          </div>
        </Fade>
      </Modal>
    </div>
  )
}

export default TermsModal
