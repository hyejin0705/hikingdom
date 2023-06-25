import React from 'react'

import styles from './InputDropdown.module.scss'

import Dropdown from 'components/common/Dropdown'

// 옵션 타입
type Option = {
  value: string
  label: string
}

type InputDropdownProps = {
  value: string // input 태그의 value
  placeholder?: string // input 태그의 placeholder
  options: Option[] // 옵션으로 띄울 배열
  setFilter: (value: string) => void // 옵션 선택 시, 선택한 옵션의 vlaue로 업데이트할 값
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void // input 태그 onChange시 동작할 함수
}

function InputDropdown({
  value,
  placeholder = '',
  options,
  setFilter,
  onChange,
}: InputDropdownProps) {
  return (
    <div className={`${styles.container}`}>
      <Dropdown options={options} setValue={setFilter} />
      <input
        id="input"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`${styles.input}`}
      />
    </div>
  )
}

export default InputDropdown
