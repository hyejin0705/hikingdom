import React from 'react'

import MtContent from './MtContent'
import styles from './MtDetail.module.scss'
import MtTitle from './MtTitle'
import { MtInfoDetail } from 'types/mt.interface'

type MtDetailProps = {
  mtInfo: MtInfoDetail
}

function MtDetail({ mtInfo }: MtDetailProps) {
  return (
    <div className={styles.detail}>
      {mtInfo.assets && (
        <MtTitle
          name={mtInfo.name}
          maxAlt={mtInfo.maxAlt}
          timeDuration={mtInfo.totalDuration}
          assets={mtInfo.assets}
          checkPeak={mtInfo.checkPeak}
        />
      )}
      <MtContent
        address={mtInfo.address}
        peaks={mtInfo.peaks}
        description={mtInfo.description}
      />
    </div>
  )
}

export default MtDetail
