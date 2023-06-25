import { AxiosDataResponse, AxiosDataError } from 'types/common.interface'
import { InfiniteMtInfo, MtInfo, MtInfoDetail } from 'types/mt.interface'

import { useInfiniteQuery, useQuery } from '@tanstack/react-query'

import apiRequest from 'apis/AxiosInterceptor'
import { untilMidnight } from 'utils/untilMidnight'

// 산 조회
export function useInfiniteMountainsQuery(word: string, query = 'name') {
  return useInfiniteQuery<InfiniteMtInfo, AxiosDataError>({
    queryKey: ['mountains', { query, word }],
    queryFn: ({ pageParam = null }) =>
      apiRequest
        .get(`/info/mountains`, {
          params: {
            word,
            mountainId: pageParam,
            query,
          },
        })
        .then((res) => res.data.result),
    getNextPageParam: (lastPage) => {
      return lastPage.hasNext
        ? lastPage.content.slice(-1)[0].mountainId
        : undefined
    },
    staleTime: 0,
    cacheTime: 0,
  })
}

// 오늘의 산 조회
export function useTodayMountainsQuery() {
  return useQuery<AxiosDataResponse, AxiosDataError, MtInfo[]>(
    ['todayMountains'],
    () => apiRequest.get(`/info/today/mountain`),
    {
      select: (res) => res.data.result,
      cacheTime: untilMidnight(),
      staleTime: untilMidnight(),
    }
  )
}

// 산 상세 정보 조회
export function useMountainInfoQuery(mountainId: number) {
  return useQuery<AxiosDataResponse, AxiosDataError, MtInfoDetail>(
    ['mountainInfo', { mountainId }],
    () => apiRequest.get(`/info/mountains/${mountainId}`),
    {
      select: (res) => res.data.result,
      cacheTime: untilMidnight(),
      staleTime: untilMidnight(),
    }
  )
}
