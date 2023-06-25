import React from 'react'

import MemberItem from './MemberItem'
import styles from './MemberList.module.scss'
import { ClubMember } from 'types/club.interface'

type MemberListProps = {
  title: string
  length: number
  memberList: ClubMember[]
  hostId?: number
  isRequest?: boolean
}

function MemberList({
  title,
  length,
  memberList,
  hostId,
  isRequest = false,
}: MemberListProps) {
  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <span>{title}</span>
        <span>{`(${length} 명)`}</span>
      </div>
      {memberList.map((memberInfo: ClubMember) => (
        <MemberItem
          key={memberInfo.memberId}
          memberInfo={memberInfo}
          hostId={hostId}
          isRequest={isRequest}
        />
      ))}
    </div>
  )
}

export default MemberList
