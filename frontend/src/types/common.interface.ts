import { AxiosError, AxiosResponse } from 'axios'

// Data가 추가 된 AxiosResponse
export interface AxiosDataResponse extends AxiosResponse {
  data: any
}

// Data가 추가 된 AxiosError
export interface AxiosDataError extends AxiosError {
  data: any
}

// Dropbox, SelectBox 등에 사용되는 옵션 타입
export interface Option {
  value: string
  label: string
}

// 서버로부터 받는 기본 Message Response
export interface Message {
  message: string
}

// 서버로부터 받는 무한 스크롤 기본 Page Response
export interface InfinitePage {
  hasNext: boolean
  hasPrevious: boolean
  numberOfElements: number
  pageSize: number
}
