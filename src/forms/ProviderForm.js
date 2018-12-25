import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import 'bootstrap/dist/css/bootstrap.min.css'
import * as actions from '../actions'
import styles from '../css/forms/ProviderForm.css'

class ProviderForm extends Component {
  state = {
    name: '',
    company: '',
    website: '',
    email: '',
    specialty: '',
    price: '',
    message: 'enter your suggestion details:',
    errors: {},
  }

  componentDidMount() {}

  validateForm = () => {
    this.setState({
      errors: {},
    })

    const { email, website } = this.state

    const errors = {}
    let isValid = true

    const pattern = new RegExp(
      /(^|\s)((https?:\/\/)?[\w-]+(\.[\w-]+)+\.?(:\d+)?(\/\S*)?)/gi
    )
    if (!pattern.test(website)) {
      isValid = false
      errors.website = 'enter a valid website url...'
    }

    const pattern2 = new RegExp(
      /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
    )
    if (!pattern2.test(email)) {
      isValid = false
      errors.email = 'enter a valid email address...'
    }
    this.setState({ errors })
    return isValid
  }

  submitForm = () => {
    const { name, company, website, email, specialty, price } = this.state
    const providerResponse = { name, company, website, email, specialty, price }

    if (this.validateForm()) {
      this.props.sendProviderResponse(providerResponse)
      this.setState({
        message:
          'a rep will respond to your suggestion soon! here is what you submitted:',
      })
    }
  }

  render() {
    const { ambiResponse } = this.props
    const {
      message,
      name,
      company,
      website,
      email,
      specialty,
      price,
      errors,
    } = this.state
    return (
      <div className={styles.root}>
        <div className={styles.title}>suggestion submission form</div>
        <div className={styles.subtitle}>{message}</div>
        <div className={styles.formItem}>
          <div className={styles.formItemLabel}>name:</div>
          <input
            type="text"
            className={styles.formItemInput}
            placeholder="enter your name..."
            value={name}
            onChange={e => this.setState({ name: e.target.value })}
          />
        </div>
        <div className={styles.formItem}>
          <div className={styles.formItemLabel}>company:</div>
          <input
            type="text"
            className={styles.formItemInput}
            placeholder="enter your company name..."
            value={company}
            onChange={e => this.setState({ company: e.target.value })}
          />
        </div>
        <div className={styles.formItem}>
          <div className={styles.formItemLabel}>website:</div>
          <input
            type="text"
            className={styles.formItemInput}
            placeholder="enter your company website..."
            value={website}
            onChange={e => this.setState({ website: e.target.value })}
          />
          <div className={styles.errorMessage}>{errors.website}</div>
        </div>
        <div className={styles.formItem}>
          <div className={styles.formItemLabel}>email address:</div>
          <input
            type="text"
            className={styles.formItemInput}
            placeholder="enter your email address..."
            value={email}
            onChange={e => this.setState({ email: e.target.value })}
          />
          <div className={styles.errorMessage}>{errors.email}</div>
        </div>
        <div className={styles.formItem}>
          <div className={styles.formItemLabel}>
            top candy specialty (enter only one):
          </div>
          <input
            type="text"
            className={styles.formItemInput}
            placeholder="enter a candy name..."
            value={specialty}
            onChange={e => this.setState({ specialty: e.target.value })}
          />
        </div>
        <div className={styles.formItem}>
          <div className={styles.formItemLabel}>price per unit:</div>
          <input
            type="text"
            className={styles.formItemInput}
            placeholder="enter a suggested price..."
            value={price}
            onChange={e => this.setState({ price: e.target.value })}
          />
        </div>
        {ambiResponse === null && (
          <div className={styles.formControls}>
            <button
              className={styles.formSubmitButton}
              onClick={this.submitForm}
            >
              Submit
            </button>
          </div>
        )}

        {ambiResponse && (
          <div className={styles.ambiResponse}>
            <div className={styles.ambiResponseTitle}>
              candy store rep response:
            </div>
            <div className={styles.ambiResponseIcons}>
              <div
                className={ambiResponse === 'reject' ? styles.iconSelected : ''}
              >
                Reject
              </div>
              <div
                className={ambiResponse === 'accept' ? styles.iconSelected : ''}
              >
                Accept
              </div>
            </div>
          </div>
        )}
      </div>
    )
  }
}

const mapStateToProps = state => {
  const { ambiResponse } = state.app
  console.log('mapStateToProps() - ambiResponse: ', ambiResponse)
  return ambiResponse || {}
}

ProviderForm.propTypes = {
  ambiResponse: PropTypes.string,
}

ProviderForm.defaultProps = {
  ambiResponse: null,
}

export default connect(
  mapStateToProps,
  actions
)(ProviderForm)
