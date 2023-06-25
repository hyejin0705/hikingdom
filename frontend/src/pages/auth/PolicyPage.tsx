import React, { useContext } from 'react'

import styles from './PolicyPage.module.scss'

import LabelTextArea from 'components/common/LabelTextArea'
import PageHeader from 'components/common/PageHeader'
import { PERSONAL_AGREEMENT, USAGE_AGREEMENT } from 'constants/agreements'
import { ThemeContext } from 'styles/ThemeProvider'

function PolicyPage() {
  const { theme } = useContext(ThemeContext)
  return (
    <div className={`page ${theme} p-lg ${styles.container}`}>
      <div className={styles.container}>
        <PageHeader title="약관 정책" />
        <div className={styles.form}>
          <LabelTextArea
            label="이용약관"
            value={USAGE_AGREEMENT}
            size="lg"
            placeholder=""
            disabled={true}
          />
        </div>
        <div className={styles.form}>
          <LabelTextArea
            label="개인정보 수집 및 이동"
            value={PERSONAL_AGREEMENT}
            size="lg"
            placeholder=""
            disabled={true}
          />
        </div>
      </div>
    </div>
  )
}

export default PolicyPage
