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
  }

  componentDidMount() {}

  submitForm = () => {
    const { name, company, website, email, specialty, price } = this.state
    const providerResponse = { name, company, website, email, specialty, price }
    this.props.sendProviderResponse(providerResponse)
    this.setState({
      message:
        'a rep will respond to your suggestion soon! here is what you submitted:',
    })
  }

  render() {
    const { ambiResponse } = this.props
    return (
      <div className={styles.root}>
        <div className={styles.title}>suggestion submission form</div>
        <div className={styles.subtitle}>{this.state.message}</div>
        <div className={styles.formItem}>
          <div className={styles.formItemLabel}>name:</div>
          <input
            type="text"
            className={styles.formItemInput}
            placeholder="enter your name..."
            value={this.state.name}
            onChange={e => this.setState({ name: e.target.value })}
          />
        </div>
        <div className={styles.formItem}>
          <div className={styles.formItemLabel}>company:</div>
          <input
            type="text"
            className={styles.formItemInput}
            placeholder="enter your company name..."
            value={this.state.company}
            onChange={e => this.setState({ company: e.target.value })}
          />
        </div>
        <div className={styles.formItem}>
          <div className={styles.formItemLabel}>website:</div>
          <input
            type="text"
            className={styles.formItemInput}
            placeholder="enter your company website..."
            value={this.state.website}
            onChange={e => this.setState({ website: e.target.value })}
          />
        </div>
        <div className={styles.formItem}>
          <div className={styles.formItemLabel}>email address:</div>
          <input
            type="text"
            className={styles.formItemInput}
            placeholder="enter your email address..."
            value={this.state.email}
            onChange={e => this.setState({ email: e.target.value })}
          />
        </div>
        <div className={styles.formItem}>
          <div className={styles.formItemLabel}>
            top candy specialty (enter only one):
          </div>
          <input
            type="text"
            className={styles.formItemInput}
            placeholder="enter a candy name..."
            value={this.state.specialty}
            onChange={e => this.setState({ specialty: e.target.value })}
          />
        </div>
        <div className={styles.formItem}>
          <div className={styles.formItemLabel}>price per unit:</div>
          <input
            type="text"
            className={styles.formItemInput}
            placeholder="enter a suggested price..."
            value={this.state.price}
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
