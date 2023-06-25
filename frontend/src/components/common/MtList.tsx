import React from 'react'

import styles from './MtList.module.scss'
import { MtInfo } from 'types/mt.interface'

import MtItem from 'components/common/MtItem'

type MtListProps = {
  mtInfoArray: MtInfo[] // 산 정보 배열
  size?: 'sm' | 'lg' // 사이즈
}

function MtList({ mtInfoArray, size = 'lg' }: MtListProps) {
  const paddingClass = size === 'sm' ? 'p-md' : ''

  return (
    <div className={`${styles.container} ${styles[size]} ${paddingClass}`}>
      {mtInfoArray.map((mtInfo) => (
        <MtItem key={mtInfo.mountainId} mtInfo={mtInfo} size={size} />
      ))}
    </div>
  )
}

export default MtList
