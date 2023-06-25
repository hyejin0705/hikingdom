import React from 'react'

import { useParams } from 'react-router'

import HikingDetail from 'components/user/HikingDetail'

function HikingDetailPage() {
  const { hikingRecordId } = useParams() as {
    hikingRecordId: string
    nickname: string
  }
  return (
    <HikingDetail hikingRecordId={Number(hikingRecordId)} isandroid={true} />
  )
}

export default HikingDetailPage
