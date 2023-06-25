import React, { useEffect, useMemo, useRef } from 'react'

import styles from './SearchMtPage.module.scss'

import { useLocation, useNavigate } from 'react-router-dom'

import { useInfiniteMountainsQuery } from 'apis/services/mountains'
import ErrorMessage from 'components/common/ErrorMessage'
import Loading from 'components/common/Loading'
import MtList from 'components/common/MtList'
import useDebounce from 'hooks/useDebounce'
import useInfiniteScroll from 'hooks/useInfiniteScroll'

function SearchMtPage() {
  const navigate = useNavigate()
  const infiniteRef = useRef<HTMLDivElement>(null) // 무한 스크롤 useRef

  // 뒤로가기 클릭 시, 메인 페이지로 이동시키는 리스너
  useEffect(() => {
    const toMainPage = () => navigate('/main')
    window.addEventListener('popstate', toMainPage)
    return () => window.removeEventListener('popstate', toMainPage)
  }, [])

  // url 주소의 sate로부터 query를 전달 받음
  const queryClient = new URLSearchParams(useLocation().search)
  const query = queryClient.get('query') || ''
  const debouncedQuery = useDebounce(query)

  const {
    isLoading,
    isError,
    data,
    fetchNextPage,
    hasNextPage,
    refetch: getMountains,
  } = useInfiniteMountainsQuery(debouncedQuery)

  // debouncedQuery에 따라서 산 검색 api 요청
  useEffect(() => {
    if (debouncedQuery) {
      getMountains()
        .then(() => {
          if (infiniteRef.current) {
            infiniteRef.current.scrollTo({
              top: 0,
              left: 0,
              behavior: 'smooth',
            })
          }
        })
        .catch(() => {})
    }
  }, [debouncedQuery])

  useInfiniteScroll({
    ref: infiniteRef,
    loadMore: fetchNextPage,
    isEnd: !hasNextPage,
  })

  const mtInfoArray = useMemo(() => {
    return data ? data.pages.flatMap((page) => page.content) : []
  }, [data])

  if (isLoading) {
    return <Loading />
  }

  if (isError) {
    return <ErrorMessage />
  }

  return (
    <div ref={infiniteRef} className={`p-md ${styles.container}`}>
      <MtList mtInfoArray={mtInfoArray} size="lg" />
      {isLoading && (
        <div className={styles.loading}>
          <Loading size="sm" />
        </div>
      )}
    </div>
  )
}

export default React.memo(SearchMtPage)
