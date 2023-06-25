import { InfiniteChat, ChatMember } from 'types/chat.interface'
import {
  ClubInfo,
  ClubSimpleInfo,
  InfiniteClubInfo,
  SearchCode,
  TodayClubMt,
  ClubDetailInfo,
  InfiniteAlbumInfo,
  ClubMemberList,
} from 'types/club.interface'
import { AxiosDataError, AxiosDataResponse } from 'types/common.interface'
import {
  CreateMeetup,
  MeetupInfo,
  MeetupInfoList,
} from 'types/meetup.interface'

import {
  useQuery,
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'

import apiRequest from 'apis/AxiosInterceptor'
import toast from 'components/common/Toast'
import { untilMidnight } from 'utils/untilMidnight'

// 오늘의 소모임 산 조회 (Main)
export function useTodayClubMtQuery() {
  return useQuery<AxiosDataResponse, AxiosDataError, TodayClubMt>(
    ['todayClubMountain'],
    () => apiRequest.get(`/info/today/club`),
    {
      select: (res) => res.data.result,
      cacheTime: untilMidnight(),
      staleTime: untilMidnight(),
    }
  )
}

// 소모임 랭킹 조회 (Main)
export function useclubRankTop3Query() {
  return useQuery<AxiosDataResponse, AxiosDataError, InfiniteClubInfo>(
    ['clubRankTop3'],
    () =>
      apiRequest.get(`/clubs/ranking`, {
        params: { sort: '', clubId: null, size: 3 },
      }),
    {
      select: (res) => res.data.result,
    }
  )
}

// 소모임 랭킹 조회 - useInfiniteQuery 적용
export function useInfiniteClubInfoQuery(filter: string) {
  return useInfiniteQuery<InfiniteClubInfo, AxiosDataError>({
    queryKey: ['rank', filter],
    queryFn: ({ pageParam = null }) =>
      apiRequest
        .get(`/clubs/ranking`, {
          params: { sort: filter, clubId: pageParam },
        })
        .then((res) => res.data.result),
    getNextPageParam: (lastPage) => {
      return lastPage.hasNext ? lastPage.content.slice(-1)[0].clubId : undefined
    },
    cacheTime: untilMidnight(),
    staleTime: untilMidnight(),
  })
}

// 소모임 핵심 정보 조회
export function useClubSimpleInfoQuery(clubId: number) {
  return useQuery<AxiosDataResponse, AxiosDataError, ClubSimpleInfo>(
    ['user', 'clubInfo'],
    () => apiRequest.get(`clubs/${clubId}`),
    {
      select: (res) => res.data.result,
      cacheTime: untilMidnight(),
      staleTime: untilMidnight(),
      enabled: !!clubId,
    }
  )
}

// 소모임 Detail 정보 조회
export function useClubInfoQuery(clubId: number) {
  return useQuery<AxiosDataResponse, AxiosDataError, ClubDetailInfo>(
    ['ClubDetailInfo', clubId],
    () => apiRequest.get(`/clubs/${clubId}/detail`),
    {
      select: (res) => res.data.result,
      enabled: !!clubId,
    }
  )
}

// 소모임 가입
export function useJoinClub(clubId: number) {
  return useMutation<AxiosDataResponse, AxiosDataError>(
    () => apiRequest.post(`/clubs/${clubId}/join-request`),
    {
      onSuccess: () => {
        toast.addMessage('success', '가입신청이 완료되었습니다')
      },
      onError: (err) => {
        toast.addMessage('error', err.data.message)
      },
    }
  )
}

// 소모임 가입 신청 목록 조회
export function useClubRequestQuery() {
  return useQuery<AxiosDataResponse, AxiosDataError, ClubInfo[]>(
    ['requestClubList'],
    () => apiRequest.get(`/members/clubs/my-requests`),
    {
      select: (res) => res.data.result,
    }
  )
}

// 소모임 가입 신청 취소
export function useUnJoinClub(clubId: number) {
  const queryClient = useQueryClient()

  return useMutation<AxiosDataResponse, AxiosDataError>(
    () => apiRequest.delete(`/clubs/${clubId}/join-request`),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['requestClubList'])
        toast.addMessage('success', `가입 신청을 취소했습니다`)
      },
      onError: () => {
        toast.addMessage('error', `$err.data.message}`)
      },
    }
  )
}

// 소모임 조회
export function useInfiniteClubsQuery(query = '', word = '') {
  return useInfiniteQuery<InfiniteClubInfo, AxiosDataError>({
    queryKey: ['clubs', { query, word }],
    queryFn: ({ pageParam = null }) =>
      apiRequest
        .get('/clubs', {
          params: {
            query,
            word,
            clubId: pageParam,
          },
        })
        .then((res) => res.data.result),
    getNextPageParam: (lastPage) => {
      return lastPage.hasNext ? lastPage.content.slice(-1)[0].clubId : undefined
    },
    enabled: false,
  })
}

// 소모임 생성
export function useCreateClub(
  name: string,
  description: string,
  dongCode: string
) {
  const navigate = useNavigate()
  return useMutation<AxiosDataResponse, AxiosDataError>(
    () =>
      apiRequest.post(`/clubs`, {
        name,
        description,
        dongCode,
      }),
    {
      onSuccess: (res) => {
        toast.addMessage('success', '모임을 생성했습니다')
        navigate(`/club/${res.data.result.clubId}/main`) // 생성된 클럽으로 이동
      },
      onError: (err) => {
        toast.addMessage('error', err.data.message)
      },
    }
  )
}

// 소모임 이름 중복 확인
export function useCheckClubNameQuery(name: string) {
  return useQuery<AxiosDataResponse, AxiosDataError>(
    ['duplicate', name],
    () => apiRequest.get(`/clubs/check-duplicate/${name}`),
    {
      select: (res) => res.data.result,
      cacheTime: 0, // 동일 컴포넌트 내에서 여러번 요청
      staleTime: 0,
      enabled: false,
    }
  )
}

// 시도 검색
export function useSidoCodeQuery() {
  return useQuery<AxiosDataResponse, AxiosDataError, SearchCode[]>(
    ['checkSidoCode'],
    () =>
      apiRequest.get(`/info/location`, {
        params: { query: 'sido', word: null },
      }),
    {
      select: (res) => res.data.result,
      cacheTime: untilMidnight(),
      staleTime: untilMidnight(),
    }
  )
}

// 구군 검색
export function useGuGunCodeQuery(word: string) {
  return useQuery<AxiosDataResponse, AxiosDataError, SearchCode[]>(
    ['checkGugunCode', { word }],
    () =>
      apiRequest.get(`/info/location`, { params: { query: 'gugun', word } }),
    {
      select: (res) => res.data.result,
      enabled: !!word,
      cacheTime: untilMidnight(),
      staleTime: untilMidnight(),
    }
  )
}

// 소모임 채팅 조회
export function useChatsQuery(clubId: number, enabled: boolean) {
  return useInfiniteQuery<InfiniteChat, AxiosDataError>({
    queryKey: ['chats'],
    queryFn: ({ pageParam = null }) =>
      apiRequest
        .get(`/clubs/${clubId}/chats`, {
          baseURL: 'https://hikingdom.kr/chat',
          params: { clubId: pageParam, size: 50 },
        })
        .then((res) => res.data.result.chats),
    getNextPageParam: (lastPage) => {
      return lastPage.hasNext ? lastPage.content.slice(-1)[0].chatId : undefined
    },
    enabled: enabled,
    cacheTime: 0,
  })
}

// 소모임 채팅 멤버 조회
export function useChatMembersQuery(clubId: number, enabled: boolean) {
  return useQuery<AxiosDataResponse, AxiosDataError, ChatMember[]>(
    ['chatsMembers'],
    () =>
      apiRequest.get(`/clubs/${clubId}/members`, {
        baseURL: 'https://hikingdom.kr/chat',
      }),
    {
      select: (res) => res.data.result,
      enabled: enabled,
    }
  )
}

// 소모임 월별 일정 조회
export function useMonthMeetupsQuery(clubId: number, month: string) {
  return useQuery<AxiosDataResponse, AxiosDataError, MeetupInfoList>(
    ['meetups', 'month'],
    () => apiRequest.get(`/clubs/${clubId}/meetups/month/${month}`),
    {
      select: (res) => res.data.result,
      enabled: false,
    }
  )
}

// 소모임 일별 일정 조회
export function useDateMeetupsQuery(clubId: number, date: string) {
  return useQuery<AxiosDataResponse, AxiosDataError, MeetupInfo[]>(
    ['meetups', 'date'],
    () => apiRequest.get(`/clubs/${clubId}/meetups/date/${date}`),
    {
      select: (res) => res.data.result,
      enabled: false,
    }
  )
}

// 일정 생성
export function useCreateMeetup(clubId: number) {
  const navigate = useNavigate()

  return useMutation<AxiosDataResponse, AxiosDataError, CreateMeetup>(
    ({ name, mountainId, startAt, description }) =>
      apiRequest.post(`/clubs/${clubId}/meetups`, {
        name,
        mountainId,
        startAt,
        description,
      }),
    {
      onSuccess: (res) => {
        toast.addMessage('success', '일정을 생성했습니다')
        navigate(`/club/${res.data.result.id}/main`)
      },
      onError: (err) => {
        toast.addMessage('error', err.data.message)
      },
    }
  )
}

// 소모임 멤버 조회
export function useClubMemberQuery(clubId: number) {
  return useQuery<AxiosDataResponse, AxiosDataError, ClubMemberList>(
    ['clubMembers'],
    () => apiRequest.get(`/clubs/${clubId}/members`),
    {
      select: (res) => res.data.result,
    }
  )
}

// 소모임 탈퇴
export function useDeleteClub(clubId: number) {
  const queryClient = useQueryClient()
  const navigate = useNavigate()

  return useMutation<AxiosDataResponse, AxiosDataError>(
    () => apiRequest.delete(`/clubs/${clubId}/members`),
    {
      onSuccess: (res) => {
        queryClient.invalidateQueries(['user'])
        toast.addMessage('success', res.data.message)
        navigate('/club/none')
      },
      onError: () => {
        toast.addMessage('error', `클럽 호스트는 탈퇴하실 수 없습니다`)
      },
    }
  )
}

// 소모임 가입 수락
export function useAddClubMember(clubId: number, memberId: number) {
  const queryClient = useQueryClient()

  return useMutation<AxiosDataResponse, AxiosDataError>(
    () => apiRequest.post(`/clubs/${clubId}/admin/requests/${memberId}`),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['clubMembers'])
      },
      onError: (err) => {
        toast.addMessage('error', `${err.data.message}`)
      },
    }
  )
}

// 소모임 가입 거절
export function useRemoveClubMember(clubId: number, memberId: number) {
  const queryClient = useQueryClient()

  return useMutation<AxiosDataResponse, AxiosDataError>(
    () => apiRequest.delete(`/clubs/${clubId}/admin/requests/${memberId}`),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['clubMembers'])
      },
      onError: (err) => {
        toast.addMessage('error', `${err.data.message}`)
      },
    }
  )
}

// 소모임 앨범 조회
export function useClubAlbum(clubId: number) {
  return useInfiniteQuery<InfiniteAlbumInfo, AxiosDataError>({
    queryKey: ['photos'],
    queryFn: ({ pageParam = null }) =>
      apiRequest
        .get(`/clubs/${clubId}/photos`, {
          params: {
            photoId: pageParam,
            size: 21,
          },
        })
        .then((res) => res.data.result),
    getNextPageParam: (lastPage) => {
      return lastPage.hasNext
        ? lastPage.content.slice(-1)[0].photoId
        : undefined
    },
    enabled: !!clubId,
  })
}

// 소모임 앨범 사진 삭제
export function useDeleteAlbum(clubId: number, photoId: number) {
  const queryClient = useQueryClient()

  return useMutation<AxiosDataResponse, AxiosDataError>(
    () => apiRequest.delete(`/clubs/${clubId}/photos/${photoId}`),
    {
      onSuccess: () => {
        // 모임 앨범, 일정 앨범 query key 모두 무효화
        queryClient.invalidateQueries(['photos'])
        queryClient.invalidateQueries(['meetupPhotos'])
        toast.addMessage('success', '사진이 삭제되었습니다')
      },
    }
  )
}
