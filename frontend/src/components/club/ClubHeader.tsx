import React from 'react'

import styles from './ClubHeader.module.scss'

import { NavLink, useNavigate } from 'react-router-dom'

import { useClubSimpleInfoQuery } from 'apis/services/clubs'
import { useUserInfoQuery } from 'apis/services/users'
import Chatting from 'assets/images/airplane.png'
import ErrorMessage from 'components/common/ErrorMessage'
import IconButton from 'components/common/IconButton'
import Loading from 'components/common/Loading'

function ClubHeader() {
  const navigate = useNavigate()

  const { data: userInfo } = useUserInfoQuery()
  const clubId = userInfo?.clubId

  const {
    isLoading,
    isError,
    data: clubSimpleInfo,
  } = useClubSimpleInfoQuery(clubId || 0)

  if (isLoading) {
    return <Loading />
  }

  if (isError) {
    return <ErrorMessage />
  }

  return clubSimpleInfo ? (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>{clubSimpleInfo.clubName}</h1>
        <div className={styles.chat}>
          <IconButton
            imgSrc={Chatting}
            size="sm"
            onClick={() => navigate(`/club/${clubId}/chat`)}
          />
        </div>
      </div>
      <nav className={styles.nav}>
        <NavLink
          to="main"
          className={({ isActive }) =>
            isActive ? styles.active : styles.inactive
          }
        >
          모임
        </NavLink>
        <NavLink
          to="meetup"
          className={({ isActive }) =>
            isActive ? styles.active : styles.inactive
          }
        >
          일정
        </NavLink>
        <NavLink
          to="member"
          className={({ isActive }) =>
            isActive ? styles.active : styles.inactive
          }
        >
          멤버
        </NavLink>
        <NavLink
          to="album"
          className={({ isActive }) =>
            isActive ? styles.active : styles.inactive
          }
        >
          앨범
        </NavLink>
      </nav>
    </div>
  ) : null
}

export default ClubHeader
