import React, { useContext, useMemo, useRef } from 'react'

import styles from './AlarmPage.module.scss'

import { useInfiniteAlarmQuery } from 'apis/services/users'
import ErrorMessage from 'components/common/ErrorMessage'
import Loading from 'components/common/Loading'
import PageHeader from 'components/common/PageHeader'
import AlarmList from 'components/user/AlarmList'
import useInfiniteScroll from 'hooks/useInfiniteScroll'
import { ThemeContext } from 'styles/ThemeProvider'

function AlarmPage() {
  const { theme } = useContext(ThemeContext)
  const infiniteRef = useRef<HTMLDivElement>(null)

  const { data, isLoading, isError, fetchNextPage, hasNextPage } =
    useInfiniteAlarmQuery()

  const alarmList = useMemo(() => {
    return data ? data.pages.flatMap((page) => page.content) : []
  }, [data])

  useInfiniteScroll({
    ref: infiniteRef,
    loadMore: fetchNextPage,
    isEnd: !hasNextPage,
  })

  if (isLoading) {
    return <Loading />
  }

  if (isError) {
    return <ErrorMessage />
  }

  return (
    <div className={`page p-md ${theme}`}>
      <PageHeader color="primary" title="알림 내역" />
      {alarmList.length ? (
        <div ref={infiniteRef} className={styles.list}>
          <AlarmList alarmList={alarmList} />
        </div>
      ) : (
        <p className={styles.blank}>알람 내역이 없습니다</p>
      )}
    </div>
  )
}

export default AlarmPage
