import React from 'react'
import PropTypes from 'prop-types'
import FieldShape from '../shapes/FieldShape'
import styles from '../css/forms/ProviderForm.css'

const FormTextInput = props => {
  const { field, submitted, handleFieldChange, value, errorMessage } = props
  return (
    <div className={styles.formItemWithMessage}>
      <div className={styles.formItemLabel}>{field.label}</div>
      <input
        type="text"
        disabled={submitted === true}
        className={styles.formItemInput}
        placeholder={field.placeholder}
        value={value}
        onChange={e => handleFieldChange(field.name, e)}
      />
      <div className={styles.errorMessage}>{errorMessage}</div>
    </div>
  )
}

FormTextInput.propTypes = {
  handleFieldChange: PropTypes.func,
  submitted: PropTypes.bool,
  value: PropTypes.string,
  errorMessage: PropTypes.string,
  field: PropTypes.shape(FieldShape),
}

FormTextInput.defaultProps = {
  handleFieldChange: undefined,
  submitted: false,
  value: '',
  errorMessage: '',
  field: {},
}

export default FormTextInput
