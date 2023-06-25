import React, { forwardRef, ForwardedRef } from 'react'

import styles from './LabelTextArea.module.scss'

import Label from 'components/common/Label'

type LabelTextAreaProps = {
  label: string // 라벨 텍스트
  value: string // textarea 태그의 value
  placeholder?: string // textarea 태그의 placeholder
  size?: 'sm' | 'md' | 'lg' // textarea 사이즈
  onChange?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void // textarea의 input 변경시 동작할 함수
  onKeyDown?: (event: React.KeyboardEvent) => void
  disabled?: boolean // textarea 태그 disabled
  isPass?: boolean
}

const LabelTextArea = forwardRef(function LabelTextArea(
  {
    label,
    value,
    placeholder = '',
    size = 'md',
    onChange = () => {},
    onKeyDown,
    disabled = false,
    isPass = false,
  }: LabelTextAreaProps,
  ref: ForwardedRef<HTMLTextAreaElement>
) {
  const pass = isPass ? styles.pass : ''
  return (
    <div className={styles.container}>
      <Label label={label} />
      <textarea
        ref={ref}
        id="textarea"
        value={value}
        onChange={onChange}
        onKeyDown={onKeyDown}
        placeholder={placeholder}
        disabled={disabled}
        className={`${styles.textarea} ${styles[size]} ${pass}`}
      />
    </div>
  )
})

export default LabelTextArea
