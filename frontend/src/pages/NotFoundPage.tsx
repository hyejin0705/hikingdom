import React from 'react'

import styles from './NotFoundPage.module.scss'

import { useNavigate } from 'react-router-dom'

import { ReactComponent as Mountain } from 'assets/svgs/background_mountain.svg'
import { ReactComponent as Cloud } from 'assets/svgs/cloud.svg'
import Button from 'components/common/Button'

function NotFoundPage() {
  const navigate = useNavigate()

  const DivCloud = (
    <div>
      <Cloud />
    </div>
  )

  return (
    <div className={`page ${styles.page}`}>
      <Mountain className={styles.mountain} />
      <div className={styles.clouds}>
        {DivCloud}
        {DivCloud}
        {DivCloud}
        {DivCloud}
        {DivCloud}
        {DivCloud}
      </div>
      <div className={styles.content}>
        <h1>404</h1>
        <p>요청하신 페이지를 찾을 수 없습니다</p>
        <Button
          text="메인으로"
          size="md"
          color="secondary"
          onClick={() => navigate('/main')}
        />
      </div>
    </div>
  )
}

export default NotFoundPage
