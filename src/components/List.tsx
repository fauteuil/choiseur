import styled from 'styled-components';
import { MouseEvent, useCallback, useContext, useMemo } from 'react';

import { useURL } from '../hooks/useURL';
import { AddOption } from './AddOption';
import { Choice, ChoiceContext } from './ChoiceContext';

const OptionListTitle = styled.div`
  display: flex;
  justify-content: space-between;
  font-weight: bold;
  border-bottom: solid 0.0625rem #6b737b;
`;

const OptionListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0.5rem 1rem;
`;

const OptionListScrollWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 11rem;
  overflow: scroll;
`;

const DeleteIcon = styled.span`
  cursor: pointer;
  font-weight: bold;
  padding-left: 1rem;
`;

export function List() {
  const { options, removeAllOptions, removeOption } = useURL();

  const handleDeleteAllOptionsClick = () => {
    removeAllOptions();
  };

  const { choiceMap } = useContext(ChoiceContext);

  const handleDeleteOptionClick = useCallback(
    (option: string) => (event: MouseEvent<HTMLElement>) => {
      event.preventDefault();
      removeOption(option);
    },
    [removeOption]
  );

  function ListItem(
    choice: Choice,
    choiceId: string,
    handleClick: (option: string) => (event: MouseEvent<HTMLElement>) => void
  ) {
    const optionDisplay = choice.label;
      return (
      <div data-testid={choiceId} key={choiceId}>
        <span title={optionDisplay}>{optionDisplay}</span>
        <span title={optionDisplay}>({choice.count || 0}) {choice.isWinner ? '*' : ''}</span>
        <DeleteIcon
          title={`delete ${optionDisplay}`}
          onClick={handleClick(choiceId)}
        >
          X
        </DeleteIcon>
      </div>
    );
  }

  const renderList = useMemo(() => {
      const listItems:JSX.Element[] = [];
      choiceMap.forEach((choice,choiceId)=>{
        if(choice){
          listItems.push(ListItem(choice,choiceId,handleDeleteOptionClick));
        }
      });
      return listItems;
    },[choiceMap, handleDeleteOptionClick]);

  return (
    <>
      <OptionListWrapper>
        <OptionListTitle>
          Choices:
          {!options?.length ? null : (
            <DeleteIcon
              title={`delete ALL`}
              onClick={handleDeleteAllOptionsClick}
            >
              X (ALL)
            </DeleteIcon>
          )}
        </OptionListTitle>
        <OptionListScrollWrapper>
          {renderList}
        </OptionListScrollWrapper>
        <AddOption />
      </OptionListWrapper>
    </>
  );
}
