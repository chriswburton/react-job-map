import React, { FC } from 'react';
import styled from '@emotion/styled';
import Header from './Header';
import JobMap from './JobMap';

const ThemeProvider = styled.div({
  color: 'blue'
});

const App: FC = () => <ThemeProvider>
  <Header />
  <JobMap />
</ThemeProvider>;

export default App;
