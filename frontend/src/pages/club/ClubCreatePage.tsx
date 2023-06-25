import React, { useContext } from 'react'

import CreateClubForm from 'components/club/CreateClubForm'
import { ThemeContext } from 'styles/ThemeProvider'

function ClubCreatePage() {
  const { theme } = useContext(ThemeContext)

  return (
    <div className={`page p-lg ${theme}`}>
      <CreateClubForm />
    </div>
  )
}

export default ClubCreatePage
