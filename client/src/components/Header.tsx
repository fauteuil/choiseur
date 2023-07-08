import styled, { css } from 'styled-components';
import { useState } from 'react';
import { AddTopic } from './AddTopic';
import { useURL } from '../hooks/useURL';

const HeaderWrapper = styled.header`
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
  transform: rotate(90deg);
  margin-left: 0.75rem;

  @media screen and (max-width: 48rem) {
    // 768px / 16px = 48rem
    display: block;
  }
`;

// const DeleteTopicIcon = styled(DeleteIcon)`
//   margin-right: 0.5rem;
// `;

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
        /* top: 3.75rem; // 60px / 16px = 3.75rem */
        top: 2.75rem; // 60px / 16px = 3.75rem
        left: 0;
        /* width: 100%; */
        padding-right: 1rem;
        background-color: #333;
      `}
  }
`;

const Li = styled.li`
  margin-right: 1.25rem; // 20px / 16px = 1.25rem

  @media screen and (max-width: 48rem) {
    // 768px / 16px = 48rem
    margin-right: 0;
    /* margin-bottom: 0.625rem; // 10px / 16px = 0.625rem */
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

const TopicWrapper = styled.div`
  padding: 0 1rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export function Header() {
  const [showMenu, setShowMenu] = useState(false);
  const { topic } = useURL();
  const [showTopicForm, setShowTopicForm] = useState(!topic);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  // const handleClearTopic = () => {
  //   addTopic('');
  //   setShowTopicForm(true);
  // };

  const handleTopicClick = () => {
    setShowTopicForm(true);
  };

  return (
    <HeaderWrapper>
      <Nav>
        <MenuIcon onClick={toggleMenu}>
          {/* <i className='fa fa-bars'>menu</i>*/}
          |||
        </MenuIcon>
        <>
          <TopicWrapper>
            {showTopicForm || !topic ? (
              <AddTopic />
            ) : (
              <span onClick={handleTopicClick}>{topic}</span>
            )}
            {/* <DeleteTopicIcon title={`clear topic`} onClick={handleClearTopic}>
                {`X`}
              </DeleteTopicIcon> */}
          </TopicWrapper>
          <div></div>

          {/* <DeleteTopicIcon title={`clear topic`} onClick={handleClearTopic}>
              {`X`}
            </DeleteTopicIcon> */}
        </>
        <Ul showMenu={showMenu}>
          {/* <Li>
            <AddTopic />
          </Li> */}
          <Li>
            <A href='#'>copy link</A>
          </Li>
          {/*<Li>
            <A href='#'>Activities</A>
          </Li>
          <Li>
            <A href='#'>Feed</A>
          </Li> */}
        </Ul>
      </Nav>
    </HeaderWrapper>
  );
}
