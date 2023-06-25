import React, { useContext } from 'react'

import styles from './Label.module.scss'

import { ThemeContext } from 'styles/ThemeProvider'

type LabelProps = {
  label: string // 라벨 텍스트
}

function Label({ label }: LabelProps) {
  const { theme } = useContext(ThemeContext)

  return (
    <label
      className={`${styles.label} ${theme}`}
      htmlFor={`label-input-${label}`}
    >
      {label}
    </label>
  )
}

export default Label
