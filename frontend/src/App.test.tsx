import React from 'react';

import App from './App';

import { render, screen } from '@testing-library/react';

// 테스트의 목적을 간략하게 설명합니다.
test('renders learn react link', () => {
  // 준비(Arrange): 테스트 환경과 컴포넌트 렌더링을 준비합니다.
  render(<App />);

  // 실행(Act): 예상되는 링크를 찾습니다.
  const linkElement = screen.getByText(/learn react/i);

  // 검증(Assert): 문서에 필요한 링크가 있는지 확인합니다.
  expect(linkElement).toBeInTheDocument();
});
