import { useState } from 'react';
// import './App.css'

import styled, { css } from 'styled-components';
import { List } from './components/List';
import { Details } from './components/Details';
// import { CenteredLayoutContainer, CenteredLayoutContent } from './components/CenteredLayoutContainer';

const AppContainer = styled.div`
  max-width: 62.5rem; // 1000px / 16px = 62.5rem
  /* margin: 2rem auto; // 20px / 16px = 1.25rem */
  display: flex;

  @media screen and (max-width: 48rem) {
    // 768px / 16px = 48rem
    flex-direction: column-reverse;
    /* flex-direction: column; */
  }
`;

const CenteredLayoutContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const CenteredLayoutContent = styled.div`
  /* Replace the values below with the desired dimensions for your div */
  /* width: 300px;
  height: 200px; */
  /* Centering styles */
  /* position: relative; */
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const Panel = styled.div`
  flex: 1;
  padding: 0.25rem; // 20px / 16px = 1.25rem
`;

const ListPanel = styled(Panel)`
  background-color: #fff;
  min-width: 20rem;
`;

const DetailsPanel = styled(Panel)`
  background-color: #fff;
  min-width: 20rem;
`;

const Header = styled.header`
  background-color: #333;
  color: #fff;
  height: 3.75rem; // 60px / 16px = 3.75rem
  position: relative;
`;

const Nav = styled.nav`
  max-width: 62.5rem; // 1000px / 16px = 62.5rem
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
`;

const MenuIcon = styled.div`
  display: none;
  font-size: 1.5rem; // 24px / 16px = 1.5rem
  cursor: pointer;

  @media screen and (max-width: 48rem) {
    // 768px / 16px = 48rem
    display: block;
  }
`;

const Ul = styled.ul`
  display: flex;
  list-style: none;

  @media screen and (max-width: 48rem) {
    // 768px / 16px = 48rem
    display: none;

    ${({ showMenu }: { showMenu: boolean }) =>
    showMenu &&
    css`
        display: flex;
        flex-direction: column;
        position: absolute;
        top: 3.75rem; // 60px / 16px = 3.75rem
        left: 0;
        width: 100%;
        background-color: #333;
      `}
  }
`;

const Li = styled.li`
  margin-right: 1.25rem; // 20px / 16px = 1.25rem

  @media screen and (max-width: 48rem) {
    // 768px / 16px = 48rem
    margin-right: 0;
    margin-bottom: 0.625rem; // 10px / 16px = 0.625rem
  }
`;

const A = styled.a`
  color: #fff;
  text-decoration: none;
  padding: 0.625rem; // 10px / 16px = 0.625rem
  display: block;

  @media screen and (max-width: 48rem) {
    // 768px / 16px = 48rem
    padding: 0.625rem;
  }
`;

const Menu = () => {
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  return (
    <Header>
      <Nav>
        <Ul showMenu={showMenu}>
          <Li>
            <A href='#'>Dashboard</A>
          </Li>
          <Li>
            <A href='#'>Activities</A>
          </Li>
          <Li>
            <A href='#'>Feed</A>
          </Li>
        </Ul>
        <MenuIcon onClick={toggleMenu}>
          <i className='fa fa-bars'>menu</i>
        </MenuIcon>
      </Nav>
    </Header>
  );
};

export function App() {
  return (
    <CenteredLayoutContent>
      <AppContainer>
        {/* <Menu /> */}
        <ListPanel>
          <List />
        </ListPanel>
        <DetailsPanel>
          <Details />
        </DetailsPanel>
      </AppContainer>
    </CenteredLayoutContent>
  );
}
