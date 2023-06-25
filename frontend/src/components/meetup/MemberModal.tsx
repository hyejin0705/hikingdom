import React from 'react'

import { useMembersDetailQuery } from 'apis/services/meetup'
import MemberList from 'components/club/MemberList'
import ErrorMessage from 'components/common/ErrorMessage'
import Loading from 'components/common/Loading'

type MemberModalProps = {
  clubId: number
  meetupId: number
}

function MemberModal({ clubId, meetupId }: MemberModalProps) {
  const {
    isLoading,
    isError,
    data: memberList,
  } = useMembersDetailQuery(clubId, Number(meetupId))

  if (isLoading) {
    return <Loading />
  }

  if (isError) {
    return <ErrorMessage />
  }

  return (
    <MemberList
      title="참여 멤버"
      length={memberList.length}
      memberList={memberList}
    />
  )
}

export default MemberModal
