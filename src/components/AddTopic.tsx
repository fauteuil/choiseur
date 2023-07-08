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
  /* background-color: #fff; */
  background-color: #6b737b;
  border: solid 0.0625rem #fff;
  border-radius: 0.25rem;
  color: #333;
  color: #fff;
  font-weight: bold;
  /* line-height: 1.5rem; */
  margin: 0.25rem;
`;
const AddTopicInput = styled.input`
  background-color: #6b737b;
  border-radius: 0.25rem;
  border: solid #fff 0.0625rem;
  color: #fff;
  font-size: 1rem;
  line-height: 2.25rem;
  margin: 0.25rem;
  width: 12rem;
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
      {/* {!topic ? ( */}
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
      {/* ) : (
null
      )} */}
    </>
  );
}
