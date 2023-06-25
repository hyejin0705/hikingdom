import React, { useContext, useState, useRef, useEffect } from 'react'

import styles from './UpdateProfileImgForm.module.scss'

import { TbCameraPlus } from 'react-icons/tb'

import { useUpdateProfileImg, useUserInfoQuery } from 'apis/services/users'
import Button from 'components/common/Button'
import ErrorMessage from 'components/common/ErrorMessage'
import IconButton from 'components/common/IconButton'
import Image from 'components/common/Image'
import Loading from 'components/common/Loading'
import toast from 'components/common/Toast'
import { ThemeContext } from 'styles/ThemeProvider'

function UpdateProfileImgForm() {
  const { theme } = useContext(ThemeContext)
  const [imgUrl, setImgUrl] = useState('')
  const imgRef = useRef<HTMLInputElement>(null)

  // 유저 정보
  const { data: userInfo, isLoading, isError } = useUserInfoQuery()

  // 초기 프로필 이미지 설정
  useEffect(() => {
    if (userInfo) {
      setImgUrl(userInfo.profileUrl)
    }
  }, [userInfo])

  // 선택된 이미지로 프로필 이미지 변경
  const onChange = () => {
    const file = imgRef.current?.files?.[0]
    if (!file) {
      toast.addMessage('error', '선택된 이미지가 없습니다')
      return
    }
    const reader = new FileReader()
    reader.readAsDataURL(file) // 이미지 URL
    reader.onloadend = () => {
      setImgUrl(reader.result as string)
    }
  }

  // 프로필 이미지 변경
  const { mutate: updateImg } = useUpdateProfileImg()

  const onClickUpdate = () => {
    const file = imgRef.current?.files?.[0]
    if (!file) {
      toast.addMessage('error', '선택된 이미지가 없습니다')
      return
    }
    const formData = new FormData()
    formData.append('image', file)
    updateImg({ formData })
  }

  if (isLoading) {
    return <Loading />
  }

  if (isError) {
    return <ErrorMessage />
  }

  return (
    <div className={`content ${theme} ${styles.img}`}>
      <Button
        text="사진 변경"
        color="secondary"
        size="sm"
        onClick={onClickUpdate}
      />
      <Image imgUrl={imgUrl} size="lg" />
      <input
        type="file"
        accept="image/jpg,image/png,image/jpeg"
        onChange={onChange}
        ref={imgRef}
        style={{ display: 'none' }}
      />
      <IconButton
        icon={<TbCameraPlus />}
        size="sm"
        color="gray"
        onClick={() => imgRef.current && imgRef.current.click()}
      />
    </div>
  )
}

export default UpdateProfileImgForm
