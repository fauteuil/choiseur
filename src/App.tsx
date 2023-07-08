import styled from 'styled-components';
import { List } from './components/List';
import { Details } from './components/Details';
import { ChoiceProvider } from './components/ChoiceContext';
import { Header } from './components/Header';
// import { useEffect, useState } from 'react';
// import { useState } from 'react';

const AppContainer = styled.div`
  color:black;

  max-width: 62.5rem; // 1000px / 16px = 62.5rem
  display: flex;

  @media screen and (max-width: 48rem) {
    flex-direction: column-reverse;
  }
`;

const CenteredLayoutContent = styled.div`
  /* position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%); */
  position: absolute;
    top: 0;
    left: 50%;
    transform: translate(-50%, 0);
    width: 100%;
`;

const Panel = styled.div`
  flex: 1;
`;

const ListPanel = styled(Panel)`
  background-color: #fff;
  min-width: 20rem;
`;

const DetailsPanel = styled(Panel)`
  background-color: #fff;
  min-width: 20rem;
  display: flex;
  justify-content: center;
`;

export function App() {

  // const [hello, setHello] = useState('');

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const result = await fetch(
  //       '/.netlify/functions/hello',
  //       // {
  //       //   headers: {
  //       //     Authorization: `Bearer ${token}`,
  //       //   },
  //       // }
  //     );
  //     const data = await result.json();
  //     setHello(data);
  //   };
  //   fetchData();
  // }, [setHello]);


  return (
    <ChoiceProvider>
      <CenteredLayoutContent>
        {/* {hello || 'Howdy'} */}
          <Header />
        <AppContainer>
          <ListPanel>
            <List />
          </ListPanel>
          <DetailsPanel>
            <Details />
          </DetailsPanel>
          {/* <Header /> */}
        </AppContainer>
      </CenteredLayoutContent>
    </ChoiceProvider>
  );
}
