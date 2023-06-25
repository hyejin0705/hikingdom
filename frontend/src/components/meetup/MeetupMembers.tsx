import React, { useState } from 'react'

import styles from './MeetupMembers.module.scss'
import MemberModal from './MemberModal'

import {
  useMeetupMemberQuery,
  useJoinMeetup,
  useUnJoinMeetup,
} from 'apis/services/meetup'
import Button from 'components/common/Button'
import ErrorMessage from 'components/common/ErrorMessage'
import Image from 'components/common/Image'
import Loading from 'components/common/Loading'
import Modal from 'components/common/Modal'

type MeetupMembersProps = {
  clubId: number
  meetupId: number
}

function MeetupMembers({ clubId, meetupId }: MeetupMembersProps) {
  const [isOpen, setIsOpen] = useState(false)

  // 일정 멤버 조회
  const {
    isLoading: isMeetupMembersLoading,
    isError: isMeetupMembersError,
    data: meetupMembers,
  } = useMeetupMemberQuery(clubId, meetupId)

  // 일정 참여
  const {
    isLoading: isJoinLoading,
    isError: isJoinError,
    mutate: joinMeetup,
  } = useJoinMeetup(clubId, meetupId)

  // 일정 참여 취소
  const {
    isLoading: isUnjoinLoading,
    isError: isUnjoinError,
    mutate: unJoinMeetup,
  } = useUnJoinMeetup(clubId, meetupId)

  if (isMeetupMembersLoading || isJoinLoading || isUnjoinLoading) {
    return <Loading />
  }

  if (isMeetupMembersError || isJoinError || isUnjoinError) {
    return <ErrorMessage />
  }

  return (
    <div className={styles.meetup}>
      {isOpen && (
        <Modal onClick={() => setIsOpen(false)}>
          <MemberModal clubId={clubId} meetupId={meetupId} />
        </Modal>
      )}
      <div className={styles.titles}>
        <span className={styles.title}>
          참여 멤버 ({meetupMembers?.totalMember}명)
        </span>
        {meetupMembers?.isJoin ? (
          <Button
            text="참여취소"
            color="secondary"
            size="xs"
            onClick={() => unJoinMeetup()}
          />
        ) : (
          <Button
            text="참여"
            color="primary"
            size="xs"
            onClick={() => joinMeetup()}
          />
        )}
      </div>
      <div className={styles.members}>
        {meetupMembers?.memberInfo.slice(0, 6).map((member) => (
          <Image
            key={member.memberId}
            imgUrl={member.profileUrl}
            size="sm"
            isSquare={true}
          />
        ))}
        <div className={styles.more} onClick={() => setIsOpen(true)}>
          +
        </div>
      </div>
    </div>
  )
}

export default MeetupMembers
