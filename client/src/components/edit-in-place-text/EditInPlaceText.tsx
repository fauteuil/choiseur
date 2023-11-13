import styled from "styled-components";
import { type ChangeEvent, type FocusEvent, useRef, useState, useEffect, type MouseEvent } from 'react';
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
  text: string;
  handleSave: (choice: string) => (event: MouseEvent<HTMLElement>) => void
}

export function EditInPlaceText({ focusText, handleSave, text = '' }: EditInPlaceTextProps) {
  const [focus, setFocus] = useState(focusText);
  const [textValue, setTextValue] = useState(text);
  const [showEditTextForm, setShowEditTextForm] = useState(!textValue);
  const refTextInput = useRef<HTMLInputElement>(null);
  const refSave = useRef<HTMLElement>(null);

  // const handleEditTextClick = () => {
  const handleEditTextClick = (event: MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    event.preventDefault();
    setShowEditTextForm(true);
    setFocus(true);
    if (refTextInput.current) {
      refTextInput.current?.focus();
      refTextInput.current?.select();
    }
  };

  const handleSaveClick = (event: MouseEvent<HTMLElement>) => {
    const currentValue = refTextInput.current;
    handleSave(refTextInput.current?.value || '');
  }


  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const inputValue = event.currentTarget.value || '';
    setTextValue(inputValue);
  };

  const handleBlur = (event: FocusEvent) => {
    event.stopPropagation();
    event.preventDefault();
    setShowEditTextForm(false);
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
              placeholder={'add a topic...'}
              value={textValue} />
            <Save
              title={`delete ALL`}
              onClick={handleSave(refTextInput.current?.value || '')}
            />
          </>
        ) : (
          <EditTextLabel onClick={handleEditTextClick}>{textValue}</EditTextLabel>
        )}
      </EditTextWrapper>
    </>
  );
}