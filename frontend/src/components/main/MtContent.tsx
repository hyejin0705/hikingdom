import React from 'react'

import styles from './MtContent.module.scss'

import addressImg from 'assets/images/marker.png'
import descriptionImg from 'assets/images/message.png'
import peaksImg from 'assets/images/mountain.png'
import IconText from 'components/common/IconText'

type MtContentProps = {
  address: string
  peaks: string
  description: string
}

function MtContent({ address, peaks, description }: MtContentProps) {
  return (
    <div className={`${styles.mtcontent}`}>
      <Info imgSrc={addressImg} title="주소" content={address} />
      <Info imgSrc={peaksImg} title="봉우리" content={peaks} />
      {/* <Info imgSrc={transportImg} title="주변 교통" content={transportInfo} /> */}
      <div className={styles.description}>
        <IconText imgSrc={descriptionImg} text="설명" size="sm" isBold={true} />
        <span className={styles.text}>{description}</span>
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
    <div className={styles.content}>
      <IconText imgSrc={imgSrc} text={title} size="sm" isBold={true} />
      <span className={styles.text}>{content}</span>
    </div>
  )
}

export default MtContent
