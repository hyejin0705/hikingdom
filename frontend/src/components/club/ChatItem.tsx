import React, { useContext, useState, useEffect } from 'react'

import styles from './ChatItem.module.scss'
import { Chat, ChatMember } from 'types/chat.interface'

import { useNavigate } from 'react-router-dom'

import { useUserInfoQuery } from 'apis/services/users'
import Image from 'components/common/Image'
import LEVEL_TO_IMG from 'constants/levels'
import { ThemeContext } from 'styles/ThemeProvider'

type ChatItemProps = {
  chat: Chat
  members: { [key: number]: ChatMember }
  isContinued: boolean
}

type User = {
  nickname: string
  profileUrl: string
  level: string
}

function ChatItem({ chat, members, isContinued }: ChatItemProps) {
  const { theme } = useContext(ThemeContext)
  const { data: userInfo } = useUserInfoQuery()
  const [user, setUser] = useState<User>()
  const navigate = useNavigate()

  useEffect(() => {
    // 멤버ID 대조 : 해당 프로필, 닉네임 반환
    const chatMember: ChatMember | undefined = members[chat.memberId]

    // 멤버를 찾을 수 없을 때(탈퇴한 멤버일 때)
    if (!chatMember) {
      setUser({
        nickname: '알 수 없음',
        profileUrl: '',
        level: '',
      })
      return
    }
    // 멤버가 있을 때 : LEVEL URL 반영
    const { nickname, profileUrl, level } = chatMember
    const tmpUser = {
      nickname,
      profileUrl,
      level: LEVEL_TO_IMG[level],
    }
    setUser(tmpUser)
  }, [])

  // 말풍선 스타일
  const chatStyle =
    chat.memberId === userInfo?.memberId ? styles.mine : styles.others
  const imgStyle = isContinued ? styles.continued : styles.discontinued

  return user ? (
    <div className={`${chatStyle} ${imgStyle}`}>
      <div
        className={imgStyle}
        onClick={() => navigate(`/profile/${user.nickname}`)}
      >
        <Image size="sm" imgUrl={user.profileUrl} />
      </div>

      <div className={styles.chat}>
        {!isContinued && (
          <div className={styles.name}>
            <span>{user.nickname}</span>
            <img src={user.level} className={styles.level} />
          </div>
        )}
        <div className={styles.content}>
          <div className={`${styles.chatContent} ${styles[theme]}`}>
            {chat.content}
          </div>
          <div className={styles.time}>{chat.sendAt.split(' ')[1]}</div>
        </div>
      </div>
    </div>
  ) : (
    <div></div>
  )
}

export default ChatItem
