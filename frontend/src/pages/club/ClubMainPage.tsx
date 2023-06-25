import React, { useContext } from 'react'

import styles from './ClubMainPage.module.scss'

import { useClubInfoQuery } from 'apis/services/clubs'
import { useUserInfoQuery } from 'apis/services/users'
import ClubRecordInfo from 'components/club/ClubRecordInfo'
import SearchClubMt from 'components/club/SearchClubMt'
import ErrorMessage from 'components/common/ErrorMessage'
import Loading from 'components/common/Loading'
import MeetupIntroduction from 'components/meetup/MeetupIntroduction'
import { ThemeContext } from 'styles/ThemeProvider'

function ClubMainPage() {
  const { theme } = useContext(ThemeContext)

  const { data: userInfo } = useUserInfoQuery()
  const clubId = userInfo?.clubId

  const { isLoading, isError, data: clubInfo } = useClubInfoQuery(clubId || 0)

  if (isLoading) {
    return <Loading />
  }

  if (isError) {
    return <ErrorMessage />
  }

  return (
    <>
      <div className={`page-gradation upside p-md ${theme} ${styles.page}`}>
        <ClubRecordInfo
          totalMember={clubInfo.totalMember}
          totalMountainCount={clubInfo.totalMountainCount}
          totalMeetupCount={clubInfo.totalMeetupCount}
          totalAssetCount={clubInfo.totalAssetCount}
        />
        <div className={styles.intro}>
          <MeetupIntroduction content={clubInfo.description} />
        </div>
        <SearchClubMt assetInfo={clubInfo.assets} />
      </div>
    </>
  )
}

export default ClubMainPage
