import React, { useState, useEffect } from 'react'

import checkReg from 'utils/checkReg'

/*
사용자 인증 input 관련 커스텀 훅.
정규식 통과여부를 판단하는 기능을 가진다.
*/

type AuthInputProps = {
  type: 'email' | 'nickname' | 'password' | 'code' // 인증 타입
  initialValue?: string // 초깃ㄱ밧
}

type AuthInputReturns = {
  value: string // 반환 useState
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void // input의 onChange 따라 value를 업데이트하는 함수
  isPass: boolean // 정규식 통과 여부
  condition: string // 정규식 조건
}

function useAuthInput({
  type,
  initialValue = '',
}: AuthInputProps): AuthInputReturns {
  const [value, setValue] = useState<string>(initialValue) // initilaValue로 useState 생성
  const [isPass, setIsPass] = useState(false) // 정규식 통과 여부
  const [condition, setCondition] = useState('') // 정규식 통과 조건

  // initialValue가 나중에 들어올 경우
  useEffect(() => {
    setValue(initialValue)
  }, [initialValue])

  // input 태그의 onChange에 따라 value를 업데이트 하는 함수
  function onChange(event: React.ChangeEvent<HTMLInputElement>) {
    setValue(event.target.value)
  }

  // type에 따라 정규식 조건 할당
  useEffect(() => {
    const { condition } = checkReg(type, value)
    setCondition(condition)
  }, [type])

  // vlaue 값에 따라 정규식 검사
  useEffect(() => {
    const { result } = checkReg(type, value)
    setIsPass(result)
  }, [value])

  return { value, onChange, isPass, condition }
}

export default useAuthInput
