import { useState, useEffect } from 'react'

/*
window 크기를 계산해서 반환하는 커스텀 훅
*/

type useWindowSizeReturns = {
  width: number // window 너비
  height: number // window  높이
}

function useWindowSize(): useWindowSizeReturns {
  // window 크기를 저장할 useState
  const [windowSize, setWindowSize] = useState({
    width: 0,
    height: 0,
  })

  // 화면 크기가 변경될 때마다 상태를 업데이트하는 useEffect 훅
  useEffect(() => {
    // 화면 크기를 가져오는 함수
    const getSize = () => {
      return {
        width: window.innerWidth,
        height: window.innerHeight,
      }
    }

    // 화면 크기가 변경될 때마다 실행할 핸들러 함수
    const handleResize = () => {
      setWindowSize(getSize())
    }

    // resize 이벤트 리스너 등록
    window.addEventListener('resize', handleResize)

    // 초기 화면 크기 설정
    handleResize()

    // 컴포넌트가 언마운트될 때 이벤트 리스너 해제
    return () => window.removeEventListener('resize', handleResize)
  }, []) // 빈 배열을 의존성으로 주어서 훅이 마운트될 때 한 번만 실행되도록 함

  // 화면 크기 상태를 반환
  return windowSize
}

export default useWindowSize
