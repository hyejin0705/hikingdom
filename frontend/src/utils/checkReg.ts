/* (데이터 타입, 값)을 전달 받아 (정규식 결과, 정규식 조건)를 반환하는 함수 */

// 정규식 객체 모음
const REG_EXP = {
  email: {
    pattern: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
    condition: 'hiking@example.com',
  },
  nickname: {
    pattern: /^[ㄱ-ㅎ가-힣a-zA-Z0-9]{2,16}$/,
    condition: '2~16자 한글, 영어, 숫자 조합',
  },
  password: {
    pattern:
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@!%*#?&~()])[A-Za-z\d$@!%*#?&~()]{8,16}$/,
    condition: '8~16자, 영어, 숫자, 특수문자 포함',
  },
  code: {
    pattern: /^\d{6}$/,
    condition: '6자리 숫자',
  },
  name: {
    pattern: /[ㄱ-ㅎ가-힣a-zA-Z0-9]{1,20}/,
    condition: '20자 이내',
  },
}

// 반환 타입
type checkExpReturns = {
  result: boolean // 정규식 테스트 결과
  condition: string // 정규식 조건
}

// 정규식 테스트 함수
export default function checkReg(
  type: 'email' | 'nickname' | 'password' | 'code',
  value: string
): checkExpReturns {
  const { pattern, condition } = REG_EXP[type]
  const result = pattern.test(value) //정규식 테스트

  return { result, condition }
}
