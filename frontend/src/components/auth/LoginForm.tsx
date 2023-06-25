import React, { useRef, useContext } from 'react'

import sytles from './LoginForm.module.scss'

import { useNavigate } from 'react-router-dom'

import { useLogin } from 'apis/services/users'
import Button from 'components/common/Button'
import LabelInput from 'components/common/LabelInput'
import TextButton from 'components/common/TextButton'
import toast from 'components/common/Toast'
import useAuthInput from 'hooks/useAuthInput'
import { ThemeContext } from 'styles/ThemeProvider'

function LoginForm() {
  const { theme } = useContext(ThemeContext)
  const navigate = useNavigate()
  const emailRef = useRef<HTMLInputElement>(null)
  const passwordRef = useRef<HTMLInputElement>(null)
  const {
    value: email,
    onChange: changeEmail,
    isPass: isEmailPass,
  } = useAuthInput({ type: 'email' }) // 사용자 인증 input 커스텀 훅
  const {
    value: password,
    onChange: changePw,
    isPass: isPwPass,
    condition: condition,
  } = useAuthInput({ type: 'password' }) // 사용자 인증 input 커스텀 훅

  const { mutate: login } = useLogin(email, password)

  // 로그인 api 요청
  function onClickLogin() {
    // 이메일 형식이 맞고, 비밀번호가 입력된 경우에만 요청을 보냄
    if (!isEmailPass || !password) {
      toast.addMessage('error', `이메일과 비밀번호를 정확하게 입력해주세요`)
      return
    }
    login()
  }

  return (
    <div className={sytles.container}>
      <form className={sytles.inputs}>
        <LabelInput
          inputRef={emailRef}
          label="이메일"
          value={email}
          onChange={changeEmail}
          onKeyDown={(event: React.KeyboardEvent) => {
            if (event.key === 'Enter') {
              event?.preventDefault()
              passwordRef.current && passwordRef.current.focus()
            }
          }}
          isPass={isEmailPass}
          placeholder="이메일을 입력해주세요"
          autoComplete="email"
        />
        <LabelInput
          inputRef={passwordRef}
          label="비밀번호"
          value={password}
          onChange={changePw}
          onKeyDown={(event: React.KeyboardEvent) => {
            if (event.key === 'Enter') {
              event?.preventDefault()
              onClickLogin()
            }
          }}
          isPass={isPwPass}
          placeholder={condition}
          type="password"
        />
        <TextButton
          text="비밀번호 찾기"
          color={theme === 'light' ? 'tertiary' : 'white'}
          onClick={(event) => {
            event.preventDefault()
            navigate('/password')
          }}
        />
      </form>
      <div className={sytles.buttons}>
        <Button
          text="로그인"
          color="primary"
          size="lg"
          onClick={onClickLogin}
        />
        <Button
          text="회원가입"
          color="white"
          size="lg"
          onClick={() => navigate('/agreement')}
        />
      </div>
    </div>
  )
}

export default LoginForm
