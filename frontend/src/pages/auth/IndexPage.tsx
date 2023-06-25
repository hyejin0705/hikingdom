import React from 'react'

import styles from './IndexPage.module.scss'

import { useNavigate } from 'react-router-dom'

import mountainVideo from 'assets/videos/mountain.mp4'
import Button from 'components/common/Button'
import Logo from 'components/common/Logo'

function IndexPage() {
  const navigate = useNavigate()

  return (
    <div className={`page p-lg ${styles.container}`}>
      <video className={styles.video} autoPlay loop muted>
        <source src={mountainVideo} />
      </video>

      <div className={styles.content}>
        <div className={styles.slogan}>
          <Logo size="lg" />
          <div>등산으로 완성하는 우리의 왕국</div>
        </div>
        <Button
          text="시작하기"
          color="primary"
          size="lg"
          onClick={() => navigate('/login')}
        />
      </div>
    </div>
  )
}

export default IndexPage
