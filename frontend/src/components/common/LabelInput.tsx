import React from 'react'

import styles from './LabelInput.module.scss'

import Label from 'components/common/Label'

type LabelInputProps = {
  label: string // 라벨 텍스트
  value: string // input태그 value
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void // input 변화시 동작할 함수
  onKeyDown?: (event: React.KeyboardEvent) => void
  isPass?: boolean // pass 여부 -> border 초록색
  isError?: boolean // error 여부 -> border 빨간색
  placeholder?: string // placeholder
  type?: string // input 태그 type
  disabled?: boolean // input 태그 dsiabled
  inputRef?: React.RefObject<HTMLInputElement>
  autoComplete?: string
}
function LabelInput({
  label,
  value,
  onChange,
  onKeyDown,
  isPass = false,
  isError = false,
  placeholder = '',
  type = 'text',
  disabled = false,
  inputRef,
  autoComplete = 'off',
}: LabelInputProps) {
  const error = isError ? styles.error : ''
  const pass = isPass ? styles.pass : ''

  return (
    <div className={styles.container}>
      <Label label={label} />
      <input
        ref={inputRef}
        id={`label-input-${label}`}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`${styles.input} ${error} ${pass}`}
        type={type}
        disabled={disabled}
        onKeyDown={onKeyDown}
        autoComplete={autoComplete}
      />
    </div>
  )
}

export default LabelInput
