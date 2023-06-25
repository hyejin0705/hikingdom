import React, { useContext } from 'react'

import styles from './MeetupIntroduction.module.scss'

import { ThemeContext } from 'styles/ThemeProvider'

type MeetupIntroductionProp = {
  content: string
}

function MeetupIntroduction({ content }: MeetupIntroductionProp) {
  const { theme } = useContext(ThemeContext)

  return (
    <div className={styles.intro}>
      <div className={styles.title}>소개</div>
      <div className={`content ${theme} ${styles.content}`}>{content}</div>
    </div>
  )
}

export default MeetupIntroduction
