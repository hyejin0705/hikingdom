import { ClubMember } from 'types/club.interface'
import { AxiosDataResponse, AxiosDataError } from 'types/common.interface'
import {
  MeetupMemberInfo,
  MeetupInfoDetail,
  MeetupReview,
  InfiniteAlbumInfo,
} from 'types/meetup.interface'

import {
  useQuery,
  useMutation,
  useQueryClient,
  useInfiniteQuery,
} from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'

import apiRequest from 'apis/AxiosInterceptor'
import toast from 'components/common/Toast'

// 일정 상세 조회
export function useMeetupDetailQuery(clubId: number, meetupId: number) {
  return useQuery<AxiosDataResponse, AxiosDataError, MeetupInfoDetail>(
    ['meetup', clubId, meetupId],
    () => apiRequest.get(`/clubs/${clubId}/meetups/${meetupId}/detail`),
    { select: (res) => res?.data.result }
  )
}

// 일정 멤버 조회
export function useMeetupMemberQuery(clubId: number, meetupId: number) {
  return useQuery<AxiosDataResponse, AxiosDataError, MeetupMemberInfo>(
    ['meetupMembers', clubId, meetupId],
    () => apiRequest.get(`/clubs/${clubId}/meetups/${meetupId}/members`),
    { select: (res) => res?.data.result, enabled: !!clubId }
  )
}

// 일정 멤버 상세 조회
export function useMembersDetailQuery(clubId: number, meetupId: number) {
  return useQuery<AxiosDataResponse, AxiosDataError, ClubMember[]>(
    ['meetupMembersDetail', clubId, meetupId],
    () => apiRequest.get(`/clubs/${clubId}/meetups/${meetupId}/members/detail`),
    { select: (res) => res?.data.result, enabled: !!clubId }
  )
}

// 일정 참여
export function useJoinMeetup(clubId: number, meetupId: number) {
  const queryClient = useQueryClient()
  return useMutation<AxiosDataResponse, AxiosDataError>(
    () => apiRequest.post(`/clubs/${clubId}/meetups/${meetupId}/join`),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['meetupMembers', clubId, meetupId])
        queryClient.invalidateQueries(['meetup'])
        toast.addMessage('success', '일정에 참여했습니다')
      },
      onError: (err) => {
        toast.addMessage('error', err.data.message)
      },
    }
  )
}

// 일정 참여 취소
export function useUnJoinMeetup(clubId: number, meetupId: number) {
  const queryClient = useQueryClient()
  return useMutation<AxiosDataResponse, AxiosDataError>(
    () => apiRequest.delete(`/clubs/${clubId}/meetups/${meetupId}/join`),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['meetupMembers', clubId, meetupId])
        queryClient.invalidateQueries(['meetup'])
        toast.addMessage('success', '일정 참여를 취소했습니다')
      },
      onError: (err) => {
        toast.addMessage('error', err.data.message)
      },
    }
  )
}

// 일정 사진 조회
export function useInfiniteMeetupAlbumQuery(
  clubId: number,
  meetupId: number,
  size: number | null = 5
) {
  return useInfiniteQuery<InfiniteAlbumInfo, AxiosDataError>({
    queryKey: ['meetupAlbum', clubId, meetupId],
    queryFn: ({ pageParam = null }) =>
      apiRequest
        .get(`/clubs/${clubId}/meetups/${meetupId}/photos`, {
          params: { photoId: pageParam, size },
        })
        .then((res) => res.data.result),
    getNextPageParam: (lastPage) => {
      return lastPage.hasNext
        ? lastPage.content.slice(-1)[0].photoId
        : undefined
    },
  })
}

// 일정 사진 등록
export function usePostMeetupPhoto(clubId: number, meetupId: number) {
  const queryClient = useQueryClient()
  return useMutation<AxiosDataResponse, AxiosDataError, { formData: FormData }>(
    ({ formData }) =>
      apiRequest.post(`/clubs/${clubId}/meetups/${meetupId}/photos`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['meetupAlbum', clubId, meetupId])
        toast.addMessage('success', '사진이 추가되었습니다')
      },
    }
  )
}

// 일정 후기 조회
export function useMeetupReviewsQuery(clubId: number, meetupId: number) {
  return useQuery<AxiosDataResponse, AxiosDataError, MeetupReview[]>(
    ['meetupReviews', clubId, meetupId],
    () => apiRequest.get(`/clubs/${clubId}/meetups/${meetupId}/reviews`),
    { select: (res) => res?.data.result, enabled: !!clubId }
  )
}

// 일정 후기 등록
export function usePostReview(
  clubId: number,
  meetupId: number,
  content: string
) {
  const queryClient = useQueryClient()
  return useMutation<AxiosDataResponse, AxiosDataError>(
    () =>
      apiRequest.post(`/clubs/${clubId}/meetups/${meetupId}/reviews`, {
        content,
      }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['meetupReviews', clubId, meetupId])
        toast.addMessage('success', '후기가 등록되었습니다')
      },
    }
  )
}

// 일정 후기 삭제
export function useDeleteReview(
  clubId: number,
  meetupId: number,
  reviewId: number
) {
  const queryClient = useQueryClient()
  return useMutation<AxiosDataResponse, AxiosDataError>(
    () =>
      apiRequest.delete(
        `/clubs/${clubId}/meetups/${meetupId}/reviews/${reviewId}`
      ),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['meetupReviews', clubId, meetupId])
        toast.addMessage('success', '후기가 삭제되었습니다')
      },
    }
  )
}

// 일정 삭제
export function useDeleteMeetup(clubId: number, meetupId: number) {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  return useMutation<AxiosDataResponse, AxiosDataError>(
    () => apiRequest.delete(`/clubs/${clubId}/meetups/${meetupId}`),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['meetups'])
        toast.addMessage('success', '일정이 삭제되었습니다')
        navigate(`/club/${clubId}/main`)
      },
      onError: (err) => {
        if (err.status === 400) {
          toast.addMessage('error', '완료된 일정은 삭제할 수 없습니다')
        }
      },
    }
  )
}
