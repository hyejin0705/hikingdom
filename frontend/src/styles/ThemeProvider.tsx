import React, { useMemo, useCallback, createContext } from 'react'

import { useRecoilState } from 'recoil'

import { themeState } from 'recoil/atoms'

interface Props {
  children: React.ReactNode
}

// Context 생성
export const ThemeContext = createContext({
  theme: 'light',
  toggleTheme: () => {},
})

// Context API로 theme과 toggleTheme을 하위 컴포넌트에 내려줌
export default function ThemeProvider({ children }: Props) {
  const [theme, setTheme] = useRecoilState(themeState)
  const toggleTheme = useCallback(() => {
    setTheme((theme) => {
      return theme === 'light' ? 'dark' : 'light'
    })
  }, [])

  // SonarQube에 권고에 따라 추가
  const contextValue = useMemo(
    () => ({
      theme,
      toggleTheme,
    }),
    [theme, toggleTheme]
  )

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  )
}
