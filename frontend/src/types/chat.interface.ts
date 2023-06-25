import { InfinitePage } from './common.interface'

// 채팅 멤버
export interface ChatMember {
  memberId: number
  nickname: string
  profileUrl: string
  level: number
}

// 채팅 내역 (무한 스크롤)
export interface Chat {
  chatId: string
  memberId: number
  content: string
  sendAt: string
}

export interface InfiniteChat extends InfinitePage {
  content: Chat[]
}

// 소모임 채팅(웹소켓)
export interface Chats {
  status: string
  members: ChatMember[]
  chats: Chat[]
}
