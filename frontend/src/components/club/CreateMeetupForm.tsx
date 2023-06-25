import React, { useState, useMemo, useEffect } from 'react'

import styles from './CreateMeetupForm.module.scss'
import { Option } from 'types/common.interface'
import { MtInfo } from 'types/mt.interface'

import { useParams } from 'react-router-dom'

import { useCreateMeetup } from 'apis/services/clubs'
import { useInfiniteMountainsQuery } from 'apis/services/mountains'
import Button from 'components/common/Button'
import LabelInput from 'components/common/LabelInput'
import LabelInputSelect from 'components/common/LabelInputSelect'
import LabelTextArea from 'components/common/LabelTextArea'
import toast from 'components/common/Toast'
import useDebounce from 'hooks/useDebounce'
import useRedirect from 'hooks/useRedirect'

function CreateMeetupForm() {
  const { clubId } = useParams() as {
    clubId: string
  }

  const [parsedClubId] = useRedirect(clubId)

  const [name, setName] = useState('') // 모임 이름
  const [query, setQuery] = useState('') // 검색하는 산의 이름
  const [mountainId, setMountainId] = useState('') // 선택된 산의 id
  const [date, setDate] = useState('') // 모임 날짜
  const [time, setTime] = useState('') // 모임 시간
  const [description, setDescription] = useState('') // 모임 소개

  // input태그 변화에 따른 일정이름(name) 업데이트하는 함수
  function onChangeSetName(event: React.ChangeEvent<HTMLInputElement>) {
    setName(event.target.value)
  }

  // input태그 변화에 따른 산 조회 쿼리(query) 업데이트하는 함수
  function onChangeSetMountain(event: React.ChangeEvent<HTMLInputElement>) {
    setQuery(event.target.value)
  }

  // useDebounce 훅으로 지연된 query(검색하려는 산의 이름) 반환
  const debouncedQuery = useDebounce(query)

  // query를 바탕으로 산 목록을 조회하는 리액트 쿼리 커스텀 훅
  const { refetch: getMountains, data: mountainList } =
    useInfiniteMountainsQuery(debouncedQuery)

  // debouncedQuery에 따라 산 목록을 조회
  useEffect(() => {
    getMountains()
  }, [debouncedQuery])

  // 조회된 산 목록을 SelectBox의 prop 형태로 가공
  const mountainOptions = useMemo(() => {
    if (!mountainList) return []
    const options: Option[] = []
    mountainList.pages.flatMap((page) => {
      page.content.forEach((mountain: MtInfo) => {
        options.push({
          value: String(mountain.mountainId),
          label: mountain.name,
        })
      })
    })
    return options
  }, [mountainList])

  // input태그 변화에 따른 일정날짜(date) 업데이트하는 함수
  function onChangeSetDate(event: React.ChangeEvent<HTMLInputElement>) {
    setDate(event.target.value)
  }

  // input태그 변화에 따른 일정시각(time) 업데이트하는 함수
  function onChangeSetTime(event: React.ChangeEvent<HTMLInputElement>) {
    setTime(event.target.value)
  }

  // input태그 변화에 따른 일정소개(description) 업데이트하는 함수
  function onChangeSetDescription(
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) {
    setDescription(event.target.value)
  }

  // 모임을 생성하는 리액트 쿼리 커스텀 훅
  const { mutate: createMeetup } = useCreateMeetup(parsedClubId)

  // 클릭 시, 모임을 생성하는 리액트 쿼리 실행
  function onClickCreateMeetup() {
    // 값이 유효하지 않을 경우, 에러 메시지 출력
    if (!name.trim() || !mountainId || !date || !time || !description.trim()) {
      toast.addMessage('error', '모든 항목을 정확하게 기입해주세요')
      return
    }

    // 모임 시작 시간이 현재 시간보다 과거일 경우, 에러 메시지 출력
    const [year, month, day] = date
      .split('-')
      .map((string: string) => parseInt(string))

    const [hours, minutes] = time
      .split(':')
      .map((string: string) => parseInt(string))

    if (new Date(year, month - 1, day, hours, minutes) < new Date()) {
      toast.addMessage('error', '과거 시간에는 일정을 생성할 수 없습니다')
      return
    }

    // 인자와 함께 mutate함수 실행
    const startAt = date + ' ' + time
    createMeetup({ name, mountainId, startAt, description })
  }

  return (
    <div className={styles.container}>
      <LabelInput label="일정 이름" value={name} onChange={onChangeSetName} />
      <LabelInputSelect
        label="산 선택"
        placeholder="산을 검색해주세요"
        value={query}
        onChange={onChangeSetMountain}
        options={mountainOptions}
        setInputValue={setQuery}
        setOption={setMountainId}
      />
      <LabelInput
        label="일정 날짜"
        value={date}
        type="date"
        onChange={onChangeSetDate}
      />
      <LabelInput
        label="일정 시각"
        value={time}
        type="time"
        onChange={onChangeSetTime}
      />
      <LabelTextArea
        label="일정 소개"
        value={description}
        onChange={onChangeSetDescription}
      />
      <Button
        text="일정 등록"
        color={
          !name.trim() || !mountainId || !date || !time || !description.trim()
            ? 'gray'
            : 'primary'
        }
        onClick={onClickCreateMeetup}
      />
    </div>
  )
}

export default CreateMeetupForm
