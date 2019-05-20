import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Images from '@local/assets/index'
import * as actions from '../actions'
import * as Constants from '../constants/constants'
import styles from '../css/forms/OrderForm.css'

class OrderForm extends Component {
  state = {
    acceptImage: Images.thumbsUpButton,
    rejectImage: Images.thumbsDownButton,
  }

  componentDidMount() {}

  sendResponse = response => {
    const { sendResponse } = this.props
    sendResponse({ response })
  }

  render() {
    const { order, response } = this.props
    const { acceptImage, rejectImage } = this.state
    return (
      <div className={styles.root}>
        <div className={styles.title}>submitted suggestion form</div>
        {order === null && (
          <div className={styles.subtitle}>
            currently waiting for a response...
          </div>
        )}
        {order && (
          <div>
            <div className={styles.orderTitle}>suggestion:</div>

            <div className={styles.order}>
              <div className={styles.orderItem}>{order.name}</div>
              <div className={styles.orderItem}>{order.company}</div>
              <div className={styles.orderItem}>
                <a
                  href={order.website}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {order.website}
                </a>
              </div>
              <div className={styles.orderItem}>{order.email}</div>
              <div className={styles.orderItem}>{order.specialty}</div>
              <div className={styles.orderItem}>{order.price}</div>
            </div>

            <div className={styles.responseForm}>
              <div className={styles.responseControlTitle}>
                submit a response:
              </div>
              <div className={styles.responseControls}>
                <img
                  width="30"
                  height="30"
                  src={
                    response && response.response === Constants.REJECT
                      ? Images.thumbsDownButtonSubmitted
                      : rejectImage
                  }
                  onMouseEnter={() => {
                    this.setState({
                      rejectImage: Images.thumbsDownButtonHover,
                    })
                  }}
                  onMouseOut={() => {
                    this.setState({
                      rejectImage: Images.thumbsDownButton,
                    })
                  }}
                  className={styles.rejectButton}
                  alt="reject"
                  onClick={() => this.sendResponse(Constants.REJECT)}
                />
                <img
                  width="30"
                  height="30"
                  src={
                    response && response.response === Constants.ACCEPT
                      ? Images.thumbsUpButtonSubmitted
                      : acceptImage
                  }
                  onMouseEnter={() => {
                    this.setState({
                      acceptImage: Images.thumbsUpButtonHover,
                    })
                  }}
                  onMouseOut={() => {
                    this.setState({
                      acceptImage: Images.thumbsUpButton,
                    })
                  }}
                  className={styles.acceptButton}
                  alt="accept"
                  onClick={() => this.sendResponse(Constants.ACCEPT)}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    )
  }
}

const mapStateToProps = state => {
  const { order, response } = state.app
  return { order, response }
}

OrderForm.propTypes = {
  sendResponse: PropTypes.func,
  order: PropTypes.shape({
    name: PropTypes.string,
    company: PropTypes.string,
    email: PropTypes.string,
    website: PropTypes.string,
    specialty: PropTypes.string,
    price: PropTypes.string,
  }),
  response: PropTypes.shape({
    response: PropTypes.string,
  }),
}

OrderForm.defaultProps = {
  sendResponse: undefined,
  order: {},
  response: null,
}

export default connect(
  mapStateToProps,
  actions
)(OrderForm)
