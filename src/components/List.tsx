import styled from 'styled-components';
import { MouseEvent, useCallback, useMemo } from 'react';

import { useURL } from '../hooks/useURL';
import { AddOption } from './AddOption';

const OptionListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1rem;
`;

const DeleteIcon = styled.span`
  cursor: pointer;
  font-weight: bold;
  padding-left: 1rem;
`;

export function List() {
  const { options, removeOption } = useURL();

  const handleDeleteOptionClick = useCallback(
    (option: string) => (event: MouseEvent<HTMLElement>) => {
      event.preventDefault();
      removeOption(option);
    },
    [removeOption]
  );

  const list = useMemo(() => {
    return options.map((option) => (!option ? null :
      <div data-testid={option} key={option}>
        <span>{option}</span>
        <DeleteIcon
          title={`delete ${option}`}
          onClick={handleDeleteOptionClick(option)}
        >
          X
        </DeleteIcon>
      </div>
    ));
  }, [handleDeleteOptionClick, options]);

  return (
    <OptionListWrapper>
      <div>The Options:</div>
      {list}
      <AddOption />
    </OptionListWrapper>
  );
}
