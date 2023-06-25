import React, { RefObject } from 'react'

import styles from './ChatList.module.scss'
import { Chat, ChatMember } from 'types/chat.interface'

import ChatItem from 'components/club/ChatItem'

type ChatListProps = {
  ref1: RefObject<HTMLDivElement>
  trigger: number
  chats: Chat[]
  members: { [key: number]: ChatMember }
}

function ChatList({ ref1, trigger, chats, members }: ChatListProps) {
  return (
    <div ref={ref1} className={styles.chats}>
      {chats.map((chat, index) => {
        const nextChat = index < chats.length - 1 ? chats[index + 1] : null // 다음 채팅
        const isContinued = nextChat?.memberId === chat.memberId // memberId 비교

        return (
          <ChatItem
            key={`${chat.chatId}-${trigger}`}
            chat={chat}
            members={members}
            isContinued={isContinued}
          />
        )
      })}
    </div>
  )
}

export default ChatList
