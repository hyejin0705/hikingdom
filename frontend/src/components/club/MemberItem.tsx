import React, { useContext } from 'react'

import styles from './MemberItem.module.scss'
import { ClubMember } from 'types/club.interface'

import { useNavigate, useParams } from 'react-router-dom'

import { useAddClubMember, useRemoveClubMember } from 'apis/services/clubs'
import host from 'assets/images/host.png'
import Button from 'components/common/Button'
import Image from 'components/common/Image'
import LEVEL_TO_IMG from 'constants/levels'
import { ThemeContext } from 'styles/ThemeProvider'

type MemberItemProps = {
  memberInfo: ClubMember
  hostId?: number
  isRequest: boolean
}

function MemberItem({ memberInfo, hostId, isRequest }: MemberItemProps) {
  const navigate = useNavigate()
  const imgSrc = LEVEL_TO_IMG[memberInfo.level]
  const { theme } = useContext(ThemeContext)

  const clubId = useParams() as {
    clubId: string
  }

  // 클럽의 host 여부 판단
  const isHost = memberInfo.memberId === hostId ? null : styles.hidden

  const { mutate: addClubMember } = useAddClubMember(
    parseInt(clubId.clubId) || 0,
    memberInfo.memberId
  )
  const { mutate: removeClubMember } = useRemoveClubMember(
    parseInt(clubId.clubId) || 0,
    memberInfo.memberId
  )

  return (
    <div className={`${styles.container} ${styles[theme]}`}>
      <div
        className={styles.user}
        onClick={() => navigate(`/profile/${memberInfo.nickname}`)}
      >
        <Image imgUrl={memberInfo.profileUrl} size="sm" isSquare={true} />
        <img className={`${styles.hostImg} ${isHost}`} src={host} />
        <div className={styles.username}>
          <span>{memberInfo.nickname}</span>
          <img src={imgSrc} className={styles.level} />
        </div>
      </div>

      <div className={styles.flexbox}>
        <Info
          title="거리(km)"
          content={`${Number(
            (memberInfo.totalDistance / 1000).toFixed()
          ).toLocaleString()}`}
        />
        {isRequest ? (
          <div className={styles.button}>
            <Button
              text="거절"
              color="secondary"
              size="xs"
              onClick={() => removeClubMember()}
            />
            <Button
              text="수락"
              color="primary"
              size="xs"
              onClick={() => addClubMember()}
            />
          </div>
        ) : (
          <Info
            title="시간(h)"
            content={`${Number(
              (memberInfo.totalDuration / 60).toFixed()
            ).toLocaleString()}`}
          />
        )}
      </div>
    </div>
  )
}

type InfoProps = {
  title: string
  content: string
}

function Info({ title, content }: InfoProps) {
  return (
    <div className={styles.record}>
      <span className={styles.title}>{title}</span>
      <span className={styles.content}>{content}</span>
    </div>
  )
}

export default MemberItem
