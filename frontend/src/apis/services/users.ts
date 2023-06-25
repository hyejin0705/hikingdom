import { AxiosDataResponse, AxiosDataError } from 'types/common.interface'
import {
  HikingDetail,
  InfiniteHikingInfo,
  UserInfo,
  UserProfile,
  InfiniteAlarm,
} from 'types/user.interface'

import {
  useQuery,
  useMutation,
  useQueryClient,
  useInfiniteQuery,
} from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { useSetRecoilState } from 'recoil'

import apiRequest from 'apis/AxiosInterceptor'
import toast from 'components/common/Toast'
import { accessTokenState, refreshTokenState } from 'recoil/atoms'

/* 회원가입 관련 api */

// 이메일 인증코드 요청
export function useCheckEmail(email: string) {
  return useMutation<AxiosDataResponse, AxiosDataError>(
    () => apiRequest.post(`/members/auth/email-valid`, { email }),
    {
      onSuccess: (res) => {
        toast.addMessage('success', res.data.message)
      },
      onError: (err) => {
        toast.addMessage('error', err.data.message)
      },
    }
  )
}

// 이메일 인증코드 확인
export function useConfirmEmail(email: string, authCode: string) {
  return useMutation<AxiosDataResponse, AxiosDataError>(
    () =>
      apiRequest.delete(`/members/auth/email-valid`, {
        data: { email, authCode },
      }),
    {
      onSuccess: (res) => {
        toast.addMessage('success', res.data.message)
      },
      onError: (err) => {
        toast.addMessage('error', err.data.message)
      },
    }
  )
}

// 닉네임 중복 체크
export function useCheckNicknameQuery(nickname: string) {
  return useQuery<AxiosDataResponse, AxiosDataError>(
    ['checkNickname'],
    () => apiRequest.get(`/members/auth/nickname-check/${nickname}`),
    {
      onSuccess: (res) => {
        toast.addMessage('success', res.data.message)
      },
      onError: (err) => {
        toast.addMessage('error', err.data.message)
      },
      enabled: false,
    }
  )
}

// 회원가입
export function useSignUp(
  email: string,
  nickname: string,
  password: string,
  checkPassword: string
) {
  const navigate = useNavigate()
  return useMutation<AxiosDataResponse, AxiosDataError>(
    () =>
      apiRequest.post(`/members/auth/signup`, {
        email,
        nickname,
        password,
        checkPassword,
      }),
    {
      onSuccess: () => {
        toast.addMessage('success', '회원가입에 성공했습니다')
        navigate('/login')
      },
      onError: (err) => {
        toast.addMessage('error', err.data.message)
      },
    }
  )
}

// 비밀번호 찾기
export function useChangePw(email: string) {
  return useMutation<AxiosDataResponse, AxiosDataError>(
    () =>
      apiRequest.put(`/members/auth/password-find`, {
        email,
      }),
    {
      onSuccess: (res) => {
        toast.addMessage('success', res.data.message)
      },
      onError: (err) => {
        toast.addMessage('error', err.data.message)
      },
    }
  )
}

// 로그인
export function useLogin(email: string, password: string) {
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  const setAccessToken = useSetRecoilState(accessTokenState)
  const setRefreshToken = useSetRecoilState(refreshTokenState)
  const fcmToken = sessionStorage.getItem('fcmToken') || ''

  return useMutation<AxiosDataResponse, AxiosDataError>(
    () => apiRequest.post(`/members/auth/login`, { email, password, fcmToken }),
    {
      onSuccess: (res) => {
        queryClient.invalidateQueries(['user'])
        const accessToken = res.data.result.accessToken
        const refreshToekn = res.data.result.refreshToken
        setAccessToken(accessToken)
        setRefreshToken(refreshToekn)
        // @ts-expect-error
        if (window.Kotlin) {
          // @ts-expect-error
          window.Kotlin.saveToken(accessToken, refreshToekn)
          // @ts-expect-error
          window.Kotlin.login()
        }
        navigate('/main')
      },
      onError: (err) => {
        toast.addMessage('error', err.data.message)
      },
    }
  )
}

// 로그아웃
export function useLogout() {
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  const setAccessToken = useSetRecoilState(accessTokenState)
  const setRefreshToken = useSetRecoilState(refreshTokenState)

  return useMutation<AxiosDataResponse, AxiosDataError>(
    () => apiRequest.post(`/members/logout`),
    {
      onSettled: () => {
        queryClient.invalidateQueries({
          queryKey: ['user'],
          refetchType: 'none',
        })
        setAccessToken('')
        setRefreshToken('')
        // @ts-expect-error
        if (window.Kotlin) {
          // @ts-expect-error
          window.Kotlin.removeToken()
          // @ts-expect-error
          window.Kotlin.unlogin()
        }
        navigate('/')
      },
    }
  )
}

// 내 정보 조회
export function useUserInfoQuery() {
  const queryClient = useQueryClient()
  const query = useQuery<AxiosDataResponse, AxiosDataError, UserInfo>(
    ['user'],
    () => apiRequest.get(`/members`),
    {
      onSuccess: (res) => {
        // Kotlin으로 사용자 정보 전송
        // @ts-expect-error
        if (window.Kotlin) {
          // @ts-expect-error
          window.Kotlin.saveUserInfo(JSON.stringify(res))
        }
        // 회원의 clubId가 null일 경우, 해당 쿼리 키를 stale하게 바꿔준다.
        if (!res.clubId) {
          queryClient.invalidateQueries({
            queryKey: ['user'],
            refetchType: 'none',
          })
        }
      },
      onError: (err) => {
        toast.addMessage('error', err.data.message)
      },
      select: (res) => res.data.result,
      staleTime: Infinity,
    }
  )
  return query
}

// 유저 프로필 정보 조회
export function useProfileQuery(nickname: string) {
  return useQuery<AxiosDataResponse, AxiosDataError, UserProfile>(
    ['profile', nickname],
    () => apiRequest.get(`/members/${nickname}`, { params: { size: 0 } }),
    {
      select: (res) => res.data.result,
    }
  )
}

// 등산 기록 리스트 조회
export function useInfiniteHikingQuery(nickname: string) {
  return useInfiniteQuery<InfiniteHikingInfo, AxiosDataError>(
    ['hikings', nickname],
    ({ pageParam = null }) =>
      apiRequest
        .get(`/members/${nickname}/hiking`, {
          params: {
            hikingRecordId: pageParam,
          },
        })
        .then((res) => res.data.result),
    {
      getNextPageParam: (lastPage) => {
        return lastPage.hasNext
          ? lastPage.content.slice(-1)[0].hikingRecordId
          : undefined
      },
    }
  )
}

// 등산 기록 상세 조회
export function useHikingDetailQuery(nickname: string, hikingRecordId: number) {
  return useQuery<AxiosDataResponse, AxiosDataError, HikingDetail>(
    ['hiking', nickname, hikingRecordId],
    () => apiRequest.get(`/members/${nickname}/hiking/${hikingRecordId}`),
    {
      select: (res) => res.data.result,
    }
  )
}

// 내 알람 조회
export function useInfiniteAlarmQuery() {
  return useInfiniteQuery<InfiniteAlarm, AxiosDataError>(
    ['alarms'],
    ({ pageParam = null }) =>
      apiRequest
        .get(`members/notifications`, {
          params: { notificationId: pageParam },
        })
        .then((res) => res.data.result),
    {
      getNextPageParam: (lastPage) => {
        return lastPage.hasNext
          ? lastPage.content.slice(-1)[0].notificationId
          : undefined
      },
    }
  )
}

// 프로필 사진 변경
export function useUpdateProfileImg() {
  const queryClient = useQueryClient()
  const navigate = useNavigate()

  return useMutation<AxiosDataResponse, AxiosDataError, { formData: FormData }>(
    ({ formData }) =>
      apiRequest.put(`/members/profile-image-change`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }),
    {
      onSuccess: () => {
        toast.addMessage('success', '프로필 사진이 변경되었습니다')
        queryClient.invalidateQueries(['user'])
        navigate(-1)
      },
      onError: () => {
        toast.addMessage('error', '프로필 사진 변경에 실패했습니다')
      },
    }
  )
}

// 닉네임 변경
export function useUpdateNickname(nickname: string) {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  return useMutation<AxiosDataResponse, AxiosDataError>(
    () =>
      apiRequest.put(`/members/nickname-change`, {
        nickname,
      }),
    {
      onSuccess: (res) => {
        toast.addMessage('success', res.data.message)
        queryClient.invalidateQueries(['user'])
        navigate(`/profile/${nickname}`)
      },
      onError: (err) => {
        toast.addMessage('error', err.data.message)
      },
    }
  )
}

// 비밀번호 변경
export function useUpdatePw(
  password: string,
  newPassword: string,
  checkPassword: string
) {
  const navigate = useNavigate()
  return useMutation<AxiosDataResponse, AxiosDataError>(
    () =>
      apiRequest.put(`/members/password-change`, {
        password,
        newPassword,
        checkPassword,
      }),
    {
      onSuccess: (res) => {
        toast.addMessage('success', res.data.message)
        navigate(-1)
      },
      onError: (err) => {
        if (err.status === 401) {
          toast.addMessage('error', '현재 비밀번호가 일치하지 않습니다')
        } else {
          toast.addMessage('error', err.data.message)
        }
      },
    }
  )
}

// 유저 신고 : ALBUM || REVIEW || MEMBER
export function useReport() {
  return useMutation<
    AxiosDataResponse,
    AxiosDataError,
    { type: 'ALBUM' | 'REVIEW' | 'MEMBER'; id: number | string }
  >(
    ({ type, id }) => {
      console.log(type, id)
      return apiRequest.post(`/reports`, { type, id })
    },
    {
      onSuccess: (res) => {
        toast.addMessage('success', res.data.message)
      },
      onError: (err) => {
        toast.addMessage('error', err.data.message)
      },
    }
  )
}

export function report(
  type: 'ALBUM' | 'REVIEW' | 'MEMBER',
  id: number | string
) {
  return apiRequest.post(`/reports`, { type, id })
}

// 회원탈퇴
export function useWithdraw() {
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  const setAccessToken = useSetRecoilState(accessTokenState)
  const setRefreshToken = useSetRecoilState(refreshTokenState)

  return useMutation<AxiosDataResponse, AxiosDataError>(
    () => apiRequest.delete(`/members/withdraw`),
    {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ['user'],
          refetchType: 'none',
        })
        setAccessToken('')
        setRefreshToken('')
        // @ts-expect-error
        if (window.Kotlin) {
          // @ts-expect-error
          window.Kotlin.removeToken()
          // @ts-expect-error
          window.Kotlin.unlogin()
        }
        navigate('/')
      },
      onError: () => {
        toast.addMessage('error', '회원탈퇴에 실패했습니다')
      },
    }
  )
}
