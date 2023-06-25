import React from 'react'

import styles from './IconText.module.scss'

type IconTextProps = {
  imgSrc?: string // 이미지 소스
  icon?: React.ReactNode // svg 아이콘 노드
  text: string // 텍스트
  size?: 'xs' | 'sm' | 'md' | 'lg' // 사이즈
  isBold?: boolean // font-weight : bold 여부
  isRight?: boolean // 아이콘 위치 텍스트의 오른쪽에 위치 여부
}

function IconText({
  imgSrc,
  icon,
  text,
  size = 'sm',
  isBold = false,
  isRight = false,
}: IconTextProps) {
  const textStyle = isBold ? styles.bold : ''
  const flexStyle = isRight ? styles['right'] : ''

  return (
    <div
      className={`${styles.container} ${styles[size]} ${textStyle} ${flexStyle}`}
    >
      {imgSrc && <img src={imgSrc} />}
      {icon}
      {text}
    </div>
  )
}

export default IconText
