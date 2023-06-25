import React, { useEffect, useState } from 'react'

import axios, {
  InternalAxiosRequestConfig,
  AxiosResponse,
  AxiosError,
} from 'axios'
import { useNavigate } from 'react-router-dom'
import { useRecoilState } from 'recoil'

import toast from 'components/common/Toast'
import { accessTokenState, refreshTokenState } from 'recoil/atoms'
import consoleLog from 'utils/consoleLog'

// Axios 인스턴스 생성
const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL, // process.env에서 baseURL 읽어오기
  headers: {
    'Content-Type': 'application/json',
  },
})

interface Props {
  children: React.ReactNode
}

function AxiosInterceptor({ children }: Props) {
  const navigate = useNavigate()
  const [accessToken, setAccessToken] = useRecoilState(accessTokenState) // recoil에서 accessToken 읽어오기
  const [refreshToken, setRefreshToken] = useRecoilState(refreshTokenState) // recoil에서 refreshToken 읽어오기
  const [isSet, setIsSet] = useState(false)

  useEffect(() => {
    // 요청 인터셉터
    const requestInterceptor = (config: InternalAxiosRequestConfig<any>) => {
      // 인증관련 요청이 아닐 경우에만, // JWT access 토큰이 있다면 Authorization 헤더에 추가
      if (config.url?.slice(0, 13) !== '/members/auth' && accessToken) {
        config.headers.Authorization = accessToken
      }
      return config
    }

    // 응답 인터셉터
    const responseInterceptor = (response: AxiosResponse) => {
      consoleLog(response)
      return response
    }

    // 응답 에러 인터셉터
    // async 함수를 이용해서 동기적으로 실행시켜야한다. 그렇지 않으면 토큰이 만료되었을 경우 가장 하단에 Promise.eject(error)가 반한되어, 리액트 쿼리가 에러값을 캐싱한다.
    const errorInterceptor = async (error: AxiosError<any, any>) => {
      consoleLog(error)
      const originalRequest = error.config!

      // 만료된 JWT access 토큰이 감지되면 자동으로 새로운 JWT access 토큰 발급 시도
      if (error.response?.data?.code === 'C006') {
        try {
          const response: AxiosResponse = await axios.post(
            `${process.env.REACT_APP_API_BASE_URL}/members/auth/refresh-token`,
            {
              refreshToken,
            }
          )
          // 새 accessToken  발급 성공 시
          consoleLog(response)
          const newAccessToken = response.data.result.accessToken
          const newRefreshToken = response.data.result.refreshToken
          setAccessToken(newAccessToken) // recoil에 새로운 JWT access 토큰 저장
          setRefreshToken(newRefreshToken) // recoil에 새로운 JWT refresh 토큰 저장
          originalRequest.headers.Authorization = `${newAccessToken}` // 새로운 JWT access 토큰으로 요청을 다시 보내기
          return axiosInstance(originalRequest)
        } catch (error) {
          // 새 accessToken  발급 실패 시
          consoleLog(error)
          setAccessToken('') // recoil에 저장된 JWT access 토큰 삭제
          setRefreshToken('') // recoil에 저장된 JWT refresh 토큰 삭제
          toast.addMessage('error', `다시 로그인 해주세요`)
          navigate('/login')
          return Promise.reject(error)
        }
      } else if (error.response?.status === 404) {
        navigate('/404')
      } else if (error.response?.status && error.response?.status >= 500) {
        toast.addMessage('error', `서버와의 통신 오류가 발생했습니다`)
      }
      return Promise.reject(error.response)
    }

    const myRequestInterceptor =
      axiosInstance.interceptors.request.use(requestInterceptor)
    const myResponseInterceptor = axiosInstance.interceptors.response.use(
      responseInterceptor,
      errorInterceptor
    )
    setIsSet(true)

    return () => {
      setIsSet(false)
      axiosInstance.interceptors.request.eject(myRequestInterceptor)
      axiosInstance.interceptors.response.eject(myResponseInterceptor)
    }
  }, [accessToken, refreshToken])

  return <>{isSet && children}</>
}

export default axiosInstance
export { AxiosInterceptor }
