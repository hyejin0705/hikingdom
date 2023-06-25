import React, { useContext } from 'react'

import styles from './SignupPage.module.scss'

import SignupForm from 'components/auth/SignupForm'
import PageHeader from 'components/common/PageHeader'
import { ThemeContext } from 'styles/ThemeProvider'

function SignupPage() {
  const { theme } = useContext(ThemeContext)

  return (
    <div className={`page-gradation p-lg ${theme} ${styles.container}`}>
      <PageHeader title="회원가입" url="/login" color="primary" />
      <SignupForm />
    </div>
  )
}

export default SignupPage
