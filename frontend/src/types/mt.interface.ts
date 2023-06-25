import { InfinitePage } from './common.interface'

// 산 정보 (오늘의 추천 산, 산 검색)
export interface MtInfo {
  mountainId: number
  name: string
  maxAlt: number
  address: string
  imgUrl: string
}

// 산 검색 (무한 스크롤)
export interface InfiniteMtInfo extends InfinitePage {
  content: MtInfo[]
}

// 3D 산 정보
export interface MtAssetInfo {
  assetId: number
  name: string
  assetUrl: string
  getCondition: string // 에셋 획득 조건
}

// 산 상세정보
export interface MtInfoDetail extends MtInfo {
  totalDuration: number
  peaks: string
  description: string
  checkPeak: string
  assets: MtAssetInfo[]
}
