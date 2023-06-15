import styled from 'styled-components';
import {
  MouseEvent,
  MouseEventHandler,
  useCallback,
  useEffect,
  useMemo,
} from 'react';

import { useURL } from '../hooks/useURL';
import { AddOption } from './AddOption';

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
  handleClick: (option: string) => (event: MouseEvent<HTMLElement>) => void
) {
  const optionDisplay = decodeURIComponent(option);
  return (
    <div data-testid={option} key={option}>
      <span title={optionDisplay}>{optionDisplay}</span>
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

  const handleDeleteOptionClick = useCallback(
    (option: string) => (event: MouseEvent<HTMLElement>) => {
      event.preventDefault();
      removeOption(option);
    },
    [removeOption]
  );

  const list = useMemo(() => {
    return options.map((option) => {
      if (!option) return null;
      return ListItem(option, handleDeleteOptionClick);
    });
  }, [handleDeleteOptionClick, options]);

  return (
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
      <OptionListScrollWrapper>{list}</OptionListScrollWrapper>
      <AddOption />
    </OptionListWrapper>
  );
}
