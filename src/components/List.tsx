import styled from 'styled-components';
import { MouseEvent, useCallback, useContext, useMemo } from 'react';

import { useURL } from '../hooks/useURL';
import { AddOption } from './AddOption';
import { Choice, ChoiceContext } from './ChoiceContext';
// import { useChoice } from '../hooks/useChoice';

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
  // const {winningChoice} = useChoice();


  // const choiceCount = useCallback((choideId:string) => choiceCountMap.get(choideId) || 0,[choiceCountMap]);
  // const choiceCount = choiceCountMap.get(choideId) || 0;

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
    // // isWinning: boolean,
    // choiceCountMap: ChoiceMap,
    handleClick: (option: string) => (event: MouseEvent<HTMLElement>) => void
  ) {
    // const choice = choiceCountMap.get(optionId);

    // if (!choice) return null ;

    // const optionDisplay = decodeURIComponent(optionId);
    const optionDisplay = choice.label;
    // const { choiceCountMap } = useContext(ChoiceContext);

    // const choiceCount = useCallback((choideId:string) => choiceCountMap.get(choideId) || 0,[choiceCountMap]);

    // return !choice ? null : (
      return (
      <div data-testid={choiceId} key={choiceId}>
        <span title={optionDisplay}>{optionDisplay}{choice.isWinner ? '***' : ''}</span>
        <span title={optionDisplay}>({choice.count || 0})</span>
        {/* <span title={optionDisplay}>({choiceCountMap[option] || 0})</span> */}
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
    // const list = options.map((option) => {
    // return options.map((option) => {
      const listItems:JSX.Element[] = [];
      // const winner = winningChoice(choiceMap);
      choiceMap.forEach((choice,choiceId)=>{
        if(choice){
          listItems.push(ListItem(choice,choiceId,handleDeleteOptionClick));
        }
      });
      return listItems;
      // if (!option) return null;
      // return ListItem(option, choiceCountMap, handleDeleteOptionClick);
    },[choiceMap, handleDeleteOptionClick]);
  // }, [choiceCountMap, handleDeleteOptionClick, options]);

  // console.log('List: choiceCountMap', choiceCountMap);

  return (
    <>
      {/* {currentChoice ? `currentChoice: ${currentChoice}` : null} */}
      {/* {winningChoice ? `winningChoice: ${winningChoice}` : null} */}
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
