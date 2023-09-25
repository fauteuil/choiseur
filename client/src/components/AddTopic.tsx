import styled from 'styled-components';

import { type ChangeEvent, type FormEvent, useRef, useState, useEffect } from 'react';

import { useURL } from '../hooks/useURL';

interface TopicAddFormElements extends HTMLFormControlsCollection {
  name: HTMLInputElement;
}

interface TopicAddForm extends HTMLFormElement {
  elements: TopicAddFormElements;
}

const AddTopicForm = styled.form`
  display: flex;
`;
const AddTopicButton = styled.button`
  background-color: rgb(194 205 216);
  border: solid 0.0625rem #fff;
  border-radius: 0.25rem;
  color: #6b737b;
  font-weight: bold;
  margin: 0.25rem;
`;
const AddTopicInput = styled.input`
  background-color: rgb(194 205 216);
  border-radius: 0.25rem;
  border: solid #fff 0.0625rem;
  color: #6b737b;
  font-size: 1rem;
  line-height: 2rem;
  margin: 0.25rem;
  width: 12rem;
`;

export function AddTopic({ focusText }: { focusText: boolean }) {
  const { addTopic, topic } = useURL();
  const [newTopic, setNewTopic] = useState(topic);
  const refTopicInput = useRef<HTMLInputElement>(null);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const inputValue = event.currentTarget.value || '';
    setNewTopic(inputValue);
  };

  const handleAddTopic = (event: FormEvent<TopicAddForm>) => {
    event.preventDefault();
    addTopic(newTopic);
  };

  useEffect(() => {
    if (focusText) {
      // refTopicInput.current?.focus();
      refTopicInput.current?.select();
     }
  }, [focusText]);

  return (
    <>
      <AddTopicForm onSubmit={handleAddTopic}>
        <AddTopicInput
          ref={refTopicInput}
          type='text'
          onChange={handleChange}
          placeholder={'add a topic...'}
          value={newTopic}
        />
        <AddTopicButton type='submit'>+</AddTopicButton>
      </AddTopicForm>
    </>
  );
}
