import React, { useState } from 'react'

import IconText from './IconText'
import Modal from './Modal'
import styles from './PhotoModal.module.scss'
import { Album } from 'types/club.interface'

import { AiOutlineClockCircle } from 'react-icons/ai'
import { BiCalendarAlt } from 'react-icons/bi'
import { HiTrash, HiLightBulb } from 'react-icons/hi'

import { useDeleteAlbum } from 'apis/services/clubs'
import { report, useUserInfoQuery } from 'apis/services/users'
import ConfirmModal from 'components/club/ConfirmModal'
import Image from 'components/common/Image'
import toast from 'components/common/Toast'

type PhotoModalProps = {
  photo: Album
  setState: (isOpen: boolean) => void
}

function PhotoModal({ photo, setState }: PhotoModalProps) {
  const [isDeleteOpen, setIsDeleteOpen] = useState(false)
  const [isSirenOpen, setIsSirenOpen] = useState(false)
  const { data: userInfo } = useUserInfoQuery()

  const { mutateAsync: deleteAlbum } = useDeleteAlbum(
    Number(userInfo?.clubId),
    photo.photoId
  )

  const onClickDelete = () => {
    deleteAlbum().then(() => setState(false))
  }

  const onClickReport = () => {
    report('ALBUM', photo.photoId)
      .then(() => {
        toast.addMessage('success', '신고가 완료됐습니다')
        setState(false)
      })
      .catch(() => {
        toast.addMessage('error', '이미 신고한 사진입니다')
        setState(false)
      })
  }

  return (
    <>
      {isDeleteOpen && (
        <Modal onClick={() => setIsDeleteOpen(false)}>
          <ConfirmModal
            title="사진을 삭제하시겠습니까?"
            buttonText="사진 삭제"
            onClickDelete={onClickDelete}
            onClickCloseModal={() => setIsDeleteOpen(false)}
          />
        </Modal>
      )}
      {isSirenOpen && (
        <Modal onClick={() => setIsSirenOpen(false)}>
          <ConfirmModal
            title="사진을 신고하시겠습니까?"
            buttonText="사진 신고"
            onClickDelete={onClickReport}
            onClickCloseModal={() => setIsSirenOpen(false)}
          />
        </Modal>
      )}
      <div className={styles.container}>
        <div className={styles.user}>
          <Image size="xs" imgUrl={photo.profileUrl} />
          <span>{photo.nickname}</span>
        </div>
        {photo.isOwner ? (
          <div className={styles.siren} onClick={() => setIsDeleteOpen(true)}>
            <HiTrash /> 삭제하기
          </div>
        ) : (
          <div className={styles.siren} onClick={() => setIsSirenOpen(true)}>
            <HiLightBulb /> 신고하기
          </div>
        )}

        <div className={`${styles.date}`}>
          <IconText
            icon={<BiCalendarAlt className={styles.icon} />}
            text={photo.createdAt.split(' ')[0]}
            size="sm"
          />
          <IconText
            icon={<AiOutlineClockCircle className={styles.icon} />}
            text={photo.createdAt.split(' ')[1]}
            size="sm"
          />
        </div>
        <img src={photo.imgUrl} className={styles.img} />
      </div>
    </>
  )
}

export default PhotoModal
