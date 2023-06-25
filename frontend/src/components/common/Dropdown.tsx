import React, { useState } from 'react'

import styles from './Dropdown.module.scss'

import { BsFillCaretDownFill } from 'react-icons/bs'

// 옵션 타입 정의
type Option = {
  value: string
  label: string
}

type Props = {
  options: Option[] // 옵션 배열
  defaultLabel?: string // 기본으로 띄울 라벨 명
  setValue?: (value: string) => void // 선택된 옵션의 value로 업데이트 하는 함수
  isLeft?: boolean // 왼쪽 정렬 여부
}

function Dropdown({ options, defaultLabel, setValue, isLeft = false }: Props) {
  const [label, setLabel] = useState<string>(defaultLabel || options[0].label) // 선택된(표시할) 라벨 값
  const [isShow, setIsShow] = useState(false) // 옵션 표시 여부

  // 옵션이 선택되었을 때 동작하는 함수
  function onClickSelect(option: Option) {
    onClickToggleShow() // isShow 토글
    const newLabel = option.label // 선택된 옵션의 라벨
    const newValue = option.value // 선택된 옵션의 value
    setLabel(newLabel)
    if (setValue) {
      setValue(newValue)
    }
  }

  // isShow 토글 함수
  function onClickToggleShow() {
    setIsShow((isShow) => !isShow)
  }

  return (
    <div className={`${styles.container} ${styles[isLeft ? 'left' : 'right']}`}>
      <div className={styles.select} onClick={onClickToggleShow}>
        {label}
        <div className={`${styles.arrow} ${styles[isShow ? 'up' : 'down']}`}>
          <BsFillCaretDownFill />
        </div>
      </div>
      {isShow && (
        <div className={styles.options}>
          {options.map((option) => (
            <div
              className={styles.option}
              key={option.value}
              onClick={() => onClickSelect(option)}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Dropdown
