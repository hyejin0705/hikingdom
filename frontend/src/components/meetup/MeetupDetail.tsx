import React from 'react'

import styles from './MeetupDetail.module.scss'

import calendar from 'assets/images/calendar.png'
import clock from 'assets/images/clock.png'
import mount from 'assets/images/mountain.png'
import IconText from 'components/common/IconText'

type MeetupDetailProps = {
  mountain: string
  date: string
  time: string
}

function MeetupDetail({ mountain, date, time }: MeetupDetailProps) {
  return (
    <div className={styles.detail}>
      <IconText imgSrc={mount} text={mountain} size="md" isBold={true} />
      <IconText imgSrc={calendar} text={date} size="md" isBold={true} />
      <IconText imgSrc={clock} text={time} size="md" isBold={true} />
    </div>
  )
}

export default MeetupDetail
