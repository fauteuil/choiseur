import styled from 'styled-components';
import { List } from './components/List';
import { Details } from './components/Details';
import { ChoiceProvider } from './components/ChoiceContext';

const AppContainer = styled.div`
  color:black;

  max-width: 62.5rem; // 1000px / 16px = 62.5rem
  display: flex;

  @media screen and (max-width: 48rem) {
    flex-direction: column-reverse;
  }
`;

const CenteredLayoutContent = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
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
    </ChoiceProvider>
  );
}
