//  TypeScript에서 "*.mp4" 확장자를 가진 파일을 모듈로 인식하도록 선언
declare module '*.mp4' {
  const src: string
  export default src
}
