import React from 'react'

import styles from './IconButton.module.scss'

type IconButtonProps = {
  imgSrc?: string // 이미지 소스
  icon?: React.ReactNode // svg 아이콘 노드
  onClick: () => void // 클릭 시 동작하는 함수
  color?: 'dark' | 'light' | 'primary' | 'secondary' | 'gray' // 색깔
  size?: 'sm' | 'md' | 'lg' // 크기
}

function IconButton({
  imgSrc,
  icon,
  onClick,
  color = 'dark',
  size = 'sm',
}: IconButtonProps) {
  return (
    <div
      className={`${styles.btn} ${styles[size]} ${styles[color]} ${styles[size]}`}
      onClick={onClick}
    >
      {imgSrc && <img src={imgSrc} />}
      {icon}
    </div>
  )
}

export default IconButton
