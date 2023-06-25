import React, { useState } from 'react'

import styles from './LabelInputSelect.module.scss'

import Label from 'components/common/Label'

type Option = {
  value: string
  label: string
}

type LabelInputSelectProps = {
  label: string // 라벨 텍스트
  placeholder?: string // placeholder
  value: string
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void // input 변화시 동작할 함수
  onKeyDown?: (event: React.KeyboardEvent) => void
  options: Option[]
  setInputValue: (value: string) => void
  setOption: (optionValue: string) => void // input태그 value
  disabled?: boolean
}

function LabelInputSelect({
  label,
  placeholder = '',
  value,
  onChange,
  onKeyDown,
  options,
  setInputValue,
  setOption,
  disabled = false,
}: LabelInputSelectProps) {
  const [isShow, setIsShow] = useState(false) // 옵션 표시 여부

  // 옵션이 선택되었을 때 동작하는 함수
  function onClickSelect(option: Option) {
    setIsShow(false) // isShow 토글
    const newLabel = option.label // 선택된 옵션의 value
    const newValue = option.value // 선택된 옵션의 value
    setInputValue(newLabel)
    setOption(newValue)
  }

  return (
    <div className={styles.container}>
      <Label label={label} />
      <input
        id={`label-input-${label}`}
        value={value}
        onFocus={() => {
          setIsShow(true)
        }}
        onChange={onChange}
        onKeyDown={onKeyDown}
        placeholder={placeholder}
        className={`${styles.input}`}
        disabled={disabled}
      />
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

export default LabelInputSelect
