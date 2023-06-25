import React from 'react'

import styles from './SearchBar.module.scss'

import { BiSearch } from 'react-icons/bi'

type SearchBarProps = {
  value: string // input 태그 value
  placeholder: string // input 태그 placeholder
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void // input 태그 onChange시 동작 함수
}

function SearchBar({ value, placeholder, onChange }: SearchBarProps) {
  return (
    <div className={`${styles.searchbar}`}>
      <BiSearch className={`${styles.icon}`} />
      <input
        id="input"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`${styles.input}`}
      />
    </div>
  )
}

export default SearchBar
