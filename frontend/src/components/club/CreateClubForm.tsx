import React, { useEffect, useRef, useState } from 'react'

import styles from './CreateClubForm.module.scss'
import { Option } from 'types/common.interface'

import { useNavigate } from 'react-router-dom'

import {
  useCreateClub,
  useCheckClubNameQuery,
  useSidoCodeQuery,
  useGuGunCodeQuery,
} from 'apis/services/clubs'
import Button from 'components/common/Button'
import ErrorMessage from 'components/common/ErrorMessage'
import Label from 'components/common/Label'
import LabelInput from 'components/common/LabelInput'
import LabelTextArea from 'components/common/LabelTextArea'
import Loading from 'components/common/Loading'
import PageHeader from 'components/common/PageHeader'
import SelectBox from 'components/common/SelectBox'
import toast from 'components/common/Toast'

function CreateClubForm() {
  const navigate = useNavigate()

  const [name, setName] = useState('') // 모임 이름
  const [isNamePass, setIsNamePass] = useState(false) // 모임 이름 중복 체크 여부
  const [description, setDescription] = useState('') // 모임 설명
  const [sidoOptions, setSidoOptions] = useState<Option[]>([]) // 시도 코드 옵션 정보
  const [sidoCode, setSidoCode] = useState('') // 선택된 시도 코드
  const [gugunOptions, setGugunOptions] = useState<Option[]>([]) // 구군 코드 오변 정보
  const [gugunCode, setGugunCode] = useState('') // 선택된 구군 코드

  const sidoRef = useRef<HTMLDivElement>(null)
  const gugunRef = useRef<HTMLDivElement>(null)

  // input태그 변화에 따른 모임이름(name) 업데이트하는 함수
  function onChangeSetName(event: React.ChangeEvent<HTMLInputElement>) {
    setName(event.target.value)
    setIsNamePass(false)
  }

  // 모임 이름 중복 체크 커스텀 훅
  const {
    refetch: checkClubName,
    isFetching: isCheckClubNameFetching,
    isError: isCheckClubNameError,
    isSuccess: isCheckClubNameSuccess,
    error: checkClubNameError,
  } = useCheckClubNameQuery(name)

  console.log(isCheckClubNameFetching)

  // 중복 체크 성공 여부에 따른 결과 처리
  useEffect(() => {
    if (isCheckClubNameSuccess) {
      setIsNamePass(true)
      toast.addMessage('success', '중복확인 되었습니다')
    }
    if (isCheckClubNameError) {
      setIsNamePass(false)
      toast.addMessage('error', checkClubNameError.data.message)
    }
  }, [isCheckClubNameSuccess, isCheckClubNameError])

  // 클릭 시, 모임이름 중복 체크 api 요청
  function onClickCheckName() {
    if (!name.trim()) {
      toast.addMessage('error', '모임 이름을 입력해주세요')
      return
    }
    checkClubName()
  }

  // input태그 변화에 따른 모임설명(description) 업데이트하는 함수
  function onChangeSetDescription(
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) {
    setDescription(event.target.value)
  }

  // 첫 마운트 시, 시도 코드 가져오기
  const {
    isError: isSidoCodeError,
    data: sidoInfo,
    isSuccess: isSidoCodeSuccess,
  } = useSidoCodeQuery()

  // 시도 코드 가져오기 성공 시, 시도 코드 옵션 생성
  useEffect(() => {
    if (isSidoCodeSuccess) {
      const options: Option[] = []
      sidoInfo.forEach(({ dongCode, sidoName = '' }) => {
        options.push({
          value: dongCode,
          label: sidoName,
        })
      })
      setSidoOptions(options)
    }
  }, [sidoInfo])

  // 시도 코드 선택 시, 구군 코드 가져오기
  const {
    isError: isGuGunCodeError,
    data: gugunInfo,
    isSuccess: isGuGunCodeSuccess,
  } = useGuGunCodeQuery(sidoCode)

  // 구군 코드 가져오기 성공 시, 구군 코드 옵션 생성
  useEffect(() => {
    if (isGuGunCodeSuccess) {
      const options: Option[] = []
      gugunInfo.forEach(({ dongCode, gugunName = '' }) => {
        options.push({
          value: dongCode,
          label: gugunName,
        })
      })
      setGugunOptions(options)
    }
  }, [gugunInfo])

  // 클럽 생성 커스텀 훅
  const { mutate: createClub } = useCreateClub(name, description, gugunCode)

  // 클릭 시, 모임 생성 요청 보내기
  function onClickCreateClub() {
    if (!isNamePass || !description.trim() || !gugunCode) {
      toast.addMessage('error', '입력 정보를 확인해주세요')
      return
    }
    createClub()
  }

  if (isSidoCodeError || isGuGunCodeError) {
    return <ErrorMessage />
  }

  return (
    <>
      <div className={styles.container}>
        <PageHeader title="모임생성" url="/club/none" color="primary" />
        <div className={styles.flexbox}>
          <LabelInput
            label="모임이름"
            value={name}
            isPass={isNamePass}
            onChange={onChangeSetName}
          />
          <Button
            text="중복"
            color={name.trim() ? 'primary' : 'gray'}
            size="md"
            onClick={onClickCheckName}
          />
        </div>
        <LabelTextArea
          label="소개문구"
          value={description}
          onKeyDown={(event: React.KeyboardEvent) => {
            if (event.key === 'Enter') {
              event?.preventDefault()
              sidoRef.current && sidoRef.current.focus()
            }
          }}
          onChange={onChangeSetDescription}
          isPass={description.trim() ? true : false}
        />
        <div className={styles.location}>
          <Label label="지역선택" />
          <div className={styles.dropdown}>
            <SelectBox
              ref={sidoRef}
              options={sidoOptions}
              defaultLabel="시/도 선택"
              setValue={setSidoCode}
            />
            <SelectBox
              ref={gugunRef}
              options={gugunOptions}
              defaultLabel="구/군 선택"
              setValue={setGugunCode}
            />
          </div>
        </div>
        <div className={styles.buttons}>
          <Button
            text="생성하기"
            color={
              !isNamePass || !description.trim() || !gugunCode
                ? 'gray'
                : 'primary'
            }
            onClick={onClickCreateClub}
          />
          <Button
            text="취소"
            color="white"
            onClick={() => navigate('/club/none')}
          />
        </div>
      </div>
      {/* 모임 이름 중복 체크 시, 로딩 화면 */}
      {isCheckClubNameFetching && (
        <div className={styles.loading}>
          <Loading />
        </div>
      )}
    </>
  )
}

export default CreateClubForm
