import React, { useEffect } from 'react'

import styles from './HikingDetail.module.scss'

import { AiOutlineClockCircle } from 'react-icons/ai'
import { BiCalendarAlt } from 'react-icons/bi'
import { useParams } from 'react-router'

import { useHikingDetailQuery } from 'apis/services/users'
import IconText from 'components/common/IconText'
import Loading from 'components/common/Loading'
import { convertMinutesToKorean } from 'utils/converMinutesToKorean'
import { convertMeterToKm } from 'utils/convertMeterToKm'

type HikingDetailProps = {
  hikingRecordId: number
  isandroid?: boolean
}

function HikingDetail({
  hikingRecordId,
  isandroid = false,
}: HikingDetailProps) {
  const { nickname } = useParams() as { nickname: string }
  const { data: detailRecord } = useHikingDetailQuery(nickname, hikingRecordId)

  useEffect(() => {
    if (!detailRecord) {
      return
    }

    const { kakao } = window

    // 경로 정보
    const route = detailRecord.gpsRoute.gpsRoute

    const linePath: any = []
    let totalLat = 0
    let totalLng = 0

    route.forEach((path) => {
      linePath.push(new kakao.maps.LatLng(path.lat, path.lng))
      totalLat += path.lat
      totalLng += path.lng
    })

    const startImageSrc =
      'https://lightnsalt.s3.ap-northeast-2.amazonaws.com/blue_pin.png' // 마커이미지의 주소입니다
    const endImageSrc =
      'https://lightnsalt.s3.ap-northeast-2.amazonaws.com/red_pin.png' // 마커이미지의 주소입니다
    const imageSize = new kakao.maps.Size(35, 35) // 마커이미지의 크기입니다

    const startMarkerImage = new kakao.maps.MarkerImage(
      startImageSrc,
      imageSize
    )
    const endMarkerImage = new kakao.maps.MarkerImage(endImageSrc, imageSize)

    const startMarker = new kakao.maps.Marker({
      position: linePath[0],
      image: startMarkerImage,
    })

    const endMarker = new kakao.maps.Marker({
      position: linePath[route.length - 1],
      image: endMarkerImage,
    })

    // 지도 그리는 정보
    const container = document.getElementById('map')
    const options = {
      center: new kakao.maps.LatLng(
        totalLat / route.length,
        totalLng / route.length
      ),
      level: 6,
    }
    const map = new kakao.maps.Map(container, options)

    // 선그리기
    const polyline: any = new kakao.maps.Polyline({
      path: linePath, // 선을 구성하는 좌표배열 입니다
      strokeWeight: 5, // 선의 두께 입니다
      strokeColor: '#000000', // 선의 색깔입니다
      strokeOpacity: 0.7, // 선의 불투명도 입니다 1에서 0 사이의 값이며 0에 가까울수록 투명합니다
      strokeStyle: 'solid', // 선의 스타일입니다
    })

    startMarker.setMap(map)
    endMarker.setMap(map)
    polyline.setMap(map)
  }, [detailRecord])

  const paddingClass = isandroid ? null : styles.padding

  return detailRecord ? (
    <div className={`${styles.container} ${paddingClass}`}>
      {!isandroid && (
        <p className={styles.title}>{detailRecord.mountainName} 트래킹 기록</p>
      )}

      <div className={`${styles.flexbox} ${styles.gap}`}>
        <IconText
          icon={<BiCalendarAlt className={styles.icon} />}
          text={detailRecord.startAt.split(' ')[0].replaceAll('-', '.')}
          size="sm"
        />
        <IconText
          icon={<AiOutlineClockCircle className={styles.icon} />}
          text={detailRecord.startAt.split(' ')[1]}
          size="sm"
        />
      </div>

      {/* Kakaomap 띄우기 id를 map으로 해줘야 뜬다 */}
      <div id="map" className={styles.map}></div>

      {/* 트레킹 기록 */}
      <div className={styles.flexbox}>
        {/* 거리 */}
        <Info
          title="거리"
          content={convertMeterToKm(detailRecord.totalDistance) + 'km'}
        />

        {/* 높이 */}
        <Info
          title="높이"
          content={convertMeterToKm(detailRecord.maxAlt) + 'km'}
        />

        {/* 시간 */}
        <Info
          title="시간"
          content={convertMinutesToKorean(detailRecord.totalDuration)}
        />
      </div>
    </div>
  ) : (
    <Loading />
  )
}

type InfoProps = {
  title: string
  content: string
}

function Info({ title, content }: InfoProps) {
  return (
    <div className={styles.item}>
      <span className={styles.itemTitle}>{title}</span>
      <span className={styles.itemContent}>{content}</span>
    </div>
  )
}

export default HikingDetail
