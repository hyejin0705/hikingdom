import React, { useState } from 'react'

import styles from './AgreeForm.module.scss'

import { useNavigate } from 'react-router-dom'

import Button from 'components/common/Button'
import CheckBox from 'components/common/CheckBox'
import LabelTextArea from 'components/common/LabelTextArea'
import toast from 'components/common/Toast'
import { PERSONAL_AGREEMENT, USAGE_AGREEMENT } from 'constants/agreements'

function AgreeForm() {
  const navigate = useNavigate()

  const [isAgreeUsage, setIsAgreeUsage] = useState(false) // 이용약관 동의 여부
  const [isOlder14, setIsOlder14] = useState(false) // 만 14세 이상 여부
  const [isAgreeInfo, setIsAgreeInfo] = useState(false) // 개인정보 동의 여부

  function onClickNext() {
    // 모든 약관을 동의한 경우에만, 회원가입 페이지로
    if (!isAgreeUsage || !isAgreeInfo) {
      toast.addMessage('error', `약관을 동의해주세요`)
      return
    }
    if (!isOlder14) {
      toast.addMessage('error', `만 14세 미만은 가입이 불가능합니다`)
      return
    }
    navigate('/signup')
  }

  return (
    <div className={styles.container}>
      <div className={styles.form}>
        <LabelTextArea
          label="이용약관 (필수)"
          value={USAGE_AGREEMENT}
          size="md"
          placeholder=""
          disabled={true}
        />
        <div className={styles.checkbox}>
          <CheckBox
            id="disagree-USAGE-AGREEMENT"
            label="동의 안함"
            isChecked={!isAgreeUsage}
            onClick={() => {
              setIsAgreeUsage(false)
            }}
          />
          <CheckBox
            id="agree-USAGE-AGREEMENT"
            label="동의"
            isChecked={isAgreeUsage}
            onClick={() => {
              setIsAgreeUsage(true)
            }}
          />
        </div>
      </div>
      <div className={styles.form}>
        <LabelTextArea
          label="개인정보 수집 및 이용 (필수)"
          value={PERSONAL_AGREEMENT}
          size="md"
          placeholder=""
          disabled={true}
        />
        <div className={styles.checkbox}>
          <CheckBox
            id="disagree-INFO"
            label="동의 안함"
            isChecked={!isAgreeInfo}
            onClick={() => {
              setIsAgreeInfo(false)
            }}
          />
          <CheckBox
            id="agree-INFO"
            label="동의"
            isChecked={isAgreeInfo}
            onClick={() => {
              setIsAgreeInfo(true)
            }}
          />
        </div>
        <div className={styles.checkbox}>
          <CheckBox
            id="disagree-OLDER-14"
            label="만 14세 미만"
            isChecked={!isOlder14}
            onClick={() => {
              setIsOlder14(false)
            }}
          />
          <CheckBox
            id="agree-OLDER-14"
            label="만 14세 이상"
            isChecked={isOlder14}
            onClick={() => {
              setIsOlder14(true)
            }}
          />
        </div>
      </div>
      <Button
        text="동의 후 가입"
        color="primary"
        size="lg"
        onClick={onClickNext}
      />
    </div>
  )
}

export default AgreeForm
