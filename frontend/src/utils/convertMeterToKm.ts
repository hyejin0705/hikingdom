/* 숫자의 m값을 전달받아 소수점 둘째자리까지 표현되는 km 문자열을 반환*/

export function convertMeterToKm(meter: number): string {
  const km = meter / 1000
  const kmString = km.toFixed(2)
  return kmString
}
