import { InfinitePage } from './common.interface'

// 로그인 - 토큰 정보
export interface Token {
  accessToken: string
  refreshToken: string
}

// 내 정보 조회
export interface UserInfo {
  email: string
  nickname: string
  profileUrl: string
  memberId: number
  level: number
  clubId?: number
  unreadNotificationCount?: number
}

// 회원 프로필 조회 - 회원 등산 기록
export interface UserRecord {
  totalHikingCount: number
  totalMountainCount: number
  totalDuration: number
  totalDistance: number
  totalAlt: number
}

// 회원 프로필 조회
export interface UserProfile extends UserInfo, UserRecord {
  hikingRecords: HikingSimple[]
}

// 등산 전체 조회
export interface HikingSimple {
  hikingRecordId: number
  mountainName: string
  startAt: string
  totalDuration: number
  totalDistance: number
  maxAlt: number
  isSummit: boolean
  isMeetup: boolean
  meetupId: number
  meetupName: string
}

export interface InfiniteHikingInfo extends InfinitePage {
  content: HikingSimple[]
}

// 등산 기록 상세 조회
export interface Gps {
  alt: number
  lat: number
  lng: number
}

export interface GpsRoute {
  gpsRoute: Gps[]
}

export interface HikingDetail {
  gpsRoute: GpsRoute // 오류 아니고 백엔드로부터 이렇게 받음
  mountainName: string
  startAt: string
  totalDistance: number
  maxAlt: number
  totalDuration: number
}

// 전체 알림 조회
export interface Alarm {
  category: string
  title: string
  body: string
  sendAt: string
  clubId: number
  meetupId?: number
  notificationId: number
  isRead: boolean
}

export interface InfiniteAlarm extends InfinitePage {
  content: Alarm[]
}
