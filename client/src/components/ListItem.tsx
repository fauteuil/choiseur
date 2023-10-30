import type { MouseEvent } from "react";
import styled from "styled-components";
import type { Choice } from "./ChoiceContext";
import { Trash } from "./icons/Trash";

const ChoiceItemWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export const DeleteIcon = styled.span`
  cursor: pointer;
  font-weight: bold;
  padding-left: 1rem;
`;

export function ListItem(
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