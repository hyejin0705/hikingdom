/* 숫자 형태의 minutes를 전달 받아 (HH:MM) 형태의 문자열로 반환하는 함수 */

export function convertMinutesToHHMM(minutes: number): string {
  const hours = Math.floor(minutes / 60)
  const mins = minutes % 60

  const hoursString = String(hours).padStart(2, '0')
  const minsString = String(mins).padStart(2, '0')

  return hoursString + ':' + minsString
}
