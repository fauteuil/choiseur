import styled from 'styled-components';
import { useURL } from '../hooks/useURL';
import { useMemo } from 'react';
import { randomInt } from '@dmhtoo/random-int';
import randomRgba from 'random-rgba';
import { useState } from 'react';

interface StylableProps {
  bgColor: string;
}

const OptionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0.5rem;
`;

const OptionStyled = styled.div<StylableProps>`
  background-color: ${(props) => props.bgColor};
  border-radius: 0.75rem;
  border: 0.25rem solid ${randomRgba(97)};
  font-size: 2rem;
  font-weight: bold;
  height: 7rem;
  line-height: 3rem;
  margin-top: 0.5rem;
  /* overflow: hidden; */
  overflow: scroll;
  /* padding: 3.5rem 1rem; */
  padding: 1rem;
  text-align: center;
  text-overflow: ellipsis;
  width: 17rem;
  /* text-wrap: nowrap; */
  /* display: flex; */
  justify-content: center;
  align-content: center;
  flex-wrap: wrap;
`;

const ShuffleButton = styled.button`
  background-color: #6b737b;
  cursor: pointer;
  color: #fff;
  font-weight: bold;
  padding-left: 1rem;
  margin-top: 1rem;
  border-radius: 1rem;
  border: 0.125rem solid #eee;
`;

const DEFAULT_TEXT = {
  addChoice: '(Add a choice...)',
  needs2Choices: '(Add ONE more choice...)',
  makeAChoice: '(Click Choose...)',
};

export function Details() {
  const [selectedOption, setSelectedOption] = useState(DEFAULT_TEXT.makeAChoice);
  const [randomIndex, setRandomIndex] = useState(0);
  const [randomColor, setRandomColor] = useState(randomRgba(37));

  const { options } = useURL();

  const shuffle = () => {
    setRandomIndex(randomInt(0, options.length - 1));
    setRandomColor(randomRgba(37));
  };

  const handleShuffle = () => {
    shuffle();
    setSelectedOption(choice);
  };

  const choice = useMemo(
    () =>
      decodeURIComponent(
        options.length === 0
          ? DEFAULT_TEXT.addChoice
          : options?.length === 1
          ? DEFAULT_TEXT.needs2Choices
          : options[randomIndex]
      ),
    [options, randomIndex]
  );

  // TODO: don't show a default choice
  // useEffect(() => {
  //   setSelectedOption(choice);
  // }, [choice]);

  return (
    <>
      <OptionWrapper>
        <div>And the choice is...</div>
        <OptionStyled bgColor={randomColor} title={selectedOption}>
          {selectedOption}
        </OptionStyled>
        <ShuffleButton onClick={handleShuffle}>Choose...</ShuffleButton>
      </OptionWrapper>
    </>
  );
}
