import React, { Component } from 'react'
import styles from '../css/App/App.css'
import OrderForm from '../forms/OrderForm'
import ResponseForm from '../forms/ResponseForm'

class App extends Component {
  componentWillMount() {}

  render() {
    return (
      <div className={styles.root}>
        <OrderForm />
        <div className={styles.screenDivider} />
        <ResponseForm />
      </div>
    )
  }
}

export default App
