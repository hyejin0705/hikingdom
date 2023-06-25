import React, { useContext, useState } from 'react'

import styles from './SearchLayout.module.scss'

import { Outlet } from 'react-router'
import { useNavigate, useLocation } from 'react-router-dom'

import SearchBar from 'components/common/SearchBar'
import { ThemeContext } from 'styles/ThemeProvider'

function SearchLayout() {
  const navigate = useNavigate()
  const { theme } = useContext(ThemeContext)

  const queryClient = new URLSearchParams(useLocation().search)
  const query = queryClient.get('query') || ''
  const [value, setValue] = useState(query) // 서치바의 값

  // 서치바 onChange시 동작할 함수
  // 서치바의 value가 없을 경우, 메인페이지
  // 서치바의 value가 있을 경우, 서치페이지
  function onChange(event: React.ChangeEvent<HTMLInputElement>) {
    setValue(event.target.value)
    if (event.target.value) {
      navigate(`/main/search?query=${event.target.value}`)
    } else {
      navigate(`/main`)
    }
  }

  return (
    <div className={`page ${theme} ${styles.container}`}>
      <div className={`p-md ${styles.searchbar}`}>
        <SearchBar
          value={value}
          placeholder="산을 검색해보세요"
          onChange={onChange}
        />
      </div>
      <Outlet context={{ value }} />
    </div>
  )
}

export default SearchLayout
