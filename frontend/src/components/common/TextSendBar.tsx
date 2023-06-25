import React from 'react'

import styles from './TextSendBar.module.scss'

import airplane from 'assets/images/airplane.png'
import IconButton from 'components/common/IconButton'


type TextSendBarProps = {
  placeholder: string
  content: string
  setContent: (params: string) => void
  onClick: () => void
}

function TextSendBar({
  placeholder,
  content,
  setContent,
  onClick,
}: TextSendBarProps) {
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setContent(e.target.value)
  }

  return (
    <div className={styles.bar}>
      <input
        onKeyUp={(e: React.KeyboardEvent) => {
          if (e.key === 'Enter') {
            e?.preventDefault()
            onClick()
          }
        }}
        onChange={onChange}
        value={content}
        type="text"
        placeholder={placeholder}
        className={styles.input}
      />
      <IconButton imgSrc={airplane} size="md" onClick={onClick} />
    </div>
  )
}

export default TextSendBar
