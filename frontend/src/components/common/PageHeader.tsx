import React from 'react'

import styles from './PageHeader.module.scss'

import { FiChevronLeft } from 'react-icons/fi'
import { useNavigate } from 'react-router-dom'

type PageHeaderProps = {
  title?: string // 제목
  url?: string // 이동할 URL 주소
  color?: 'dark' | 'light' | 'primary' // 색깔
  size?: 'sm' | 'md' | 'lg' // 크기
}

function PageHeader({
  title = ' ',
  url = undefined,
  color = 'dark',
  size = 'md',
}: PageHeaderProps) {
  const navigate = useNavigate()

  function onClickNavigate() {
    if (url) {
      navigate(url)
    } else {
      navigate(-1)
    }
  }

  return (
    <div className={`${styles.container} ${styles[color]}`}>
      <FiChevronLeft onClick={onClickNavigate} className={styles.icon} />
      <div className={`${styles.title} ${styles[size]}`}>{title}</div>
    </div>
  )
}

export default PageHeader
