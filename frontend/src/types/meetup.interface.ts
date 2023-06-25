import { Album } from './club.interface'
import { InfinitePage } from './common.interface'

// 일정 생성
export interface CreateMeetup {
  name: string
  mountainId: string
  startAt: string // 형식(YYYY.MM.DD HH:mm)
  description: string
}

// 월별 일정 조회
export interface MeetupInfoList {
  startAt: number[]
}

// 일별 일정 조회
export interface MeetupInfo {
  description: string
  meetupHostId: number
  meetupId: number
  meetupName: string
  mountainName: string
  startAt: string
  totalMember: number
}

// 일정 상세 조회
export interface MeetupInfoDetail extends MeetupInfo {
  join: boolean
  memberInfo: MeetupMember[]
  photoInfo: Album[]
  reviewInfo: MeetupReview[]
}

// 일정 사진 조회 (무한 스크롤)
export interface InfiniteAlbumInfo extends InfinitePage {
  content: Album[]
}

// 일정 멤버 조회
export interface MeetupMember {
  memberId: number
  profileUrl: string
}

export interface MeetupMemberInfo {
  totalMember: number
  isJoin: boolean
  memberInfo: MeetupMember[]
}

// 일정 후기 조회
export interface MeetupReview {
  memberId: number
  nickname: string
  profileUrl: string
  reviewId: number
  content: string
}
