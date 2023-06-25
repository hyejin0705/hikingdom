import React, { useContext, useState, useEffect, useRef } from 'react'

import styles from './ClubChatPage.module.scss'
import { Chat, ChatMember } from 'types/chat.interface'

import { Stomp } from '@stomp/stompjs'
import { useRecoilValue } from 'recoil'
import sockjs from 'sockjs-client'

import {
  useClubSimpleInfoQuery,
  useChatsQuery,
  useChatMembersQuery,
} from 'apis/services/clubs'
import { useUserInfoQuery } from 'apis/services/users'
import ChatList from 'components/club/ChatList'
import ErrorMessage from 'components/common/ErrorMessage'
import Loading from 'components/common/Loading'
import PageHeader from 'components/common/PageHeader'
import TextSendBar from 'components/common/TextSendBar'
import useScroll from 'hooks/useScroll'
import { accessTokenState } from 'recoil/atoms'
import { ThemeContext } from 'styles/ThemeProvider'

function ClubChatPage() {
  const { theme } = useContext(ThemeContext)
  const infiniteRef = useRef<HTMLDivElement>(null)
  const { data: userInfo } = useUserInfoQuery() // 유저 정보

  // 모임정보
  const {
    isLoading: isClubSimpleInfoLoading,
    isError: isClubSimpleInfoError,
    data: clubSimpleInfo,
  } = useClubSimpleInfoQuery(userInfo?.clubId || 0)

  // 소켓 통신
  const [stomp, setStomp] = useState<any>() // 타입 수정 필요
  const accessToken = useRecoilValue(accessTokenState)
  // 채팅 & 멤버 데이터
  const [members, setMembers] = useState<{ [key: number]: ChatMember } | null>(
    null
  )
  const [chatList, setChatList] = useState<Chat[]>([])
  const [message, setMessage] = useState<string>('')
  // 멤버 정보 업데이트시 ChatItem 업데이트
  const [trigger, setTrigger] = useState<number>(0)

  // 이전 채팅 내용 불러오기
  const {
    data: chats,
    isError: isChatError,
    isLoading: isChatLoading,
    fetchNextPage,
    hasNextPage,
    isSuccess: isChatsSuccess,
  } = useChatsQuery(userInfo?.clubId || 0, !!userInfo && !!members)

  useEffect(() => {
    if (isChatsSuccess) {
      setChatList((chatList) => [
        ...chatList,
        ...chats.pages.slice(-1)[0].content,
      ])
    }
  }, [chats])

  // 채팅 멤버 불러오기기
  const { data: memberInfo, isSuccess: isMemberSuccess } = useChatMembersQuery(
    userInfo?.clubId || 0,
    !!userInfo
  )

  useEffect(() => {
    if (isMemberSuccess) {
      setMembers(memberInfo)
    }
  }, [isMemberSuccess])

  // mount시 통신 연결
  useEffect(() => {
    if (!userInfo || !accessToken) return
    connection()
    return () => {
      // unmount시 연결 해제
      if (stomp) {
        stomp.disconnect()
      }
    }
  }, [userInfo, accessToken])

  // 소켓 연결 & 구독 함수
  const connection = () => {
    const socket = new sockjs('https://hikingdom.kr/chat/ws')
    const stomp = Stomp.over(socket)
    setStomp(stomp)

    // 서버 연결
    stomp.connect(
      {
        token: accessToken,
      },
      () => {
        // 특정 URI 구독
        stomp.subscribe(`/sub/clubs/${userInfo?.clubId}`, (chatDTO) => {
          // 구독후 데이터를 받을 때마다 실행할 함수
          const data = JSON.parse(chatDTO.body)

          // 채팅 데이터
          if (data.type === 'MESSAGE') {
            setChatList((chatList) => [data.chat, ...chatList])
            return
          }
          // 멤버 데이터
          if (data.type === 'MEMBERS') {
            console.log('멤버 데이터 업데이트', data.members)
            setMembers(data.members)
            setTrigger((trigger) => trigger + 1)
          }
        })
      }
    )
  }

  // 메세지 전송 함수
  const sendChat = () => {
    if (!message.trim()) return
    stomp.send(
      `/pub/clubs/${userInfo?.clubId}`,
      {
        headers: {
          accessToken: localStorage.getItem('accessToken'),
        },
      },
      JSON.stringify({
        type: 'chat',
        clubId: userInfo?.clubId,
        memberId: userInfo?.memberId,
        content: message,
      })
    )
    setMessage('')
  }

  useScroll({
    ref: infiniteRef,
    loadMore: fetchNextPage,
    isEnd: !hasNextPage,
  })

  if (isClubSimpleInfoLoading || isChatLoading) {
    return <Loading />
  }

  if (isClubSimpleInfoError || isChatError) {
    return <ErrorMessage />
  }

  return (
    <div className={`page p-sm ${theme} mobile `}>
      <PageHeader title={clubSimpleInfo?.clubName} url={`/club/main`} />
      {!members || !chatList ? (
        <div className={styles.content}>
          <Loading />
        </div>
      ) : (
        <ChatList
          ref1={infiniteRef}
          trigger={trigger}
          chats={chatList}
          members={members}
        />
      )}
      <TextSendBar
        placeholder="내용을 입력해주세요"
        content={message}
        setContent={setMessage}
        onClick={sendChat}
      />
    </div>
  )
}

export default ClubChatPage
