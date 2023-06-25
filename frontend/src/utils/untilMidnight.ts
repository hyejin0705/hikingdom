/* 자정까지 남은 시간을 초로 반환하는 함수 */

export function untilMidnight(): number {
  // 현재 시간
  const currentDate = new Date()

  // 자정 시간
  const midnight = new Date()
  midnight.setHours(24)
  midnight.setMinutes(0)
  midnight.setSeconds(0)
  midnight.setMilliseconds(0)

  // 자정시간 - 현재시간
  const remainingSeconds = Math.floor(
    (midnight.getTime() - currentDate.getTime()) / 1000
  )

  return remainingSeconds * 1000
}
