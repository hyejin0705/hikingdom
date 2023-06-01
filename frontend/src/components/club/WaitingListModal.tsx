import React from 'react'
import styles from './WaitingListModal.module.scss'

import { useClubRequestQuery, useUnJoinClub } from 'apis/services/clubs'
import RankList from 'components/common/RankList'

function WaitingListModal() {
  const {
    isLoading: isClubRequestLoading,
    isError: isClubRequestError,
    data: clubInfoArray,
    isSuccess: isClubRequestSuccess,
  } = useClubRequestQuery()

  return (
    <div className={styles.list}>
      <h2>가입 대기 중 모임</h2>
      {isClubRequestSuccess ? (
        <RankList
          clubInfoArray={clubInfoArray}
          size="lg"
          isDeleteButton={true}
        />
      ) : (
        <span className={styles.text}>가입 신청한 모임이 없습니다</span>
      )}
    </div>
  )
}

export default WaitingListModal
