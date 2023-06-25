import React, { useContext, useState } from 'react'

import styles from './ClubNoneExistPage.module.scss'

import { useNavigate } from 'react-router-dom'

import mountain from 'assets/images/mountain.png'
import WaitingListModal from 'components/club/WaitingListModal'
import Button from 'components/common/Button'
import Modal from 'components/common/Modal'
import { ThemeContext } from 'styles/ThemeProvider'


function ClubNoneExistPage() {
  const { theme } = useContext(ThemeContext)
  const navigate = useNavigate()

  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      {isOpen && (
        <Modal onClick={() => setIsOpen(false)}>
          <WaitingListModal />
        </Modal>
      )}
      <div className={`page ${theme} p-md ${styles.page}`}>
        <div className={styles.content}>
          <img src={mountain} className={styles.image} />
          <span className={styles.text}>
            킹덤에 가입하고 <br />
            나만의 킹덤을 꾸려보세요
          </span>
        </div>
        <div className={styles.button}>
          <Button
            text="가입 대기 목록"
            size="lg"
            color="secondary"
            onClick={() => setIsOpen(true)}
          />
          <Button
            text="모임 생성"
            size="lg"
            color="primary"
            onClick={() => navigate('/club/create')}
          />
          <Button
            text="모임 검색"
            size="lg"
            color="secondary"
            onClick={() => navigate('/club/search')}
          />
        </div>
      </div>
    </>
  )
}

export default ClubNoneExistPage
