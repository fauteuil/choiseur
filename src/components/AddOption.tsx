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
    margin-top: 1rem ;
`
const AddOptionInput = styled.input`
    margin: 0.25rem ;
`

export function AddOption() {
  const { addOption } = useURL();
  const [newOption, setNewOption] = useState('');
  const refOptionInput = useRef<HTMLInputElement>(null);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const inputValue = event.currentTarget.value?.trim();
    if (inputValue) {
      setNewOption(inputValue);
    }
  };

  const handleAddOption = (event: FormEvent<OptionAddForm>) => {
    event.preventDefault();
    addOption(newOption);
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
          placeholder='Add an option...'
        />
        <button type='submit'>+</button>
      </AddOptionForm>
    </>
  );
}
