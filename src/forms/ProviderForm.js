import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Images from '@local/assets'
import * as actions from '../actions'
import * as Constants from '../constants/constants'
import form from '../config/fields'
import styles from '../css/forms/ProviderForm.css'

class ProviderForm extends Component {
  state = {
    message: 'enter your suggestion details:',
    title: 'suggestion submission form:',
    submitted: false,
    fields: {},
    errors: {},
    overlay: false,
  }

  componentDidMount() {}

  validateForm = () => {
    this.setState({
      errors: {},
    })

    const { fields } = this.state

    const errors = {}
    let isValid = true

    const urlPattern = new RegExp(
      /(^|\s)((https?:\/\/)?[\w-]+(\.[\w-]+)+\.?(:\d+)?(\/\S*)?)/gi
    )
    if (!urlPattern.test(fields.website)) {
      isValid = false
      errors.website = 'enter a valid website url...'
    }

    const emailPattern = new RegExp(
      /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
    )
    if (!emailPattern.test(fields.email)) {
      isValid = false
      errors.email = 'enter a valid email address...'
    }
    this.setState({ errors })
    return isValid
  }

  submitForm = () => {
    const { fields } = this.state
    const providerResponse = fields
    const { sendProviderResponse } = this.props

    if (this.validateForm()) {
      sendProviderResponse(providerResponse)
      this.setState({
        submitted: true,
        title: 'submitted suggestion form',
        message:
          'a rep will respond to your suggestion soon! here is what you submitted:',
        overlay: true,
      })
      setTimeout(() => {
        this.setState({ overlay: false })
      }, 2200)
    }
  }

  handleFieldChange = (field, e) => {
    const { fields } = this.state
    fields[field] = e.target.value
    this.setState({ fields })
  }

  formMapper(field) {
    const { FormComponent } = field
    const { fields, errors } = this.state
    return (
      <FormComponent
        field={field}
        submitted={false}
        handleFieldChange={this.handleFieldChange}
        key={field.id}
        value={fields[field.name]}
        errorMessage={errors[field.name]}
      />
    )
  }

  render() {
    const { ambiResponse } = this.props
    const { title, message, submitted, overlay } = this.state
    return (
      <div className={styles.root}>
        <div className={styles.title}>{title}</div>
        <div className={styles.subtitle}>{message}</div>
        {form.map(this.formMapper, this)}
        {submitted === false && (
          <div className={styles.formControls}>
            <button
              className={styles.formSubmitButton}
              onClick={this.submitForm}
            >
              Submit
            </button>
          </div>
        )}

        {submitted && (
          <div className={styles.ambiResponse}>
            <div className={styles.ambiResponseTitle}>
              candy store rep response:
            </div>
            <div className={styles.ambiResponseIcons}>
              <img
                width="20"
                height="20"
                src={
                  ambiResponse === Constants.REJECT
                    ? Images.thumbsDownSubmitted
                    : Images.thumbsDown
                }
                alt="reject"
              />
              <img
                width="20"
                height="20"
                src={
                  ambiResponse === Constants.ACCEPT
                    ? Images.thumbsUpSubmitted
                    : Images.thumbsUp
                }
                alt="accept"
              />
            </div>
          </div>
        )}
        <div className={overlay === true ? styles.overlay : styles.displayNone}>
          <div className={styles.overlayContent}>
            <img
              src={Images.checkMark}
              className={styles.checkMark}
              alt="check mark"
            />
            <div className={styles.overlayText}>Form Submitted!</div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  const { ambiResponse } = state.app
  return ambiResponse || {}
}

ProviderForm.propTypes = {
  ambiResponse: PropTypes.string,
  sendProviderResponse: PropTypes.func,
}

ProviderForm.defaultProps = {
  ambiResponse: null,
  sendProviderResponse: undefined,
}

export default connect(
  mapStateToProps,
  actions
)(ProviderForm)
