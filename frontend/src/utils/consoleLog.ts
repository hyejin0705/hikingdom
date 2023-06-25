// 개발 모드에서만 콘솔 로그를 출력하는 함수

export default function consoleLog(data: any) {
  if (process.env.NODE_ENV === 'production') return
  console.log(data)
}
