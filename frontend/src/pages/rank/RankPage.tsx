import React, { useContext, useRef, useState, useMemo } from 'react'

import styles from './RankPage.module.scss'
import { InfiniteClubInfo } from 'types/club.interface'

import { useInfiniteClubInfoQuery } from 'apis/services/clubs'
import Dropdown from 'components/common/Dropdown'
import Loading from 'components/common/Loading'
import RankList from 'components/common/RankList'
import RankHeader from 'components/rank/RankHeader'
import useInfiniteScroll from 'hooks/useInfiniteScroll'
import { ThemeContext } from 'styles/ThemeProvider'

// 드롭다운 SelectBox에 넘길 옵션 배열
const filterOptions = [
  { label: '종합랭킹 순', value: '' },
  { label: '완등 산 순', value: 'mountain' },
  { label: '에셋 순', value: 'asset' },
  { label: '멤버 순', value: 'member' },
]

function RankPage() {
  const { theme } = useContext(ThemeContext)

  const [filter, setFilter] = useState('') // 선택된 필터 옵션 value
  const infiniteRef = useRef<HTMLDivElement>(null) // 무한 스크롤 동작시킬 useRef

  const {
    isLoading,
    isError,
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteClubInfoQuery(filter)

  // infiniteQuery로 받은 배열을 가공
  const clubInfoArray = useMemo(() => {
    if (!data) return []
    return data.pages.flatMap((page: InfiniteClubInfo) => page.content)
  }, [data])

  // 무한스크롤 커스텀 훅(동작 요소, 동작 함수)
  useInfiniteScroll({
    ref: infiniteRef,
    loadMore: fetchNextPage,
    isEnd: !hasNextPage,
  })

  return (
    <div className={`page ${theme}`}>
      <RankHeader />
      <div className={styles.select}>
        <Dropdown options={filterOptions} setValue={setFilter} />
      </div>
      <div ref={infiniteRef} className={`page p-md ${styles.clubs}`}>
        {isLoading || isError ? (
          <Loading />
        ) : (
          <>
            <RankList clubInfoArray={clubInfoArray} filter={filter} />
            {isFetchingNextPage && (
              <div className={styles.loading}>
                <Loading size="sm" />
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}

export default RankPage
