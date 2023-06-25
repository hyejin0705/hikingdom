import React from 'react'

import './index.scss'
import App from './App'
import reportWebVitals from './reportWebVitals'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { RecoilRoot } from 'recoil'

import { AxiosInterceptor } from 'apis/AxiosInterceptor'
import ThemeProvider from 'styles/ThemeProvider'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 0, // 재시도 횟수
      retryDelay: 1000, // 재시도 간격
      refetchOnWindowFocus: false, // focus시 refetch 방지
    },
  },
})

root.render(
  // <React.StrictMode>
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <RecoilRoot>
        <AxiosInterceptor>
          <ThemeProvider>
            <App />
          </ThemeProvider>
        </AxiosInterceptor>
      </RecoilRoot>
    </BrowserRouter>
    <ReactQueryDevtools initialIsOpen={false} />
  </QueryClientProvider>
  // </React.StrictMode>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
