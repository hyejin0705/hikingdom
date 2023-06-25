import React, { useState, useRef, useMemo } from 'react'

import styles from './MeetupAlbum.module.scss'
import { Album } from 'types/club.interface'

import { useInfiniteMeetupAlbumQuery } from 'apis/services/meetup'
import Button from 'components/common/Button'
import ErrorMessage from 'components/common/ErrorMessage'
import Loading from 'components/common/Loading'
import Modal from 'components/common/Modal'
import PhotoModal from 'components/common/PhotoModal'
import AlbumModal from 'components/meetup/AlbumModal'
import useInfiniteVerticalScroll from 'hooks/useInfiniteVerticalScroll'

type MeetupAlbumProps = {
  join: boolean
  meetupId: number
  clubId: number
}

function MeetupAlbum({ join, meetupId, clubId }: MeetupAlbumProps) {
  const [isOpen, setIsOpen] = useState(false) // 선택한 사진 모달 on/off
  const [photo, setPhoto] = useState<Album>() // 선택한 사진
  const [isAlbumOpen, setIsAlbumOpen] = useState(false) // 사진 업데이트 모달
  const infiniteRef = useRef<HTMLDivElement>(null)

  const { isLoading, isError, data, fetchNextPage, hasNextPage } =
    useInfiniteMeetupAlbumQuery(clubId, meetupId)

  const photoInfo = useMemo(() => {
    if (!data) return []
    return data.pages.flatMap((page) => page.content)
  }, [data])

  useInfiniteVerticalScroll({
    ref: infiniteRef,
    loadMore: fetchNextPage,
    isEnd: !hasNextPage,
  })

  // 선택한 사진 모달에 띄우는 함수
  const onClickOpenModal = (photoId: number) => {
    const selectedPhoto = photoInfo?.find((photo) => photo.photoId === photoId)
    if (selectedPhoto) {
      setPhoto(selectedPhoto)
      setIsOpen(true)
    }
  }

  if (isLoading) {
    return <Loading />
  }

  if (isError) {
    return <ErrorMessage />
  }

  return (
    <div className={styles.album}>
      {/* 사진 등록 모달 */}
      {isAlbumOpen && (
        <Modal onClick={() => setIsAlbumOpen(false)}>
          <AlbumModal
            clubId={clubId}
            meetupId={meetupId}
            setIsOpen={() => setIsAlbumOpen(false)}
          />
        </Modal>
      )}
      {/* 사진 상세보기 모달 */}
      {isOpen && (
        <Modal onClick={() => setIsOpen(false)}>
          {photo && <PhotoModal photo={photo} setState={setIsOpen} />}
        </Modal>
      )}
      <div className={styles.titles}>
        <span className={styles.title}>추억</span>
        {join && (
          <Button
            text="추가"
            color="primary"
            size="xs"
            onClick={() => setIsAlbumOpen(true)}
          />
        )}
      </div>
      {photoInfo.length ? (
        <div ref={infiniteRef} className={styles.photos}>
          {photoInfo?.map((photo) => (
            <img
              key={photo.photoId}
              src={photo.imgUrl}
              className={styles.photo}
              onClick={() => onClickOpenModal(photo.photoId)}
            />
          ))}
        </div>
      ) : (
        <div className={styles.blank}>등록된 사진이 없습니다</div>
      )}
    </div>
  )
}

export default MeetupAlbum
