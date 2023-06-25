import React from 'react'

import styles from './Button.module.scss'

type ButtonProps = {
  text: string // 버튼 텍스트
  size?: 'xs' | 'sm' | 'md' | 'lg' // 사이즈
  color: 'primary' | 'secondary' | 'white' | 'red' | 'gray' // 색깔
  onClick?: (e: React.TouchEvent | React.MouseEvent) => void // 클릭 시 동작
  disabled?: boolean // disabled 여부
}

export default function Button({
  text,
  size = 'lg',
  color,
  onClick = () => {},
  disabled = false,
}: ButtonProps) {
  return (
    <button
      className={`${styles.button} ${styles[size]} ${styles[color]}`}
      onClick={onClick}
      disabled={disabled}
    >
      {text}
    </button>
  )
}
