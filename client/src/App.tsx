import styled from 'styled-components';
import { List } from './components/List';
import { Details } from './components/Details';
import { ChoiceProvider } from './components/ChoiceContext';
import { Header } from './components/Header';

const AppContainer = styled.div`
  color: black;

  max-width: 62.5rem; // 1000px / 16px = 62.5rem
  display: flex;

  @media screen and (max-width: 48rem) {
    flex-direction: column-reverse;
  }
`;

const CenteredLayoutContent = styled.div`
  /* base styles */
  font-family: Inter, system-ui, Avenir, Helvetica, Arial, sans-serif;
  font-size: 16px;
  line-height: 1.5;
  font-weight: 400;

  font-synthesis: none;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  -webkit-text-size-adjust: 100%;

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

  return (
    <ChoiceProvider>
      <CenteredLayoutContent>
        <Header />
        <AppContainer>
          <ListPanel>
            <List />
          </ListPanel>
          <DetailsPanel>
            <Details />
          </DetailsPanel>
        </AppContainer>
      </CenteredLayoutContent>
    </ChoiceProvider>
  );
}
