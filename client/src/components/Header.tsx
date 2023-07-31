import styled, { css } from 'styled-components';

// import { v4 as uuidv4 } from 'uuid';
// import('dotenv').config();

import { useState } from 'react';
import { AddTopic } from './AddTopic';
import { useURL } from '../hooks/useURL';

const HeaderWrapper = styled.header`
  background-color: #333;
  color: #fff;
  height: 3.75rem;
  position: relative;
`;

const Nav = styled.nav`
  max-width: 62.5rem;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
`;

const MenuIcon = styled.div`
  display: none;
  font-size: 1.5rem;
  cursor: pointer;
  transform: rotate(90deg);
  margin-left: 0.75rem;

  @media screen and (max-width: 48rem) {
    display: block;
  }
`;

const Ul = styled.ul`
  display: flex;
  list-style: none;

  @media screen and (max-width: 48rem) {
    display: none;

    ${({ showMenu }: { showMenu: boolean }) =>
      showMenu &&
      css`
        display: flex;
        flex-direction: column;
        position: absolute;
        top: 2.75rem;
        left: 0;
        padding-right: 1rem;
        background-color: #333;
      `}
  }
`;

// const Li = styled.li`
//   margin-right: 1.25rem;

//   @media screen and (max-width: 48rem) {
//     margin-right: 0;
//   }
// `;

// const Link = styled.span`
//   color: #fff;
//   text-decoration: none;
//   padding: 0.625rem;
//   display: block;

//   @media screen and (max-width: 48rem) {
//     padding: 0.625rem;
//   }
// `;

const TopicWrapper = styled.div`
  padding: 0 1rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

// const { API_URL } = process.env.API_URL;

export function Header() {
  const [showMenu, setShowMenu] = useState(false);
  const { topic } = useURL();
  const [showTopicForm, setShowTopicForm] = useState(!topic);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };


  const handleTopicClick = () => {
    setShowTopicForm(true);
  };

  /**
   * create shortened URL to copy/share
   */
  // const handleCopyLink = async () => {
  //   const originalUrl = window.location.href;
  //   const shortenedUrl = uuidv4();


  //   const newLink = {original: originalUrl,
  //     short: shortenedUrl
  //   }

  //   const result = await fetch(
  //     'http://localhost:8888/.netlify/functions/api/add-url/',
  //     {
  //     method: 'POST',
  //     headers: {
  //       Accept: 'application.json',
  //       'Content-Type': 'application/json'
  //     },
  //     body: JSON.stringify(newLink),
  //   })
  //   console.log('handleCopyLink',result.body);
  // };

  return (
    <HeaderWrapper>
      <Nav>
        <MenuIcon onClick={toggleMenu}>
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
        </>
        <Ul showMenu={showMenu}>
          {/* <Li>
            <Link onClick={handleCopyLink}>copy link</Link>
          </Li> */}
        </Ul>
      </Nav>
    </HeaderWrapper>
  );
}
