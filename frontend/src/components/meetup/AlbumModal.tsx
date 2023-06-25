import React, { useState, useRef } from 'react'

import styles from './AlbumModal.module.scss'

import { usePostMeetupPhoto } from 'apis/services/meetup'
import Button from 'components/common/Button'
import toast from 'components/common/Toast'

const MAX_FILE_SIZE = 10 * 1024 * 1024 // 10MB 이하 사진만 업로드

type AlbumModalProps = {
  clubId: number
  meetupId: number
  setIsOpen: () => void
}

function AlbumModal({ setIsOpen, clubId, meetupId }: AlbumModalProps) {
  const [files, setFiles] = useState<string[] | undefined>()
  const albumRef = useRef<HTMLInputElement>(null)

  // 선택한 사진 모달에 띄우기
  const onChange = () => {
    const fileList = albumRef.current?.files
    const urlList = []

    if (fileList) {
      for (const file of Array.from(fileList)) {
        const imgUrl = URL.createObjectURL(file)
        urlList.push(imgUrl)
      }
      setFiles(urlList)
    }
  }

  // 사진 업로드하기
  const { mutateAsync: postPhoto } = usePostMeetupPhoto(clubId, meetupId)

  const onClickPostPhoto = () => {
    if (!albumRef.current?.files) return

    const fileList = albumRef.current.files
    const formData = new FormData()

    // 선택한 사진이 없을 때
    if (!fileList.length) {
      toast.addMessage('error', '사진을 선택해주세요')
      return
    }

    // 선택한 사진이 있을 때
    if (fileList.length) {
      for (const file of Array.from(fileList)) {
        // 용량 초과시 return
        if (file.size > MAX_FILE_SIZE) {
          toast.addMessage('error', '사진은 10MB 이하로 올릴 수 있습니다')
          return
        }
        formData.append('photos', file)
      }
    }

    postPhoto({ formData }).then(() => {
      setIsOpen()
    })
  }
  return (
    <div className={styles.modal}>
      {!!files && (
        <div className={styles.files}>
          {files.map((file) => (
            <img key={file} src={file} className={styles.img} />
          ))}
        </div>
      )}
      <div className={styles.btns}>
        <Button
          text="사진 선택"
          color="secondary"
          size="sm"
          onClick={() => albumRef.current && albumRef.current.click()}
        />
        {files && (
          <Button
            text="사진 올리기"
            color="secondary"
            size="sm"
            onClick={onClickPostPhoto}
          />
        )}
      </div>
      <input
        type="file"
        multiple
        accept="image/jpg,image/png,image/jpeg"
        onChange={onChange}
        ref={albumRef}
        style={{ display: 'none' }}
      />
    </div>
  )
}
export default AlbumModal
