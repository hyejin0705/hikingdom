import React from 'react'

import styles from './LevelModal.module.scss'

import LEVEL_TO_IMG from 'constants/levels'

function LevelModal() {
  return (
    <div className={styles['level-modal']}>
      <LevelItem level={1} des={'씨앗'} />
      <LevelItem level={2} des={'새싹'} />
      <LevelItem level={3} des={'잎새'} />
      <LevelItem level={4} des={'가지'} />
      <LevelItem level={5} des={'꽃'} />
      <LevelItem level={6} des={'열매'} />
      <LevelItem level={7} des={'나무'} />
      <LevelItem level={8} des={'숲'} />
      <LevelItem level={9} des={'산'} />
      <LevelItem level={10} des={'산신령'} />
    </div>
  )
}

type LevelItemProps = {
  level: number
  des: string
}

function LevelItem({ level, des }: LevelItemProps) {
  const imgSrc = LEVEL_TO_IMG[level]

  return (
    <>
      {imgSrc && (
        <div className={styles.level}>
          <span>Lv.{level}</span>
          <img src={imgSrc} />
          <span>{des}</span>
        </div>
      )}
    </>
  )
}

export default LevelModal
