import React from 'react'

import MeetupReviewItem from './MeetupReviewItem'
import styles from './MeetupReviewList.module.scss'
import { MeetupReview } from 'types/meetup.interface'

type MeetupReviewsProps = {
  reviewInfo: MeetupReview[]
  clubId: number
  meetupId: number
}

function MeetupReviewList({
  reviewInfo,
  clubId,
  meetupId,
}: MeetupReviewsProps) {
  return reviewInfo.length ? (
    <div className={styles.reviews}>
      {reviewInfo.map((review) => (
        <MeetupReviewItem
          key={review.reviewId}
          review={review}
          clubId={clubId}
          meetupId={meetupId}
        />
      ))}
    </div>
  ) : (
    <div className={styles.blank}>등록된 후기가 없습니다</div>
  )
}

export default MeetupReviewList
