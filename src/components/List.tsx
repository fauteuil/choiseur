import styled from 'styled-components';
import { MouseEvent, useCallback, useContext, useMemo } from 'react';

import { useURL } from '../hooks/useURL';
import { AddOption } from './AddOption';
import { ChoiceContext, ChoiceCountMap } from './ChoiceContext';

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
  /* max-height: 9rem; */
  height: 9rem;
  overflow: scroll;
`;

const DeleteIcon = styled.span`
  cursor: pointer;
  font-weight: bold;
  padding-left: 1rem;
`;

export function ListItem(
  option: string,
  isWinning: boolean,
  choiceCountMap: ChoiceCountMap,
  handleClick: (option: string) => (event: MouseEvent<HTMLElement>) => void
) {
  const optionDisplay = decodeURIComponent(option);
  // const { choiceCountMap } = useContext(ChoiceContext);

  // const choiceCount = useCallback((choideId:string) => choiceCountMap.get(choideId) || 0,[choiceCountMap]);

  return (
    <div data-testid={option} key={option}>
      <span title={optionDisplay}>{optionDisplay}{isWinning ? '*' : ''}</span>
      <span title={optionDisplay}>({choiceCountMap.get(option) || 0})</span>
      {/* <span title={optionDisplay}>({choiceCountMap[option] || 0})</span> */}
      <DeleteIcon
        title={`delete ${optionDisplay}`}
        onClick={handleClick(option)}
      >
        X
      </DeleteIcon>
    </div>
  );
}

export function List() {
  const { options, removeAllOptions, removeOption } = useURL();

  const handleDeleteAllOptionsClick = () => {
    removeAllOptions();
  };

  const { choiceCountMap, winningChoice } = useContext(ChoiceContext);

  // const choiceCount = useCallback((choideId:string) => choiceCountMap.get(choideId) || 0,[choiceCountMap]);
  // const choiceCount = choiceCountMap.get(choideId) || 0;

  const handleDeleteOptionClick = useCallback(
    (option: string) => (event: MouseEvent<HTMLElement>) => {
      event.preventDefault();
      removeOption(option);
    },
    [removeOption]
  );

  const list = useMemo(() => {
    // const list = options.map((option) => {
    return options.map((option) => {
      if (!option) return null;
      return ListItem(option, (option === winningChoice), choiceCountMap, handleDeleteOptionClick);
    });
  }, [choiceCountMap, handleDeleteOptionClick, options, winningChoice]);

  console.log('List: choiceCountMap', choiceCountMap);

  return (
    <>
      {/* {currentChoice ? `currentChoice: ${currentChoice}` : null} */}
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
          {list}
          {/* {options.map((option) => {
          if (!option) return null;
          return ListItem(option, choiceCountMap.get(option) || 0, handleDeleteOptionClick);
        })} */}
        </OptionListScrollWrapper>
        <AddOption />
      </OptionListWrapper>
    </>
  );
}
