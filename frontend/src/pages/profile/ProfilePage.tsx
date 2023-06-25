import React, { useContext, useMemo, useRef } from 'react'

import styles from './ProfilePage.module.scss'

import { useParams } from 'react-router-dom'

import { useInfiniteHikingQuery } from 'apis/services/users'
import ErrorMessage from 'components/common/ErrorMessage'
import Loading from 'components/common/Loading'
import HikingList from 'components/user/HikingList'
import UserProfile from 'components/user/UserProfile'
import useInfiniteScroll from 'hooks/useInfiniteScroll'
import { ThemeContext } from 'styles/ThemeProvider'

function ProfilePage() {
  const { theme } = useContext(ThemeContext)
  const { nickname } = useParams() as { nickname: string }
  const infiniteRef = useRef<HTMLDivElement>(null)

  const {
    data,
    isLoading,
    isError,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteHikingQuery(nickname)

  const hikingList = useMemo(() => {
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
    <div className={`page p-md ${theme} ${styles.profile}`} ref={infiniteRef}>
      <UserProfile />
      <div className={styles.meetups}>
        <div className={styles.title}>등산기록</div>
        {hikingList.length ? (
          <HikingList records={hikingList} />
        ) : (
          <p className={styles.blank}>일정 기록이 없습니다</p>
        )}
        {isFetchingNextPage && <Loading />}
      </div>
    </div>
  )
}

export default ProfilePage
