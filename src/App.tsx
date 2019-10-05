import React from 'react';
import styled from '@emotion/styled';
import Header from './Header';
import JobMap from './JobMap';

const ThemeProvider = styled.div({
  color: 'blue'
});

const App: React.FC = () => <ThemeProvider>
  <Header />
  <JobMap></JobMap>
</ThemeProvider>;

export default App;
