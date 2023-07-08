import styled from 'styled-components';
import { MouseEvent, useCallback, useContext, useMemo } from 'react';

import { Choice, ChoiceContext } from './ChoiceContext';
import { useURL } from '../hooks/useURL';
import { AddChoice } from './AddChoice';

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

const ChoiceListScrollWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 8rem;
  overflow: scroll;
`;

export const DeleteIcon = styled.span`
  cursor: pointer;
  font-weight: bold;
  padding-left: 1rem;
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

  function ListItem(
    choice: Choice,
    choiceId: string,
    handleClick: (choice: string) => (event: MouseEvent<HTMLElement>) => void
  ) {
    const choiceDisplay = choice.label;
    return (
      <div data-testid={choiceId} key={choiceId}>
        <span title={choiceDisplay}>{choiceDisplay}</span>
        <span title={choiceDisplay}>
          ({choice.count || 0}) {choice.isWinner ? '*' : ''}
        </span>
        <DeleteIcon
          title={`delete ${choiceDisplay}`}
          onClick={handleClick(choiceId)}
        >
          X
        </DeleteIcon>
      </div>
    );
  }

  const renderList = useMemo(() => {
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
          Choices:
          {!choices?.length ? null : (
            <DeleteIcon
              title={`delete ALL`}
              onClick={handleDeleteAllChoicesClick}
            >
              X (ALL)
            </DeleteIcon>
          )}
        </ChoiceListTitle>
        <ChoiceListScrollWrapper>{renderList}</ChoiceListScrollWrapper>
        <AddChoice />
      </ChoiceListWrapper>
    </>
  );
}
