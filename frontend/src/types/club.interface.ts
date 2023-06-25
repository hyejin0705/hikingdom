import { InfinitePage } from './common.interface'

// 소모임 생성
export interface CreateClub {
  name: string
  description: string
  dongCode: number
}

// 지역 코드 조회
export interface SearchCode {
  dongCode: string
  sidoName?: string
  gugunName?: string
}

// 소모임 핵심 정보 조회(클럽 헤더)
export interface ClubSimpleInfo {
  hostId: number
  clubId: number
  clubName: string
}

// 소모임 산 정보
export interface AssetInfo {
  mountainName?: string
  meetupId?: number
  assetUrl: string
  row?: number
  column?: number
}

// 소모임 정보 조회(소모임 검색, 가입 신청 목록 조회)
export interface ClubInfo {
  clubId: number
  clubName: string
  location: string
  totalMember: number
  totalMountainCount: number
  totalMeetupCount: number
  totalAssetCount: number
  ranking: number
}

// 소모임 상세 정보 조회(소모임 메인 페이지)
export interface ClubDetailInfo {
  clubName: string
  isJoin: boolean
  totalMember: number
  totalMountainCount: number
  totalMeetupCount: number
  totalAssetCount: number
  description: string
  assets: AssetInfo[]
}

// 메인페이지 오늘의 소모임 산
export interface TodayClubMt {
  clubId: number
  assets: AssetInfo[]
}

// 소모임 랭킹 조회(무한 스크롤)
export interface InfiniteClubInfo extends InfinitePage {
  content: ClubInfo[]
}

// 소모임 멤버 정보(소모밈 멤법, 일정 멤버)
export interface ClubMember {
  memberId: number
  nickname: string
  profileUrl: string
  level: number
  totalHikingCount: number
  totalDuration: number
  totalDistance: number
}

// 소모임 멤버 조회
export interface ClubMemberList {
  request?: ClubMember[] // 소모임 대기 멤버
  member: ClubMember[] // 소모임 가임 멤버
}

// 소모임 앨범 조회
export interface Album {
  photoId: number
  imgUrl: string
  isOwner: boolean
  createdAt: string
  nickname: string
  profileUrl: string
}

export interface InfiniteAlbumInfo extends InfinitePage {
  content: Album[]
}
