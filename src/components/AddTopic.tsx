import styled from 'styled-components';

import { ChangeEvent, FormEvent, useRef, useState } from 'react';

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
  font-weight: bold;
  border: solid 0.0625rem #6b737b;
  color: #333;
  line-height: 1.5rem;
  background-color: #fff;
  margin: 0.25rem;
`;
const AddTopicInput = styled.input`
  margin: 0.25rem;
  line-height: 2.25rem;
  width: 12rem;
  font-size: 1rem;
`;


export function AddTopic() {
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

  return (
    <>
      {!topic ? (
        <AddTopicForm onSubmit={handleAddTopic}>
          <AddTopicInput
            ref={refTopicInput}
            type='text'
            onChange={handleChange}
            placeholder={'add topic...'}
            value={newTopic}
          />
          <AddTopicButton type='submit'>+</AddTopicButton>
        </AddTopicForm>
      ) : (
null
      )}
    </>
  );
}
