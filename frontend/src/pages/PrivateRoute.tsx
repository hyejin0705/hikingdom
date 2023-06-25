import React from 'react'

import styles from './PrivateRoute.module.scss'

import { Navigate, Outlet } from 'react-router-dom'
import { useRecoilValue } from 'recoil'

import { useUserInfoQuery } from 'apis/services/users'
import ErrorMessage from 'components/common/ErrorMessage'
import Loading from 'components/common/Loading'
import NavigationBar from 'components/common/NavigationBar'
import useIsMobile from 'hooks/useIsMobile'
import { refreshTokenState } from 'recoil/atoms'

/*
사용자 로그인 여부에 따라 로그인페이지로 라우팅하는 컴포넌트 
*/

export default function PrivateRoute() {
  const { data: userInfo, isLoading, isError } = useUserInfoQuery() // userInfo를 해당 컴포넌트에서 불러온다.

  const isMobile = useIsMobile() // 모바일 여부 체크
  const refreshToken = useRecoilValue(refreshTokenState) // 로그인 여부 체크

  // 로그인하지 않았을 때, 라우팅
  if (!refreshToken) {
    return <Navigate to="/login" />
  }

  if (isLoading) {
    return <Loading />
  }

  if (isError) {
    return <ErrorMessage />
  }

  return (
    <>
      {isMobile ? (
        <Outlet />
      ) : (
        <div className={styles.container}>
          <Outlet />
          <NavigationBar userInfo={userInfo} />
        </div>
      )}
    </>
  )
}
