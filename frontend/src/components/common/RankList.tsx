import React from 'react'

import styles from './RankList.module.scss'
import { ClubInfo } from 'types/club.interface'

import RankItem from 'components/common/RankItem'

type RankListProps = {
  clubInfoArray: ClubInfo[] // 소모임 정보 배열
  size?: 'sm' | 'lg' // 사이즈
  isDeleteButton?: boolean
  filter?: string
}

function RankList({
  clubInfoArray,
  size = 'lg',
  isDeleteButton = false,
  filter = '',
}: RankListProps) {
  const paddingClass = size === 'sm' ? 'p-md' : ''

  return (
    <div className={`${styles.container} ${styles[size]} ${paddingClass}`}>
      {clubInfoArray.map((clubInfo) => (
        <RankItem
          key={`${filter}-${clubInfo.clubId}`}
          clubInfo={clubInfo}
          size={size}
          isDeleteButton={isDeleteButton}
        />
      ))}
    </div>
  )
}

export default RankList
