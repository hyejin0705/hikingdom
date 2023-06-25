import React, { useState, useMemo, useEffect, useContext, memo } from 'react'

import styles from './Calendar.module.scss'

import {
  format,
  addDays,
  addMonths,
  subMonths,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  isSameMonth,
} from 'date-fns'
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'
import { useNavigate, useParams } from 'react-router'

import Button from 'components/common/Button'
import IconButton from 'components/common/IconButton'
import { ThemeContext } from 'styles/ThemeProvider'

const WEEK_DAYS = ['일', '월', '화', '수', '목', '금', '토']

type CalendarProps = {
  meetups: number[]
  onChangeMonth: (month: string) => void // 월 변경 시, 실행 할 함수
  onClickDate: (date: string) => void // 날짜 박스 클릭 시, 실행 할 함수
}

function Calendar({ meetups, onChangeMonth, onClickDate }: CalendarProps) {
  const { theme } = useContext(ThemeContext)

  const navigate = useNavigate()
  const clubId = useParams() as {
    clubId: string
  }

  const [currentDate, setCurrentDate] = useState(new Date()) // 현재 달력이 바라보는 날짜

  // 현재 달력이 바라보는 날짜를 기반으로, 달력의 시작일자와 마지막 일자 반환
  const { calendarStart, calendarEnd } = useMemo(() => {
    const monthStart = startOfMonth(currentDate) // 현 월의 시작 일자
    const monthEnd = endOfMonth(currentDate) // 현 월의 마지막 일자
    const calendarStart = startOfWeek(monthStart) // 달력의 시작 일자 (전 월 포함)
    const calendarEnd = endOfWeek(monthEnd) // 달력의 마지막 일자 (다음 월 포함)
    return { calendarStart, calendarEnd }
  }, [currentDate])

  // 날짜(월) 변경 시 마다 onChangeMonth 실행
  useEffect(() => {
    onChangeMonth(format(currentDate, 'yyyy-MM'))
  }, [currentDate])

  // 왼쪽 화살표 버튼 클릭 시, currentDate에서 한 달 minus
  function onClickPreviousMonth() {
    setCurrentDate((currentDate) => subMonths(currentDate, 1))
  }

  // 오른쪽 화살표 버튼 클릭 시, currentDate에서 한 달 plus
  function onClickNextMonth() {
    setCurrentDate((currentDate) => addMonths(currentDate, 1))
  }

  // 날짜 input으로 월 변경 시마다, 해당 월의 첫 일로 setCurrentDate 업데이트
  function onChangeSetCurrentDate(event: React.ChangeEvent<HTMLInputElement>) {
    const [year, month] = event.target.value.split('-')
    const date = new Date(parseInt(year), parseInt(month) - 1)
    setCurrentDate(date)
  }

  // 날짜(월)이 발뀔 때마다 달력 날짜 박스 Array 형성
  const dateBoxes = []
  let tempDate = calendarStart
  const todayStringDate = format(new Date(), 'yyyy-MM-dd')
  while (tempDate <= calendarEnd) {
    const day = tempDate.getDay() // 요일: 0이면 일요일, 6이면 토요일
    const date = tempDate.getDate() // 일자
    const stringDate = format(tempDate, 'yyyy-MM-dd')
    const fullDate = tempDate

    // 오늘에 따른 today 클래스
    const todayClass = todayStringDate === stringDate ? styles.today : ''
    // 일정 유무에 따른 meetup 클래스
    const meetupClass =
      isSameMonth(currentDate, fullDate) && meetups.includes(date)
        ? styles.meetup
        : ''
    // 요일에 따른 color 클래스
    let colorClass = ''
    if (day === 0) {
      colorClass = styles.sunday
    } else if (day === 6) {
      colorClass = styles.saturday
    }
    // 월에 따른 background-clor 클래스
    const bgColorClass = !isSameMonth(currentDate, fullDate) ? styles.gray : ''
    // 월에 따른 onClick 함수 다르게 할당
    const onClick = !isSameMonth(currentDate, fullDate)
      ? () => {
          console.log(4)
          setCurrentDate(fullDate)
        } // 동일 월이 아닐 경우, 해당 날짜로 curretDate 업데이트
      : () => onClickDate(stringDate) // 동일 월일 경우, onClickDate 실행

    dateBoxes.push(
      <div
        key={stringDate}
        className={`${styles.datebox} ${colorClass} ${bgColorClass} ${todayClass} ${meetupClass}`}
        onClick={onClick}
      >
        <div>{date}</div>
      </div>
    )
    tempDate = addDays(tempDate, 1)
  }

  return (
    <div className={`content ${theme} ${styles.container}`}>
      <div className={styles.flexbox}>
        <IconButton icon={<FiChevronLeft />} onClick={onClickPreviousMonth} />
        <input
          type="month"
          onChange={onChangeSetCurrentDate}
          value={format(currentDate, 'yyyy-MM')}
          className={styles.input}
        />
        <IconButton icon={<FiChevronRight />} onClick={onClickNextMonth} />
      </div>
      <div className={`${styles.gridbox} ${styles.weekdays}`}>
        {WEEK_DAYS.map((day) => (
          <div key={day}>{day}</div>
        ))}
      </div>
      <div className={`${styles.gridbox} ${styles.calendar}`}>{dateBoxes}</div>
      <div className={styles.button}>
        <Button
          text="일정생성"
          color="primary"
          size="sm"
          onClick={() =>
            navigate(`/club/${parseInt(clubId.clubId)}/meetup/create`)
          }
        />
      </div>
    </div>
  )
}

export default memo(Calendar)
