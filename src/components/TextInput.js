import React from 'react'
import PropTypes from 'prop-types'
import FieldShape from '../shapes/FieldShape'
import styles from '../css/forms/ProviderForm.css'

const TextInput = props => {
  const { field, submitted, handleFieldChange } = props
  return (
    <div className={styles.formItem}>
      <div className={styles.formItemLabel}>{field.label}</div>
      <input
        type="text"
        disabled={submitted === true}
        className={styles.formItemInput}
        placeholder={field.placeholder}
        value={field.value}
        onChange={e => handleFieldChange(field.name, e)}
      />
    </div>
  )
}

TextInput.propTypes = {
  handleFieldChange: PropTypes.func,
  submitted: PropTypes.bool,
  field: PropTypes.shape(FieldShape),
}

TextInput.defaultProps = {
  handleFieldChange: undefined,
  submitted: false,
  field: {},
}

export default TextInput
