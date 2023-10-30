import styled from 'styled-components';
import { type MouseEvent, useCallback, useContext, useMemo } from 'react';

import { ChoiceContext } from './ChoiceContext';
import { useURL } from '../hooks/useURL';
import { AddChoice } from './AddChoice';
import { Trash } from './icons/Trash';
import { ListItem } from './ListItem';

const ChoiceListTitle = styled.div`
  display: flex;
  justify-content: space-between;
  font-weight: bold;
  border-bottom: solid 0.0625rem #6b737b;
`;

const ChoiceListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0.5rem 1rem;
`;



const DeleteAllWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 0.75rem;
`;

const ChoiceListScrollWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 8rem;
  overflow: scroll;
  margin-top: 0.5rem;
`;

export function List() {
  const { choices, removeAllChoices, removeChoice } = useURL();

  const handleDeleteAllChoicesClick = () => {
    removeAllChoices();
  };

  const { choiceMap } = useContext(ChoiceContext);

  const handleDeleteChoiceClick = useCallback(
    (choice: string) => (event: MouseEvent<HTMLElement>) => {
      event.preventDefault();
      removeChoice(choice);
    },
    [removeChoice]
  );


  const choiceList = useMemo(() => {
    const listItems: JSX.Element[] = [];
    choiceMap.forEach((choice, choiceId) => {
      if (choice) {
        listItems.push(ListItem(choice, choiceId, handleDeleteChoiceClick));
      }
    });
    return listItems;
  }, [choiceMap, handleDeleteChoiceClick]);

  return (
    <>
      <ChoiceListWrapper>
        <ChoiceListTitle>
          <AddChoice />
          <span>{` `}</span>
          {!choices?.length ? null : (
            <DeleteAllWrapper title={`delete ALL`}>
              <Trash
                title={`delete ALL`}
                onClick={handleDeleteAllChoicesClick}
              />
              (ALL)
            </DeleteAllWrapper>
          )}
        </ChoiceListTitle>
        <ChoiceListScrollWrapper>{choiceList}</ChoiceListScrollWrapper>
      </ChoiceListWrapper>
    </>
  );
}
