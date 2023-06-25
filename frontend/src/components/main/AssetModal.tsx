import React, { useContext } from 'react'

import styles from './AssetModal.module.scss'

import { IoIosClose } from 'react-icons/io'

import IconButton from 'components/common/IconButton'
import { ThemeContext } from 'styles/ThemeProvider'

type AssetModalProps = {
  name: string
  getCondition: string
  checkPeak: string
  onClick: () => void
}

function AssetModal({
  name,
  getCondition,
  onClick,
  checkPeak,
}: AssetModalProps) {
  const { theme } = useContext(ThemeContext)

  return (
    <div className={`content ${theme} ${styles.modal}`}>
      <IconButton
        icon={<IoIosClose />}
        color="gray"
        size="lg"
        onClick={onClick}
      />
      <div className={styles.content}>
        <div className={styles.title}> {name}</div>

        <div className={styles.condition}>
          획득 조건 : <span className={styles.description}>{getCondition}</span>
        </div>
        <div className={styles.condition}>
          인증 위치 : <span className={styles.description}>{checkPeak}</span>
        </div>
      </div>
    </div>
  )
}

export default AssetModal
