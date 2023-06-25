import React, { useState } from 'react'

import styles from './ClubMemberPage.module.scss'

import {
  useDeleteClub,
  useClubSimpleInfoQuery,
  useClubMemberQuery,
} from 'apis/services/clubs'
import { useUserInfoQuery } from 'apis/services/users'
import ConfirmModal from 'components/club/ConfirmModal'
import MemberList from 'components/club/MemberList'
import ErrorMessage from 'components/common/ErrorMessage'
import Loading from 'components/common/Loading'
import Modal from 'components/common/Modal'
import TextButton from 'components/common/TextButton'

function ClubMemberPage() {
  const [isOpen, setIsOpen] = useState(false)

  const { data: userInfo } = useUserInfoQuery()
  const clubId = userInfo?.clubId

  const {
    isLoading: isClubSimpleInfoLoading,
    isError: isClubSimpleInfoError,
    data: clubSimpleInfo,
  } = useClubSimpleInfoQuery(clubId || 0)

  const {
    isLoading,
    isError,
    data: clubMemberList,
  } = useClubMemberQuery(clubId || 0)

  // 모임 탈퇴 mutation 호출
  const { mutateAsync: deleteClub } = useDeleteClub(clubId || 0)

  // 모임 탈퇴 함수
  function onClickDeleteClub() {
    if (!clubId) return
    deleteClub().catch(() => {
      setIsOpen(false)
    })
  }

  if (isLoading || isClubSimpleInfoLoading) {
    return <Loading />
  }

  if (isError || isClubSimpleInfoError) {
    return <ErrorMessage />
  }

  return (
    <>
      {isOpen && (
        <Modal onClick={() => setIsOpen(false)}>
          <ConfirmModal
            title="모임을 탈퇴하시겠습니까?"
            content={`주최한 일정이 존재하면, \n삭제 또는 완료해야 탈퇴가능합니다`}
            buttonText="모임 탈퇴"
            onClickDelete={onClickDeleteClub}
            onClickCloseModal={() => setIsOpen(false)}
          />
        </Modal>
      )}
      <div className={styles.page}>
        {clubMemberList.request && (
          <MemberList
            title="가입대기"
            length={clubMemberList.request.length}
            memberList={clubMemberList.request}
            hostId={clubSimpleInfo.hostId}
            isRequest={true}
          />
        )}
        <MemberList
          title="모임 멤버"
          length={clubMemberList.member.length}
          memberList={clubMemberList.member}
          hostId={clubSimpleInfo.hostId}
        />
        <div className={styles.button}>
          <TextButton
            text="모임탈퇴"
            size="sm"
            color="gray"
            onClick={() => setIsOpen(true)}
          />
        </div>
      </div>
    </>
  )
}

export default ClubMemberPage
