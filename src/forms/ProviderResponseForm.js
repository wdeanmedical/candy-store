import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Images from '@local/assets/index'
import * as actions from '../actions'
import * as Constants from '../constants/constants'
import styles from '../css/forms/ProviderResponseForm.css'

class ProviderResponseForm extends Component {
  state = {
    acceptImage: Images.thumbsUpButton,
    rejectImage: Images.thumbsDownButton,
  }

  componentDidMount() {}

  sendAmbiResponse = ambiResponse => {
    const { sendAmbiResponse } = this.props
    sendAmbiResponse({ ambiResponse })
  }

  render() {
    const { providerResponse, ambiResponse } = this.props
    const { acceptImage, rejectImage } = this.state
    return (
      <div className={styles.root}>
        <div className={styles.title}>submitted suggestion form</div>
        {providerResponse === null && (
          <div className={styles.subtitle}>
            currently waiting for a response...
          </div>
        )}
        {providerResponse && (
          <div>
            <div className={styles.providerResponseTitle}>suggestion:</div>

            <div className={styles.providerResponse}>
              <div className={styles.providerResponseItem}>
                {providerResponse.name}
              </div>
              <div className={styles.providerResponseItem}>
                {providerResponse.company}
              </div>
              <div className={styles.providerResponseItem}>
                <a
                  href={providerResponse.website}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {providerResponse.website}
                </a>
              </div>
              <div className={styles.providerResponseItem}>
                {providerResponse.email}
              </div>
              <div className={styles.providerResponseItem}>
                {providerResponse.specialty}
              </div>
              <div className={styles.providerResponseItem}>
                {providerResponse.price}
              </div>
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
                    ambiResponse &&
                    ambiResponse.ambiResponse === Constants.REJECT
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
                  onClick={() => this.sendAmbiResponse(Constants.REJECT)}
                />
                <img
                  width="30"
                  height="30"
                  src={
                    ambiResponse &&
                    ambiResponse.ambiResponse === Constants.ACCEPT
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
                  onClick={() => this.sendAmbiResponse(Constants.ACCEPT)}
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
  const { providerResponse, ambiResponse } = state.app
  return { providerResponse, ambiResponse }
}

ProviderResponseForm.propTypes = {
  sendAmbiResponse: PropTypes.func,
  providerResponse: PropTypes.shape({
    name: PropTypes.string,
    company: PropTypes.string,
    email: PropTypes.string,
    website: PropTypes.string,
    specialty: PropTypes.string,
    price: PropTypes.string,
  }),
  ambiResponse: PropTypes.shape({
    ambiResponse: PropTypes.string,
  }),
}

ProviderResponseForm.defaultProps = {
  sendAmbiResponse: undefined,
  providerResponse: {},
  ambiResponse: null,
}

export default connect(
  mapStateToProps,
  actions
)(ProviderResponseForm)
