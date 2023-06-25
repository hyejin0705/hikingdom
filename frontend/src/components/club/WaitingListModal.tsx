import React from 'react'

import styles from './WaitingListModal.module.scss'

import { useClubRequestQuery } from 'apis/services/clubs'
import ErrorMessage from 'components/common/ErrorMessage'
import Loading from 'components/common/Loading'
import RankList from 'components/common/RankList'

function WaitingListModal() {
  const { isLoading, isError, data: clubInfoArray } = useClubRequestQuery()

  if (isLoading) {
    return <Loading />
  }

  if (isError) {
    return <ErrorMessage />
  }

  return (
    <div className={styles.list}>
      <h2>가입 대기 중 모임</h2>
      {clubInfoArray[0] ? (
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
