import React, { useContext, useEffect, useRef, useState, useMemo } from 'react'

import styles from './SearchClubPage.module.scss'
import { InfiniteClubInfo } from 'types/club.interface'

import { useInfiniteClubsQuery } from 'apis/services/clubs'
import InputDropdown from 'components/common/InputDropdown'
import Loading from 'components/common/Loading'
import RankList from 'components/common/RankList'
import useDebounce from 'hooks/useDebounce'
import useInfiniteScroll from 'hooks/useInfiniteScroll'
import { ThemeContext } from 'styles/ThemeProvider'

// 서치바의 드롭다운  SelectBox에 넘길 옵션 배열
const filterOptions = [
  { label: '모임이름', value: 'name' },
  // { label: '지역', value: 'participation' },
]

function SearchClubPage() {
  const { theme } = useContext(ThemeContext)

  const [query, setQuery] = useState('') // input 태그의 검색 쿼리
  const [filter, setFilter] = useState('name') // 선택된 필터
  const infiniteRef = useRef<HTMLDivElement>(null) // 무한스크롤 ref 요소

  const debouncedQuery = useDebounce(query) // debounced query

  // 서치바에 input태그 onChange 마다 query 업데이트하는 함수
  function onChange(event: React.ChangeEvent<HTMLInputElement>) {
    setQuery(event.target.value)
  }

  const {
    refetch: infiniteClubs,
    data,
    isLoading,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteClubsQuery(filter, debouncedQuery)

  // 입력값이랑, filter 값이 달라질 때마다 호출
  useEffect(() => {
    infiniteClubs()
  }, [filter, debouncedQuery])

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
    <div className={`page ${theme} p-md ${styles.container}`}>
      <div className={styles.search}>
        <InputDropdown
          value={query}
          placeholder="소모임을 검색하세요"
          options={filterOptions}
          setFilter={setFilter}
          onChange={onChange}
        />
      </div>
      <div ref={infiniteRef} className={styles.clubs}>
        <RankList clubInfoArray={clubInfoArray} size="lg" />
        {isLoading && (
          <div className={styles.loading}>
            <Loading size="sm" />
          </div>
        )}
      </div>
    </div>
  )
}

export default SearchClubPage
