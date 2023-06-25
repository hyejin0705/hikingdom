import React from 'react'

import styles from './NavigationBar.module.scss'
import { UserInfo } from 'types/user.interface'

import {
  IoPeopleOutline,
  IoHomeOutline,
  IoPodiumOutline,
} from 'react-icons/io5'
import { NavLink } from 'react-router-dom'

type NavigationBarProps = {
  userInfo: UserInfo
}

function NavigationBar({ userInfo }: NavigationBarProps) {
  return (
    <nav className={styles.nav}>
      <NavLink
        to="/main"
        className={({ isActive }) =>
          isActive ? styles.active : styles.inactive
        }
      >
        <IoHomeOutline />
      </NavLink>
      <NavLink
        to="/rank"
        className={({ isActive }) =>
          isActive ? styles.active : styles.inactive
        }
      >
        {' '}
        <IoPodiumOutline />
      </NavLink>
      <NavLink
        to={userInfo?.clubId ? `/club/${userInfo?.clubId}/main` : '/club/none'}
        className={({ isActive }) =>
          isActive ? styles.active : styles.inactive
        }
      >
        <IoPeopleOutline />
      </NavLink>
      <NavLink
        to={`/profile/${userInfo.nickname}`}
        className={({ isActive }) =>
          isActive ? styles.active : styles.inactive
        }
      >
        <img src={userInfo.profileUrl} />
      </NavLink>
    </nav>
  )
}

export default NavigationBar

// <div className={styles.nav}>
//   <IconButton
//     icon={<IoPodiumOutline />}
//     color="gray"
//     onClick={() => navigate('/rank')}
//   />
//   <IconButton
//     icon={<IoHomeOutline />}
//     onClick={() => navigate('/main')}
//   />
//   <IconButton icon={<IoPeopleOutline />} onClick={onClickToClub} />
//   <IconButton
//     imgSrc={userInfo.profileUrl}
//     onClick={() => navigate(`/profile/${userInfo.nickname}`)}
//   />
// </div>
