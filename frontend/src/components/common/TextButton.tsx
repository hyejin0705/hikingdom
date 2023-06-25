import React from 'react'

import styles from './TextButton.module.scss'

type TextButtonProps = {
  text: string // 버튼 텍스트
  size?: 'sm' | 'md' | 'lg' // 사이즈
  color: 'primary' | 'secondary' | 'tertiary' | 'white' | 'red' | 'gray' // 색깔
  onClick?: (event: React.TouchEvent | React.MouseEvent) => void // 클릭 시 동작할 함수
  disabled?: boolean // 버튼 disabled 여부
}

export default function TextButton({
  text,
  size = 'sm',
  color,
  onClick = () => {},
  disabled = false,
}: TextButtonProps) {
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
