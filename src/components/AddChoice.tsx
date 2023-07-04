import { useURL } from '../hooks/useURL';
import { ChangeEvent, FormEvent, useEffect, useRef } from 'react';
import { useState } from 'react';
import styled from 'styled-components';

interface ChoiceAddFormElements extends HTMLFormControlsCollection {
  name: HTMLInputElement;
}

interface ChoiceAddForm extends HTMLFormElement {
  elements: ChoiceAddFormElements;
}

const AddChoiceForm = styled.form`
  margin-top: 1rem;
`;
const AddChoiceButton = styled.button`
  font-weight: bold;
  border: solid 0.0625rem #6b737b;
  color: #333;
  line-height: 1.5rem;
  background-color: #fff;
  margin: 0.25rem;
`;
const AddChoiceInput = styled.input`
  margin: 0.25rem;
  line-height: 2.25rem;
  width: 12rem;
  font-size: 1rem;
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
          placeholder='Add a choice...'
        />
        <AddChoiceButton type='submit'>+</AddChoiceButton>
      </AddChoiceForm>
    </>
  );
}
