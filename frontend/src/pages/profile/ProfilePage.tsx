import React, { useContext, useEffect } from 'react'
import { ThemeContext } from 'styles/ThemeProvider'
import styles from './ProfilePage.module.scss'
import { useParams } from 'react-router-dom'

import UserProfile from 'components/user/UserProfile'
import PastMeetupList from 'components/user/PastMeetupList'
import Loading from 'components/common/Loading'

import { UserProfileInfo } from 'types/user.interface'

import { getProfile } from 'apis/services/users'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import useUserQuery from 'hooks/useUserQuery'

function ProfilePage() {
  const { theme } = useContext(ThemeContext)
  const queryClient = useQueryClient()
  const { data: userInfo } = useUserQuery() // 유저 정보
  const { nickname } = useParams() as { nickname: string }
  const { data, isLoading, isError } = useQuery<UserProfileInfo>(
    ['userProfile'],
    () => getProfile(nickname, 5),
    { enabled: !!userInfo }
  )

  useEffect(() => {
    queryClient.invalidateQueries(['userProfile'])
  }, [nickname])

  return !userInfo || isError || isLoading ? (
    <Loading size="sm" />
  ) : (
    <div className={`page p-sm ${theme} ${styles.profile}`}>
      <UserProfile
        profileUrl={data?.profileUrl}
        nickname={data?.nickname}
        email={data?.email}
        level={data?.level}
        totalAlt={data?.totalAlt}
        totalDistance={data?.totalDistance}
        totalDuration={data?.totalDuration}
        totalHikingCount={data?.totalHikingCount}
        totalMountainCount={data?.totalMountainCount}
      />
      <div className={styles.title}>등산기록</div>
      <PastMeetupList />
    </div>
  )
}

export default ProfilePage