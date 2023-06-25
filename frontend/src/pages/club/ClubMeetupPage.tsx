import React, { useState, useEffect, useCallback } from 'react'

import styles from './ClubMeetupPage.module.scss'

import { format } from 'date-fns'
import { useParams } from 'react-router-dom'

import { useDateMeetupsQuery, useMonthMeetupsQuery } from 'apis/services/clubs'
import Calendar from 'components/club/Calendar'
import MeetupList from 'components/club/MeetupList'
import ErrorMessage from 'components/common/ErrorMessage'
import Loading from 'components/common/Loading'
import useRedirect from 'hooks/useRedirect'

function ClubMeetupPage() {
  // 클럽 아이디 url로 부터 조회
  const { clubId } = useParams() as {
    clubId: string
  }
  const [parsedClubId] = useRedirect(clubId) // 클럽 아이디가 양의 정수가 아닐 경우, redirect

  const [month, setMonth] = useState(format(new Date(), 'yyyy-MM')) // 현재 월
  const [date, setDate] = useState(format(new Date(), 'yyyy-MM-dd')) // 현재 일

  // 월별 일정 조회하는 리액트 쿼리 커스텀 훅
  const {
    data: monthMeetups,
    refetch: getMonthMeetups,
    isLoading: monthLoading,
    isError: monthError,
  } = useMonthMeetupsQuery(parsedClubId, month)

  // 달력의 월이 바뀔 때마다 현재 월(month)을 업데이트
  const onChangeGetMonthMeetups = useCallback((month: string) => {
    setMonth(month)
  }, [])

  // 현재 월(month) 변화 시 월별 일정 조회 refetch 동작
  useEffect(() => {
    getMonthMeetups()
  }, [month])

  // 일별 일정 조회하는 리액트 쿼리 커스텀 훅
  const {
    data: dateMeetups,
    refetch: getDateMeetups,
    isLoading: dateLoading,
    isError: dateError,
  } = useDateMeetupsQuery(parsedClubId, date)

  //  달력의 일이 바뀔 때마다 현재 일(date)을 업데이트
  const onClickGetDateMeetups = useCallback((date: string) => {
    setDate(date)
  }, [])

  // 현재 일(date) 변화시 일별 일정 조회 refetch 동작
  useEffect(() => {
    getDateMeetups()
  }, [date])

  if (monthLoading || dateLoading) return <Loading />

  if (monthError || dateError) return <ErrorMessage />

  return (
    <div className={`page p-md ${styles.container}`}>
      <Calendar
        meetups={monthMeetups.startAt}
        onChangeMonth={onChangeGetMonthMeetups}
        onClickDate={onClickGetDateMeetups}
      />
      <MeetupList meetupInfoArray={dateMeetups} />
    </div>
  )
}

export default ClubMeetupPage
