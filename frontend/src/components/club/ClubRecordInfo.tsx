import React, { useContext } from 'react'


import styles from './ClubRecordInfo.module.scss'



import asset from 'assets/images/asset.png'
import hiking from 'assets/images/hiking.png'
import person from 'assets/images/person.png'
import plan from 'assets/images/plan.png'
import IconText from 'components/common/IconText'
import { ThemeContext } from 'styles/ThemeProvider'

type ClubRecordInfoProps = {
  totalMember: number
  totalMountainCount: number
  totalMeetupCount: number
  totalAssetCount: number
}

function ClubRecordInfo({
  totalMember,
  totalMountainCount,
  totalMeetupCount,
  totalAssetCount,
}: ClubRecordInfoProps) {
  const { theme } = useContext(ThemeContext)

  return (
    <div className={`content ${theme} ${styles.container}`}>
      {/* 참여인원 */}
      <Info
        title="참여 인원"
        content={totalMember}
        imgSrc={person}
        isBorder={true}
      />

      {/* 에셋 수 */}
      <Info
        title="에셋"
        content={totalAssetCount}
        imgSrc={asset}
        isBorder={true}
      />

      {/* 완등 횟수 */}
      <Info
        title="완등한 산"
        content={totalMountainCount}
        imgSrc={hiking}
        isBorder={true}
      />

      {/* 일정 수 */}
      <Info
        title="일정 수"
        content={totalMeetupCount}
        imgSrc={plan}
        isBorder={false}
      />
    </div>
  )
}

type InfoProps = {
  title: string
  content: number
  imgSrc: string
  isBorder: boolean
}

function Info({ title, content, imgSrc, isBorder }: InfoProps) {
  const border = isBorder ? styles.border : ''

  return (
    <div className={`${styles.content} ${border}`}>
      <span className={styles.title}>{title}</span>
      <IconText imgSrc={imgSrc} text={`${content}`} size="sm" isBold={true} />
    </div>
  )
}

export default ClubRecordInfo
