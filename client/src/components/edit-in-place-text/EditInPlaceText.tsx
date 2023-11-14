import styled from "styled-components";
import { type ChangeEvent, useRef, useState, useEffect, type MouseEvent, useCallback, type KeyboardEvent } from 'react';
import { Save } from "../icons/Save";

const EditTextWrapper = styled.div`
display: flex;
  padding: 0 1rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const EditTextLabel = styled.span`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const EditTextInput = styled.input`
  background-color: rgb(194 205 216);
  border-radius: 0.25rem;
  border: solid #fff 0.0625rem;
  color: #6b737b;
  font-size: 1rem;
  line-height: 1.25rem;
  margin: 0 0 0 -0.2rem;
  padding-inline: revert;
  letter-spacing: 0.025rem;
`;

interface EditInPlaceTextProps {
  focusText: boolean;
  initialText: string;
  handleSave: (choice: string) => void;
}

export function EditInPlaceText({ focusText, handleSave, initialText = '' }: EditInPlaceTextProps) {
  const [focus, setFocus] = useState(focusText);
  const [textValue, setTextValue] = useState(initialText);
  const [showEditTextForm, setShowEditTextForm] = useState(!textValue);
  const refTextInput = useRef<HTMLInputElement>(null);

  const handleSaveChoice = useCallback(
    (newChoice: string) => (event: MouseEvent<HTMLElement>) => {
      event.preventDefault();
      event.stopPropagation();
      handleSave(newChoice);
    }, []);

  const handleEditTextClick = (event: MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    event.preventDefault();
    setShowEditTextForm(true);
    setFocus(true);
    if (refTextInput.current)
      refTextInput.current?.focus();
    refTextInput.current?.select();
  };

  const handleKeyPress = (event: KeyboardEvent) => {
    event.preventDefault();
    event.stopPropagation();
    const lastKey = event.key;
    // persist value on 'Enter'
    if (lastKey === 'Enter') {
      handleSave(refTextInput.current?.value || '');
      setShowEditTextForm(false);
    }
    // reset value, hide input on 'Esc'
    if (lastKey === 'Escape') {
      setShowEditTextForm(false);
      handleSave(initialText);
    }
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const inputValue = event.currentTarget.value || '';
    setTextValue(inputValue);
  };

  useEffect(() => {
    if (focus) {
      refTextInput.current?.select();
    }
  }, [focus]);

  return (

    <>
      <EditTextWrapper>
        {showEditTextForm || !textValue ? (
          <>
            <EditTextInput
              ref={refTextInput}
              type='text'
              onChange={handleInputChange}
              onKeyUp={handleKeyPress}
              placeholder={'add a topic...'}
              value={textValue} />
            <Save
              title={`Save`}
              onClick={handleSaveChoice(refTextInput.current?.value || '')}
            />
          </>
        ) : (
          <EditTextLabel onClick={handleEditTextClick}>{textValue}</EditTextLabel>
        )}
      </EditTextWrapper>
    </>
  );
}