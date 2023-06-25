import React, { useContext, useState } from 'react'

import styles from './UserProfile.module.scss'

import { BiEdit } from 'react-icons/bi'
import { FaMoon, FaSun } from 'react-icons/fa'
import { HiLightBulb } from 'react-icons/hi'
import { useNavigate, useParams } from 'react-router-dom'

import {
  useProfileQuery,
  useReport,
  useUserInfoQuery,
} from 'apis/services/users'
import bell from 'assets/images/bell.png'
import ConfirmModal from 'components/club/ConfirmModal'
import ErrorMessage from 'components/common/ErrorMessage'
import IconButton from 'components/common/IconButton'
import Image from 'components/common/Image'
import Loading from 'components/common/Loading'
import Modal from 'components/common/Modal'
import PageHeader from 'components/common/PageHeader'
import LevelModal from 'components/user/LevelModal'
import UserInfo from 'components/user/UserInfo'
import LEVEL_TO_IMG from 'constants/levels'
import { ThemeContext } from 'styles/ThemeProvider'

export default function UserProfile() {
  const navigate = useNavigate()
  const { theme, toggleTheme } = useContext(ThemeContext)
  const [isLevelModal, setIsLevelModal] = useState(false)
  const [isConfirmModal, setIsConfirmModal] = useState(false)
  const { nickname } = useParams() as { nickname: string }

  // 내 정보
  const {
    data: userInfo,
    isLoading: isUserInfoLoading,
    isError: isUserInfoError,
  } = useUserInfoQuery()

  // 프로필 정보 요청
  const {
    data: profile,
    isLoading: isProfileLoading,
    isError: isProfileError,
  } = useProfileQuery(nickname)

  // 신고하기
  const { mutate: reportUser } = useReport()

  // 다크모드 전환 토글 버튼
  const themeIcon = theme === 'light' ? <FaSun /> : <FaMoon />

  if (isProfileLoading || isUserInfoLoading) {
    return <Loading />
  }

  if (isProfileError || isUserInfoError) {
    return <ErrorMessage />
  }

  // 내 자신이 아니면
  // 로그아웃, 수정, 알람버튼 숨기기 / 신고하기 보이기
  const stranger =
    profile.nickname !== userInfo?.nickname ? styles.stranger : ''

  // 안읽은 알람 표시
  const unread = profile.unreadNotificationCount ? styles.unread : ''

  return (
    <>
      <div className={styles.profile}>
        <div className={`${styles['alarm-siren']}`}>
          <PageHeader color="primary" />
          <div
            className={`${stranger} ${styles.siren}`}
            onClick={() => setIsConfirmModal(true)}
          >
            <HiLightBulb /> 신고하기
          </div>
          <div className={`${stranger} ${styles.alarm} ${unread}`}>
            <IconButton
              size="sm"
              imgSrc={bell}
              onClick={() => navigate('/alarm')}
            />
          </div>
        </div>
        <div className={`content ${theme} ${styles.img}`}>
          <Image size="lg" imgUrl={profile.profileUrl} />
        </div>
        <div className={`content ${theme} ${styles.record}`}>
          <div className={`${stranger} ${styles.btns}`}>
            <IconButton
              icon={themeIcon}
              size="sm"
              color="gray"
              onClick={toggleTheme}
            />
            <IconButton
              icon={<BiEdit />}
              size="sm"
              color="gray"
              onClick={() => navigate('/profile/update')}
            />
          </div>
          <div className={styles.username}>
            {profile.nickname}
            {
              <IconButton
                imgSrc={LEVEL_TO_IMG[profile.level]}
                size={'sm'}
                onClick={() => setIsLevelModal(true)}
              />
            }
          </div>
          <span className={`${stranger} ${styles.email}`}>{profile.email}</span>
          <UserInfo
            totalAlt={profile.totalAlt}
            totalDistance={profile.totalDistance}
            totalDuration={profile.totalDuration}
            totalHikingCount={profile.totalHikingCount}
            totalMountainCount={profile.totalMountainCount}
          />
        </div>
      </div>
      {/* 모달창 */}
      {isLevelModal && (
        <Modal onClick={() => setIsLevelModal(false)}>
          <LevelModal />
        </Modal>
      )}
      {isConfirmModal && (
        <Modal onClick={() => setIsConfirmModal(false)}>
          <ConfirmModal
            title="신고하기"
            content={`'${profile.nickname}'님을 정말 신고하시겠습니까?`}
            buttonText="신고"
            onClickDelete={() => {
              reportUser({ type: 'MEMBER', id: profile.nickname })
              setIsConfirmModal(false)
            }}
            onClickCloseModal={() => setIsConfirmModal(false)}
          />
        </Modal>
      )}
    </>
  )
}
