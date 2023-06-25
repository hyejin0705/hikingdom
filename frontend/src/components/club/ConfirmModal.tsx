import React from 'react'


import styles from './ConfirmModal.module.scss'

import Button from 'components/common/Button'

type ConfirmModalProps = {
  title: string
  content?: string
  buttonText: string
  onClickDelete: () => void
  onClickCloseModal: () => void
}

function ConfirmModal({
  title,
  content,
  buttonText,
  onClickDelete,
  onClickCloseModal,
}: ConfirmModalProps) {
  return (
    <div className={styles.container}>
      <p className={styles.title}>{title}</p>
      {content && <p className={styles.content}>{content}</p>}
      <div className={styles.buttons}>
        <Button
          text={buttonText}
          size="md"
          color="primary"
          onClick={onClickDelete}
        />
        <Button
          text="취소"
          size="md"
          color="secondary"
          onClick={onClickCloseModal}
        />
      </div>
    </div>
  )
}

export default ConfirmModal
