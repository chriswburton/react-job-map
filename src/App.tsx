import React, { FC } from 'react';
import Header from './Header';
import JobMap from './JobMap';
import './App.css';
import styled from '@emotion/styled';
import tw from 'tailwind.macro';

const AppContainer = styled('div')`
  ${tw`flex flex-col h-screen`}
`;

const HeaderContainer = styled('div')`
  ${tw`flex-none h-24 bg-blue-200`}
`;

const PageContainer = styled('div')`
  ${tw`bg-purple-400`}
  // open issue with 'flex-grow'
  // https://github.com/bradlc/babel-plugin-tailwind-components/issues/32
  flex-grow: 1;
`;

const App: FC = () => <AppContainer>
  <HeaderContainer>
    <Header />
  </HeaderContainer>
  <PageContainer>
    <JobMap />
  </PageContainer>
</AppContainer>;

export default App;
