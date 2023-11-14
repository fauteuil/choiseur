import { useState, type MouseEvent, useCallback } from "react";
import styled from "styled-components";
import type { Choice } from "./ChoiceContext";
import { Delete } from "./icons/Delete";
import { EditInPlaceText } from "./edit-in-place-text/EditInPlaceText";
import { useURL } from "../hooks/useURL";

const ChoiceItemWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;
const ChoiceLabelAndScoreWrapper = styled(ChoiceItemWrapper)`
  justify-content:flex-start;
`;

export const DeleteIcon = styled.span`
  cursor: pointer;
  font-weight: bold;
  padding-left: 1rem;
`;

export function ListItem(
  { choice }: { choice: Choice },
) {
  const { removeChoice, updateChoice } = useURL();

  const { count, id: choiceId, label } = choice;
  const [showChoiceForm] = useState(!choiceId);
  const [editedChoice] = useState(label);


  const countDisplay = `${count || 0}`;

  const handleDeleteChoiceClick = useCallback(
    (choice: string) => (event: MouseEvent<HTMLElement>) => {
      event.preventDefault();
      removeChoice(choice);
    },
    [removeChoice]
  );

  const handleSaveChoice = useCallback((newChoice: string) => {
    updateChoice(editedChoice, newChoice);
    console.log('handleSaveChoice() - save ', newChoice);
  },
    [editedChoice, updateChoice]
  );

  return (
    <ChoiceItemWrapper data-testid={choiceId} key={choiceId}>
      <ChoiceLabelAndScoreWrapper>
        <EditInPlaceText focusText={showChoiceForm} handleSave={handleSaveChoice} initialText={label} />
        ({countDisplay}) {choice.isWinner ? '*' : ''}
        <DeleteIcon
          title={`delete ${label}`}
        >
        </DeleteIcon>
      </ChoiceLabelAndScoreWrapper>
      <Delete
        title={`delete ${label}`}
        onClick={handleDeleteChoiceClick(choiceId)}
      />
    </ChoiceItemWrapper >
  );
}