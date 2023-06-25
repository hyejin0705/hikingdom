import React from 'react'

import styles from './CheckBox.module.scss'

type CheckBoxProps = {
  id: string // 체크 박스 고유 아이디, label과 input 연결용
  label: string // 체크 박스 옆 label 값
  isChecked: boolean // 체크 여부
  onClick: () => void // 클릭 시 동작
}

function CheckBox({ id, label, isChecked, onClick }: CheckBoxProps) {
  return (
    <div className={styles.container}>
      <input
        id={`checkbox-${id}`}
        type="checkbox"
        checked={isChecked}
        onClick={onClick}
        className={styles.input}
        readOnly={true}
      />
      <label htmlFor={`checkbox-${id}`} className={styles.label}>
        {label}
      </label>
    </div>
  )
}

export default CheckBox
