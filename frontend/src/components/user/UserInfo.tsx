import React, { useContext } from 'react'

import styles from './UserInfo.module.scss'
import { UserRecord } from 'types/user.interface'

import height from 'assets/images/hot_air_balloon.png'
import time from 'assets/images/hourglass.png'
import mountain from 'assets/images/mountain.png'
import distance from 'assets/images/shoe.png'
import { ThemeContext } from 'styles/ThemeProvider'
import { convertMeterToKm } from 'utils/convertMeterToKm'
import { convertMinutesToHHMM } from 'utils/convertMinutesToHHMM'

function UserInfo({
  totalAlt,
  totalDistance,
  totalDuration,
  totalMountainCount,
}: UserRecord) {
  const { theme } = useContext(ThemeContext)

  const mountainInfo = totalMountainCount.toString()
  const distanceInfo = convertMeterToKm(totalDistance).toString()
  const altInfo = convertMeterToKm(totalAlt).toString()

  return (
    <div className={`${theme} ${styles['user-info']}`}>
      <div className={styles['info-box']}>
        <Info imgSrc={mountain} title={'등반한 산'} content={mountainInfo} />
        <Info
          imgSrc={time}
          title={'시간'}
          content={convertMinutesToHHMM(totalDuration)}
        />
      </div>
      <div className={styles['info-box']}>
        <Info imgSrc={distance} title={'거리(km)'} content={distanceInfo} />
        <Info imgSrc={height} title={'높이(km)'} content={altInfo} />
      </div>
    </div>
  )
}

type InfoProps = {
  imgSrc: string
  title: string
  content: string
}

function Info({ imgSrc, title, content }: InfoProps) {
  return (
    <div className={styles.info}>
      <img src={imgSrc} />
      <div className={styles['content-box']}>
        <span className={styles.title}>{title}</span>
        <span className={styles.content}>{content}</span>
      </div>
    </div>
  )
}

export default UserInfo
