import React, { useContext } from 'react'

import styles from './AlarmItem.module.scss'
import { Alarm } from 'types/user.interface'

import { GoPrimitiveDot } from 'react-icons/go'
import { useNavigate } from 'react-router'

import { useUserInfoQuery } from 'apis/services/users'
import Toast from 'components/common/Toast'
import { ThemeContext } from 'styles/ThemeProvider'

function AlarmItem({ alarm }: { alarm: Alarm }) {
  const { theme } = useContext(ThemeContext)
  const navigate = useNavigate()

  // clubId 확인
  const { data: userInfo } = useUserInfoQuery()

  // read, unread 구분
  const alarmStyle = alarm.isRead ? styles.read : styles.unread

  // 시간
  const date = alarm.sendAt.split(' ')[0].replaceAll('-', '.')
  const time = alarm.sendAt.split(' ')[1]
  const notiTime = `${date.slice(2, date.length)} ${time.slice(
    -5,
    time.length
  )}`

  const onClick = () => {
    if (userInfo?.clubId === alarm.clubId) {
      alarm.category === 'NEW_ASSET'
        ? navigate('/club/main')
        : navigate(`/club/${alarm.clubId}/meetup/${alarm.meetupId}/detail`)
    } else {
      Toast.addMessage('error', '탈퇴한 클럽의 일정입니다.')
    }
  }

  return (
    <div
      className={`content ${theme} ${styles.alarm} ${alarmStyle}`}
      onClick={onClick}
    >
      <div className={`${styles['alarm-title-box']}`}>
        <div className={`${styles.title} ${alarmStyle}`}>
          <GoPrimitiveDot className={styles.dot} />
          <span>{alarm.title}</span>
        </div>
        <div className={styles.time}>{notiTime}</div>
      </div>
      <div className={`${styles.content}`}>{alarm.body}</div>
    </div>
  )
}

export default AlarmItem
