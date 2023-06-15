import { useURL } from '../hooks/useURL';
import { ChangeEvent, FormEvent, useEffect, useRef } from 'react';
import { useState } from 'react';
import styled from 'styled-components';

interface OptionAddFormElements extends HTMLFormControlsCollection {
  name: HTMLInputElement;
  // time: HTMLInputElement;
}

interface OptionAddForm extends HTMLFormElement {
  //  readonly elements: FormElements
  elements: OptionAddFormElements;
}

const AddOptionForm = styled.form`
  margin-top: 1rem;
`;
const AddOptionButton = styled.button`
  font-weight: bold;
  border: solid 0.0625rem #6b737b;
  color: #333;
  line-height: 1.5rem;

  margin: 0.25rem;
`;
const AddOptionInput = styled.input`
  margin: 0.25rem;
  line-height: 2.25rem;
  min-width: 13rem;
  font-size: 1rem;
`;

export function AddOption() {
  const { addOption } = useURL();
  const [newOption, setNewOption] = useState('');
  const refOptionInput = useRef<HTMLInputElement>(null);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const inputValue = event.currentTarget.value?.trim() || '';
    if (inputValue) {
      setNewOption(inputValue);
    }
  };

  const handleAddOption = (event: FormEvent<OptionAddForm>) => {
    event.preventDefault();
    addOption(encodeURIComponent(newOption));
    if (refOptionInput.current) {
      refOptionInput.current?.focus();
    }
  };

  useEffect(() => {
    if (refOptionInput.current) {
      refOptionInput.current?.focus();
    }
  }, []);

  return (
    <>
      <AddOptionForm onSubmit={handleAddOption}>
        <AddOptionInput
          ref={refOptionInput}
          type='text'
          onChange={handleChange}
          placeholder='Add a choice...'
        />
        <AddOptionButton type='submit'>+</AddOptionButton>
      </AddOptionForm>
    </>
  );
}
