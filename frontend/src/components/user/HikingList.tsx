import React from 'react'

import HikingItem from './HikingItem'
import styles from './HikingList.module.scss'
import { HikingSimple } from 'types/user.interface'


type HikingListProps = {
  records: HikingSimple[]
}

function HikingList({ records }: HikingListProps) {
  return (
    <div className={styles.scroll}>
      <div className={styles.list}>
        {records?.map((hiking) => (
          <HikingItem key={hiking.hikingRecordId} hiking={hiking} />
        ))}
      </div>
    </div>
  )
}

export default HikingList
