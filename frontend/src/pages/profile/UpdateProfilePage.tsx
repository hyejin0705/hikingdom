import React, { useContext } from 'react'

import styles from './UpdateProfilePage.module.scss'

import { useLogout, useWithdraw } from 'apis/services/users'
import Button from 'components/common/Button'
import PageHeader from 'components/common/PageHeader'
import TextButton from 'components/common/TextButton'
import UpdateNicknameForm from 'components/user/UpdateNicknameForm'
import UpdateProfileImgForm from 'components/user/UpdateProfileImgForm'
import UpdatePwForm from 'components/user/UpdatePwForm'
import { ThemeContext } from 'styles/ThemeProvider'

function UpdateProfilePage() {
  const { theme } = useContext(ThemeContext)

  // 로그아웃
  const { mutate: logout } = useLogout()
  function onClickLogout() {
    logout()
  }

  // 회원 탈퇴
  const { mutate: withdraw } = useWithdraw()
  function onClickWithdraw() {
    withdraw()
  }

  return (
    <div className={`page p-md ${theme} ${styles.profile}`}>
      <PageHeader color="primary" />
      <UpdateProfileImgForm />
      <UpdateNicknameForm />
      <UpdatePwForm />
      <div className={styles.buttons}>
        <Button
          text={'로그아웃'}
          size={'sm'}
          color={'secondary'}
          onClick={onClickLogout}
        />
        <TextButton text="회원탈퇴" color="red" onClick={onClickWithdraw} />
      </div>
    </div>
  )
}

export default UpdateProfilePage
