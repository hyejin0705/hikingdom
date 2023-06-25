import React, { useContext } from 'react'

import styles from './MtDetailPage.module.scss'

import { useParams } from 'react-router-dom'

import { useMountainInfoQuery } from 'apis/services/mountains'
import ErrorMessage from 'components/common/ErrorMessage'
import Loading from 'components/common/Loading'
import PageHeader from 'components/common/PageHeader'
import MtDetail from 'components/main/MtDetail'
import useRedirect from 'hooks/useRedirect'
import { ThemeContext } from 'styles/ThemeProvider'

function MtDetailPage() {
  const { theme } = useContext(ThemeContext)

  const { mountainId } = useParams() as {
    mountainId: string
  }

  const [parsedMountainId] = useRedirect(mountainId)

  const { isLoading, isError, data } = useMountainInfoQuery(parsedMountainId)

  if (isLoading) {
    return <Loading />
  }

  if (isError) {
    return <ErrorMessage />
  }

  return (
    <div className={`page ${theme} p-sm ${styles.container}`}>
      <img src={data.imgUrl} className={styles.image} />
      <PageHeader title="" url="/main" color="light" />
      <MtDetail mtInfo={data} />
    </div>
  )
}

export default MtDetailPage
