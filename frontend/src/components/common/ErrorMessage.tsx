import React from 'react'

import styles from './ErrorMessage.module.scss'

const ERROR_MESSAGE = '정보를 불러올 수 없습니다.'

function ErrorMessage() {
  return (
    <div className={styles.container}>
      <p className={styles.message}>{ERROR_MESSAGE}</p>
    </div>
  )
}

export default ErrorMessage
