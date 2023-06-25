import React from 'react'

import styles from './Logo.module.scss'

import logoPng from 'assets/images/logo.png'

type LogoProps = {
  size?: 'sm' | 'md' | 'lg' // 로고 크기
}

function Logo({ size = 'md' }: LogoProps) {
  return (
    <img
      src={logoPng}
      alt="hikingdom"
      className={`${styles.logo} ${styles[size]}`}
    />
  )
}

export default Logo
