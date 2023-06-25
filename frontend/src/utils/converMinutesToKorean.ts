/* 숫자 형태의 minutes를 전달 받아 (N시간 N분) 형태의 문자열로 반환하는 함수 */

export function convertMinutesToKorean(minutes: number) {
  const hours = Math.floor(minutes / 60)
  const mins = minutes % 60

  if (hours) {
    return `${hours}시간 ${mins}분`
  } else {
    return `${mins}분`
  }
}
