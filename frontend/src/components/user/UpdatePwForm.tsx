import React, { useContext } from 'react'

import styles from './UpdatePwForm.module.scss'


import { useUpdatePw } from 'apis/services/users'
import Button from 'components/common/Button'
import LabelInput from 'components/common/LabelInput'
import toast from 'components/common/Toast'
import useAuthInput from 'hooks/useAuthInput'
import useCheckPw from 'hooks/useCheckPw'
import { ThemeContext } from 'styles/ThemeProvider'

function UpdatePwForm() {
  const { theme } = useContext(ThemeContext)

  // 인증관련 커스텀 훅
  const {
    value: password,
    onChange: changePw,
    isPass: isPwPass,
    condition: pwCond,
  } = useAuthInput({ type: 'password' })
  const {
    value: newPassword,
    onChange: changeNewPw,
    isPass: isNewPwPass,
    condition: newPwCond,
  } = useAuthInput({ type: 'password' })
  const {
    value: checkPassword,
    onChange: changeCheckPw,
    isPass: isCheckPwPass,
  } = useCheckPw({ password: newPassword })

  // 비밀번호 변경 요청
  const { mutate: updatePw } = useUpdatePw(password, newPassword, checkPassword)

  const onClickUpdate = () => {
    if (!isNewPwPass) {
      toast.addMessage('error', '비밀번호 형식이 맞지 않습니다')
    }
    if (!isCheckPwPass) {
      toast.addMessage('error', '새비밀번호가 일치하지 않습니다')
      return
    }
    updatePw()
  }

  return (
    <div className={`content ${theme} ${styles.password}`}>
      <LabelInput
        label="현재 비밀번호"
        value={password}
        onChange={changePw}
        isPass={isPwPass}
        placeholder={pwCond}
        type="password"
      />
      <LabelInput
        label="새 비밀번호"
        value={newPassword}
        onChange={changeNewPw}
        isPass={isNewPwPass}
        placeholder={newPwCond}
        type="password"
      />
      <LabelInput
        label="새 비밀번호 확인"
        value={checkPassword}
        onChange={changeCheckPw}
        isPass={isCheckPwPass}
        isError={newPassword !== checkPassword}
        placeholder="새 비밀번호를 확인해주세요"
        type="password"
      />
      <Button
        text="비밀번호 수정"
        color={isPwPass && isNewPwPass && isCheckPwPass ? 'primary' : 'gray'}
        onClick={onClickUpdate}
      />
    </div>
  )
}

export default UpdatePwForm
