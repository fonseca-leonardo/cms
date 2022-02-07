import React from 'react';
import TopBar from '../../components/TopBar';
import { Container } from './styled';

const PageEditor: React.FC = ({ children }) => {
  return (
      <>
        <TopBar>
        </TopBar>
        <Container>
          {children}
        </Container>
      </>
  );
}

export default PageEditor;
