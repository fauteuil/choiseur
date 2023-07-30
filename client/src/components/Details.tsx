import styled, { css, keyframes } from 'styled-components';
import { useURL } from '../hooks/useURL';
import { type MouseEvent, useContext, useMemo } from 'react';
import { randomInt } from '@dmhtoo/random-int';
import randomRgba from 'random-rgba';
import { useState } from 'react';
import { ChoiceContext } from './ChoiceContext';

interface ChoiceButtonProps {
  bgColor: string;
  isChoosing?: boolean;
}

const ChoiceWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0.5rem;
`;

const ChoiceWrappable = styled.span`
  white-space: break-spaces;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const rotationKeyframes = keyframes`
0% {
  transform: rotate(0);
}
50% {
  transform: rotate(179deg) scale(1.1);
  filter: saturate(200%) ;
}
100% {
  transform: rotate(353deg);
}
`;

const ChoiceButton = styled.div<ChoiceButtonProps>`
  -webkit-align-items: center;
  align-content: center;
  align-items: center;
  animation: ${(props) =>
    props.isChoosing
      ? css`
          ${rotationKeyframes} .5s ease-in-out infinite
        `
      : 'none'};
  background-color: ${(props) => props.bgColor};
  border-radius: 0.75rem;
  border: 0.25rem solid ${randomRgba(97)};
  cursor: pointer;
  display: flex;
  flex-wrap: wrap;
  font-size: 2rem;
  font-weight: bold;
  height: 12rem;
  justify-content: center;
  justify-content: center;
  line-height: 3rem;
  margin-top: 0.5rem;
  overflow: scroll;
  padding: 1rem;
  text-align: center;
  text-overflow: ellipsis;
  width: 12rem;
`;

const DEFAULT_TEXT = {
  addChoice: '(Add 2 or more choices...)',
  instructions: 'And the choice is...',
  makeAChoice: '(Choose...)',
  needs2Choices: '(Add 1 more choice...)',
};

export function Details() {
  const { choices } = useURL();
  const [randomIndex, setRandomIndex] = useState(0);
  const [isChoosing, setIsChoosing] = useState(false);
  const [randomColor, setRandomColor] = useState(randomRgba(47));

  const { incrementChoiceCount, setClickTimestamp } = useContext(ChoiceContext);

  const currentChoice = useMemo(
    () =>
      decodeURIComponent(
        choices.length === 0
          ? DEFAULT_TEXT.addChoice
          : choices?.length === 1
          ? DEFAULT_TEXT.needs2Choices
          : choices[randomIndex]
      ),
    [choices, randomIndex]
  );

  const [selectedChoice, setSelectedChoice] = useState(
    choices.length > 1 ? DEFAULT_TEXT.makeAChoice : currentChoice
  );

  const shuffle = () => {
    setIsChoosing(true);
    setRandomIndex(randomInt(0, choices.length - 1));
    setRandomColor(randomRgba(37));
  };

  const handleShuffle = async (event: MouseEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    shuffle();
    await setTimeout(() => {
      setIsChoosing(false);
    }, 500);
    setClickTimestamp(new Date().getTime());
    setSelectedChoice(currentChoice);
    incrementChoiceCount(currentChoice);
  };

  return (
    <>
      <ChoiceWrapper>

        <ChoiceButton
          bgColor={randomColor}
          isChoosing={isChoosing}
          title={DEFAULT_TEXT.makeAChoice}
          onClick={handleShuffle}
        >
          <ChoiceWrappable>{isChoosing ? '' : selectedChoice}</ChoiceWrappable>
        </ChoiceButton>
      </ChoiceWrapper>
    </>
  );
}
