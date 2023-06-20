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
  /* display: flex; */
  /* overflow: hidden; */
  /* padding: 3.5rem 1rem; */
  /* text-wrap: nowrap; */
  align-content: center;
  background-color: ${(props) => props.bgColor};
  border-radius: 0.75rem;
  border: 0.25rem solid ${randomRgba(97)};
  cursor: pointer;
  flex-wrap: wrap;
  font-size: 2rem;
  font-weight: bold;
  height: 10rem;
  justify-content: center;
  line-height: 3rem;
  margin-top: 0.5rem;
  overflow: scroll;
  padding: 1rem;
  text-align: center;
  text-overflow: ellipsis;
  width: 17rem;
`;

// const ShuffleButton = styled.button`
//   background-color: #6b737b;
//   cursor: pointer;
//   color: #fff;
//   font-weight: bold;
//   padding-left: 1rem;
//   margin-top: 1rem;
//   border-radius: 1rem;
//   border: 0.125rem solid #eee;
// `;

const DEFAULT_TEXT = {
  addChoice: '(Add 2 or more choices...)',
  instructions: 'And the choice is...',
  makeAChoice: '(Click to Choose...)',
  needs2Choices: '(Add 1 more choice...)',
};

export function Details() {
  const { options } = useURL();
  const [randomIndex, setRandomIndex] = useState(0);
  const [randomColor, setRandomColor] = useState(randomRgba(37));

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

  const [selectedOption, setSelectedOption] = useState(options.length > 1 ? DEFAULT_TEXT.makeAChoice : choice);

  const shuffle = () => {
    setRandomIndex(randomInt(0, options.length - 1));
    setRandomColor(randomRgba(37));
  };

  const handleShuffle = () => {
    shuffle();
    setSelectedOption(choice);
  };

  return (
    <>
      <OptionWrapper>
        <div>{DEFAULT_TEXT.instructions}</div>
        <OptionStyled bgColor={randomColor} title={DEFAULT_TEXT.makeAChoice} onClick={handleShuffle}>
          {selectedOption}
        </OptionStyled>
        {/* <ShuffleButton onClick={handleShuffle}>Choose...</ShuffleButton> */}
      </OptionWrapper>
    </>
  );
}
