import React, { useState } from 'react'

import styles from './AlbumList.module.scss'
import { Album } from 'types/club.interface'

import Modal from 'components/common/Modal'
import PhotoModal from 'components/common/PhotoModal'

type AlbumListProps = {
  photoList: Album[]
}

function AlbumList({ photoList }: AlbumListProps) {
  const [isOpen, setIsOpen] = useState(false) // 모달 on/off
  const [photo, setPhoto] = useState<Album | undefined>(undefined) // 선택한 사진

  // 선택한 사진 모달에 띄우는 함수
  const onClickOpenModal = (photoId: number) => {
    const selectedPhoto = photoList.find((photo) => photo.photoId === photoId)

    if (selectedPhoto) {
      setPhoto(selectedPhoto)
      setIsOpen(true)
    }
  }

  return (
    <>
      {isOpen && (
        <Modal onClick={() => setIsOpen(false)}>
          {photo && <PhotoModal photo={photo} setState={setIsOpen} />}
        </Modal>
      )}
      <div className={styles.container}>
        {photoList.map((photo) => (
          <img
            key={photo.photoId}
            src={photo.imgUrl}
            className={styles.img}
            onClick={() => onClickOpenModal(photo.photoId)}
          />
        ))}
      </div>
    </>
  )
}

export default AlbumList
