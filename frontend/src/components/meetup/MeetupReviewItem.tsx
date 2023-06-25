import React, { useContext, useState } from 'react'

import styles from './MeetupReviewItem.module.scss'
import { MeetupReview } from 'types/meetup.interface'

import { useMutation } from '@tanstack/react-query'
import { HiTrash, HiLightBulb } from 'react-icons/hi'

import { useDeleteReview } from 'apis/services/meetup'
import { report, useUserInfoQuery } from 'apis/services/users'
import ConfirmModal from 'components/club/ConfirmModal'
import ErrorMessage from 'components/common/ErrorMessage'
import Image from 'components/common/Image'
import Loading from 'components/common/Loading'
import Modal from 'components/common/Modal'
import toast from 'components/common/Toast'
import { ThemeContext } from 'styles/ThemeProvider'

type ReviewProps = {
  review: MeetupReview
  clubId: number
  meetupId: number
}

function MeetupReviewItem({ review, clubId, meetupId }: ReviewProps) {
  const { theme } = useContext(ThemeContext)
  const { data: userInfo } = useUserInfoQuery()
  const [isDeleteOpen, setIsDeleteOpen] = useState(false)
  const [isSirenOpen, setIsSirenOpen] = useState(false)

  // 후기 삭제
  const {
    isLoading: isDeleteReviewLoading,
    isError: isDeleteReviewError,
    mutateAsync: deleteReview,
  } = useDeleteReview(clubId, meetupId, review.reviewId)
  const onClickDeleteReview = () => {
    deleteReview().then(() => setIsDeleteOpen(false))
  }

  const onclickReport = useMutation(() => report('REVIEW', review.reviewId), {
    onSuccess: () => {
      toast.addMessage('success', '신고가 완료되었습니다')
      setIsSirenOpen(false)
    },
    onError: () => {
      toast.addMessage('error', '이미 신고되었습니다')
      setIsSirenOpen(false)
    },
  })

  if (isDeleteReviewLoading) {
    return <Loading />
  }

  if (isDeleteReviewError) {
    return <ErrorMessage />
  }

  return (
    <>
      {isDeleteOpen && (
        <Modal onClick={() => setIsDeleteOpen(false)}>
          <ConfirmModal
            title="후기를 삭제하시겠습니까?"
            buttonText="후기 삭제"
            onClickDelete={onClickDeleteReview}
            onClickCloseModal={() => setIsDeleteOpen(false)}
          />
        </Modal>
      )}
      {isSirenOpen && (
        <Modal onClick={() => setIsSirenOpen(false)}>
          <ConfirmModal
            title="후기를 신고하시겠습니까?"
            buttonText="후기 신고"
            onClickDelete={() => onclickReport.mutate()}
            onClickCloseModal={() => setIsSirenOpen(false)}
          />
        </Modal>
      )}
      <div className={`${styles[theme]} ${styles.review}`}>
        <Image size="sm" imgUrl={review.profileUrl} isSquare={true} />

        <div className={styles.content}>
          <div className={styles.line}>
            <span className={styles.nickname}>{review.nickname}</span>

            <div className={styles.btns}>
              {userInfo && userInfo.memberId === review.memberId ? (
                <div
                  className={`${styles.siren} ${styles.gray}`}
                  onClick={() => setIsDeleteOpen(true)}
                >
                  <HiTrash />
                </div>
              ) : (
                <div
                  className={`${styles.siren} ${styles.red}`}
                  onClick={() => setIsSirenOpen(true)}
                >
                  <HiLightBulb /> 신고하기
                </div>
              )}
            </div>
          </div>
          <div>{review.content}</div>
        </div>
      </div>
    </>
  )
}

export default MeetupReviewItem
