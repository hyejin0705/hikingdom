import React, { useContext } from 'react'

import styles from './AgreePage.module.scss'

import AgreeForm from 'components/auth/AgreeForm'
import PageHeader from 'components/common/PageHeader'
import { ThemeContext } from 'styles/ThemeProvider'

function AgreePage() {
  const { theme } = useContext(ThemeContext)
  return (
    <div className={`page ${theme} p-lg ${styles.container}`}>
      <PageHeader title="약관동의" url="/login" color="primary" />
      <AgreeForm />
    </div>
  )
}

export default AgreePage
