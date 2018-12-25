import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import 'bootstrap/dist/css/bootstrap.min.css'
import * as actions from '../actions'
import styles from '../css/forms/ProviderResponseForm.css'

class ProviderResponseForm extends Component {
  state = {
    ambiResponse: null,
  }

  componentDidMount() {}

  sendAmbiResponse = ambiResponse => {
    console.log(`sendAmbiResponse(${ambiResponse})`)
    this.setState({ ambiResponse })
    console.log(`this.state.ambiResponse: ${ambiResponse}`)
    this.props.sendAmbiResponse({ ambiResponse })
  }

  render() {
    const { providerResponse } = this.props
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
            <div className={styles.subtitle}>suggestion:</div>

            <div className={styles.providerResponse}>
              <div className={styles.providerResponseItem}>
                {providerResponse.name}
              </div>
              <div className={styles.providerResponseItem}>
                {providerResponse.company}
              </div>
              <div className={styles.providerResponseItem}>
                {providerResponse.website}
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
                <button
                  className={styles.rejectButton}
                  onClick={() => this.sendAmbiResponse('reject')}
                >
                  Reject
                </button>
                <button
                  className={styles.acceptButton}
                  onClick={() => this.sendAmbiResponse('accept')}
                >
                  Accept
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    )
  }
}

const mapStateToProps = state => {
  const { providerResponse } = state.app
  console.log('mapStateToProps() - providerResponse: ', providerResponse)
  return { providerResponse }
}

ProviderResponseForm.propTypes = {
  providerResponse: PropTypes.object,
}

ProviderResponseForm.defaultProps = {
  providerResponse: {},
}

export default connect(
  mapStateToProps,
  actions
)(ProviderResponseForm)
