import React from 'react'
import styles from './PageHeader.module.scss'
import { useNavigate } from 'react-router-dom'
import { FiChevronLeft } from 'react-icons/fi'

type PageHeaderProps = {
  title: string // 제목
  url: string // 이동할 URL 주소
  color?: 'dark' | 'light' | 'primary' // 색깔
  size?: 'sm' | 'md' | 'lg' // 크기
}

function PageHeader({
  title,
  url,
  color = 'dark',
  size = 'md',
}: PageHeaderProps) {
  const navigate = useNavigate()

  return (
    <div className={`${styles.container} ${styles[color]}`}>
      <FiChevronLeft onClick={() => navigate(url)} className={styles.icon} />
      <div className={`${styles.title} ${styles[size]}`}>{title}</div>
    </div>
  )
}

export default PageHeader
