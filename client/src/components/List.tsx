import styled from 'styled-components';
import { type MouseEvent, useCallback, useContext, useMemo } from 'react';

import { type Choice, ChoiceContext } from './ChoiceContext';
import { useURL } from '../hooks/useURL';
import { AddChoice } from './AddChoice';
import { Trash } from './icons/Trash';

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

const ChoiceItemWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
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
    const countDisplay = `${choice.count || 0}`;
    return (
      <ChoiceItemWrapper data-testid={choiceId} key={choiceId}>
        <span title={countDisplay}>
          {choiceDisplay}
          ({countDisplay}) {choice.isWinner ? '*' : ''}
        </span>

        <DeleteIcon
          title={`delete ${choiceDisplay}`}
        >
          <Trash
            title={`delete ${choiceDisplay}`}
            onClick={handleClick(choiceId)}
          />
        </DeleteIcon>
      </ChoiceItemWrapper>
    );
  }

  const renderList = useMemo(() => {
    const listItems: JSX.Element[] = [];
    // const handleTrashClick = (choice='') => handleDeleteChoiceClick(choice);
    choiceMap.forEach((choice, choiceId) => {
      if (choice) {
        listItems.push(ListItem(choice, choiceId, handleDeleteChoiceClick));
        // listItems.push(ListItem(choice, choiceId, handleTrashClick));
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
          {/* Choices: */}
          {!choices?.length ? null : (
            // <DeleteIcon
            //   title={`delete ALL`}
            //   onClick={handleDeleteAllChoicesClick}
            // >
            //   X (ALL)
            // </DeleteIcon>
            <ChoiceItemWrapper title={`delete ALL`}>
              <Trash
                title={`delete ALL`}
                onClick={handleDeleteAllChoicesClick}
              />
              (ALL)
            </ChoiceItemWrapper>
          )}
        </ChoiceListTitle>
        <ChoiceListScrollWrapper>{renderList}</ChoiceListScrollWrapper>
      </ChoiceListWrapper>
    </>
  );
}
