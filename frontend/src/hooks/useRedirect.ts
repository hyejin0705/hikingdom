import { useMemo } from 'react'

import { useNavigate } from 'react-router-dom'

// 인자값이 하나라도 양의 정수로 형변환 되지 않을 때 404로 redirect하는 커스텀 훅

function useRedirect(...args: (string | number)[]) {
  const navigate = useNavigate()

  // args 배열을 숫자로 형변환, 양의 정수가 아닐 경우 NaN로 형변환
  const parsedArgs = useMemo(
    () =>
      args.map((arg) => {
        const parsedArg = Number(arg)
        if (!Number.isInteger(parsedArg) || parsedArg < 1) {
          return NaN
        }
        return parsedArg
      }),
    [navigate, ...args]
  )

  // 형변환 결과에 하나라도 NaN이 있을 경우 404로 redirect
  if (parsedArgs.includes(NaN)) {
    navigate('/404')
  }

  // 숫자로 변환된 args 배열을 반환
  return parsedArgs
}

export default useRedirect

// parseInt로 하지 않은 이유
// 1. parseInt는 인자 타입이 무조건 string 이어야 한다
// 2. 문자열을 number로 형변환시 float 형식일 때 ex) 1.1 => 1로 간주
// 3. 문자열의 시작이 숫자인 경우 ex) 1가나다 => 1로 간주
