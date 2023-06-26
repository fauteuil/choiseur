import styled, { css, keyframes } from 'styled-components';
import { useURL } from '../hooks/useURL';
import { MouseEvent, useContext, useMemo } from 'react';
import { randomInt } from '@dmhtoo/random-int';
import randomRgba from 'random-rgba';
import { useState } from 'react';
import { ChoiceContext } from './ChoiceContext';

interface StylableProps {
  bgColor: string;
  // choosingTimeout: number;
  isChoosing?: boolean;
}

const OptionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0.5rem;
`;

const OptionWrappable = styled.span`
  white-space: break-spaces;
  overflow: hidden;
  text-overflow: ellipsis;
`;

// animation: ${rotationKeyframes} 3s infinite;
// transform: rotate(30deg);
// opacity: .7;
// }

const rotationKeyframes = keyframes`
0% {
  transform: rotate(0);
}
50% {
  transform: rotate(179deg) scale(1.1);
  /* filter: blur(25%) ; */
}
100% {
  transform: rotate(353deg);
}
`;

const OptionStyled = styled.div<StylableProps>`
  -webkit-align-items: center;
  /* display: flex; */
  /* overflow: hidden; */
  /* padding: 3.5rem 1rem; */
  /* text-wrap: nowrap; */
  align-content: center;
  align-items: center;
  animation: ${(props) =>
    // props.isChoosing ? css`${rotationKeyframes} ${props.choosingTimeout / 1000}s infinite` : 'none'};
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
  /* height: 10rem; */
  height: 15rem;
  justify-content: center;
  justify-content: center;
  line-height: 3rem;
  margin-top: 0.5rem;
  overflow: scroll;
  padding: 1rem;
  text-align: center;
  text-overflow: ellipsis;
  /* width: 17rem; */
  width: 15rem;
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
  makeAChoice: '(Choose...)',
  needs2Choices: '(Add 1 more choice...)',
};

export function Details() {
  const { options } = useURL();
  // const choosingTimeout = randomInt(500, 2000);
  const [randomIndex, setRandomIndex] = useState(0);
  // const [choosingTimeout, setChoosingTimeout] = useState(0);
  const [isChoosing, setIsChoosing] = useState(false);
  const [randomColor, setRandomColor] = useState(randomRgba(37));

  const { incrementChoiceCount, setClickTimestamp } = useContext(ChoiceContext);

  // const hi = choiceCount;

  const currentChoice = useMemo(
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

  const [selectedOption, setSelectedOption] = useState(
    options.length > 1 ? DEFAULT_TEXT.makeAChoice : currentChoice
  );

  const shuffle = () => {
    // setChoosingTimeout(randomInt(500, 2000));
    setIsChoosing(true);
    setRandomIndex(randomInt(0, options.length - 1));
    setRandomColor(randomRgba(37));
  };

  const handleShuffle = async (event: MouseEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    shuffle();
    await setTimeout(() => {
      setIsChoosing(false);
      // }, choosingTimeout);
    }, 500);
    setClickTimestamp(new Date().getTime());
    setSelectedOption(currentChoice);
    incrementChoiceCount(currentChoice);
    // setCurrentChoice(choice);
  };

  return (
    <>
      <OptionWrapper>
        {/* <div>{DEFAULT_TEXT.instructions}</div> */}
        <OptionStyled
          bgColor={randomColor}
          // choosingTimeout = {choosingTimeout}
          isChoosing={isChoosing}
          title={DEFAULT_TEXT.makeAChoice}
          onClick={handleShuffle}
        >
          <OptionWrappable>{isChoosing ? '' : selectedOption}</OptionWrappable>
        </OptionStyled>
        {/* <ShuffleButton onClick={handleShuffle}>Choose...</ShuffleButton> */}
      </OptionWrapper>
    </>
  );
}
