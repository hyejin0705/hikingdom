import './App.scss'
import React from 'react'

import { Routes, Route } from 'react-router-dom'

// Common
import WebMargin from 'components/common/WebMargin'
// Auth
import AgreePage from 'pages/auth/AgreePage'
import FindPwPage from 'pages/auth/FindPwPage'
import IndexPage from 'pages/auth/IndexPage'
import LoginPage from 'pages/auth/LoginPage'
import PolicyPage from 'pages/auth/PolicyPage'
import SignupPage from 'pages/auth/SignupPage'
// Club
import ClubAlbumPage from 'pages/club/ClubAlbumPage'
import ClubChatPage from 'pages/club/ClubChatPage'
import ClubCreatePage from 'pages/club/ClubCreatePage'
import ClubDetailPage from 'pages/club/ClubDetailPage'
import ClubHeaderPage from 'pages/club/ClubHeaderPage'
import ClubMainPage from 'pages/club/ClubMainPage'
import ClubMeetupPage from 'pages/club/ClubMeetupPage'
import ClubMemberPage from 'pages/club/ClubMemberPage'
import ClubNoneExistPage from 'pages/club/ClubNoneExistPage'
import CreateMeetupPage from 'pages/club/CreateMeetupPage'
import MeetupDetailPage from 'pages/club/MeetupDetailPage'
import SearchClubPage from 'pages/club/SearchClubPage'
// Main
import MainPage from 'pages/main/MainPage'
import MtDetailPage from 'pages/main/MtDetailPage'
import SearchLayout from 'pages/main/SearchLayout'
import SearchMtPage from 'pages/main/SearchMtPage'
// MyPage
import NotFoundPage from 'pages/NotFoundPage'
import PrivateRoute from 'pages/PrivateRoute'
import AlarmPage from 'pages/profile/AlarmPage'
import HikingDetailPage from 'pages/profile/HikingDetailPage'
import ProfilePage from 'pages/profile/ProfilePage'
import UpdateProfilePage from 'pages/profile/UpdateProfilePage'
// Rank
import RankPage from 'pages/rank/RankPage'

function App() {
  return (
    <Routes>
      <Route path="/" element={<WebMargin />}>
        <Route path="" element={<IndexPage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="signup" element={<SignupPage />} />
        <Route path="agreement" element={<AgreePage />} />
        <Route path="password" element={<FindPwPage />} />
        <Route path="policy" element={<PolicyPage />} />
        <Route element={<PrivateRoute />}>
          {/* 메인 */}
          <Route path="/main" element={<SearchLayout />}>
            <Route path="" element={<MainPage />} />
            <Route path="search" element={<SearchMtPage />} />
          </Route>
          <Route
            path="/mountain/:mountainId/detail"
            element={<MtDetailPage />}
          />
          {/* 순위 */}
          <Route path="/rank" element={<RankPage />} />
          {/* 모임 */}
          <Route path="/club/search" element={<SearchClubPage />} />
          <Route path="/club/create" element={<ClubCreatePage />} />
          <Route path="/club/:clubId/detail" element={<ClubDetailPage />} />
          <Route path="/club/none" element={<ClubNoneExistPage />} />
          <Route path="/club/:clubId/chat" element={<ClubChatPage />} />
          <Route
            path="/club/:clubId/meetup/create"
            element={<CreateMeetupPage />}
          />
          <Route
            path="/club/:clubId/meetup/:meetupId/detail"
            element={<MeetupDetailPage />}
          />
          <Route path="/club/:clubId/" element={<ClubHeaderPage />}>
            <Route path="main" element={<ClubMainPage />} />
            <Route path="meetup" element={<ClubMeetupPage />} />
            <Route path="member" element={<ClubMemberPage />} />
            <Route path="album" element={<ClubAlbumPage />} />
          </Route>
          {/* 마이페이지 */}
          <Route path="/profile/:nickname" element={<ProfilePage />} />
          <Route path="/profile/update" element={<UpdateProfilePage />} />
          <Route
            path="/profile/:nickname/tracking/:hikingRecordId"
            element={<HikingDetailPage />}
          />
          <Route path="/alarm" element={<AlarmPage />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  )
}

export default App
