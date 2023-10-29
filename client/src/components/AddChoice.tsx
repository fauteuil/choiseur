import { useURL } from '../hooks/useURL';
import { type ChangeEvent, type FormEvent, useEffect, useRef } from 'react';
import { useState } from 'react';
import styled from 'styled-components';

interface ChoiceAddFormElements extends HTMLFormControlsCollection {
  name: HTMLInputElement;
}

interface ChoiceAddForm extends HTMLFormElement {
  elements: ChoiceAddFormElements;
}

const AddChoiceForm = styled.form`
  margin-bottom: 1rem;
`;
const AddChoiceButton = styled.button`
  /* line-height: 1.5rem; */
  background-color: #fff;
  border-radius: 0.25rem;
  border: solid 0.0625rem #6b737b;
  color: #6b737b;
  font-weight: bold;
  line-height: 2rem;
  margin: 0.25rem;
`;
const AddChoiceInput = styled.input`
  border-radius: 0.25rem;
  border: solid 0.0625rem #6b737b;
  font-size: 1rem;
  line-height: 2rem;
  margin: 0.25rem;
  width: 12rem;
`;

export function AddChoice() {
  const { addChoice } = useURL();
  const [newChoice, setNewChoice] = useState('');
  const refChoiceInput = useRef<HTMLInputElement>(null);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const inputValue = event.currentTarget.value?.trim() || '';
    if (inputValue) {
      setNewChoice(inputValue);
    }
  };

  const handleAddChoice = (event: FormEvent<ChoiceAddForm>) => {
    event.preventDefault();
    addChoice(encodeURIComponent(newChoice));
    if (refChoiceInput.current) {
      refChoiceInput.current?.focus();
    }
  };

  useEffect(() => {
    if (refChoiceInput.current) {
      refChoiceInput.current?.focus();
    }
  }, []);

  return (
    <>
      <AddChoiceForm onSubmit={handleAddChoice}>
        <AddChoiceInput
          ref={refChoiceInput}
          type='text'
          onChange={handleChange}
          placeholder='add a choice...'
        />
        <AddChoiceButton type='submit'>+</AddChoiceButton>
      </AddChoiceForm>
    </>
  );
}
