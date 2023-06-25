import React, { useContext } from 'react'

import styles from './CreateMeetupPage.module.scss'

import CreateMeetupForm from 'components/club/CreateMeetupForm'
import PageHeader from 'components/common/PageHeader'
import { ThemeContext } from 'styles/ThemeProvider'

function CreateMeetupPage() {
  const { theme } = useContext(ThemeContext)
  return (
    <div className={`page p-lg ${theme} ${styles.container}`}>
      <PageHeader title="일정 만들기" url={`/club/meetup`} color="primary" />
      <CreateMeetupForm />
    </div>
  )
}

export default CreateMeetupPage
