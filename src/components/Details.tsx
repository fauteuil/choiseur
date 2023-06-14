import styled from 'styled-components';
import { useURL } from '../hooks/useURL';
import { useCallback, useEffect } from 'react';
import { randomInt } from '@dmhtoo/random-int';
import randomRgba from 'random-rgba';
import { useState } from 'react';

const OptionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1rem;
`;

const OptionStyled = styled.div`
  font-size: 3rem;
  line-height: 1.75rem ;
  padding: 1rem;
  margin-top: 1rem ;
  background-color: ${randomRgba(17)};
  color: ${randomRgba(97)};
`;

const ShuffleButton = styled.button`
  cursor: pointer;
  font-weight: bold;
  padding-left: 1rem;
  margin-top: 2rem;
`;

export function Details() {
  const [randomIndex, setRandomIndex] = useState(0);

  const { options } = useURL();

  const shuffle = useCallback(() => {
    setRandomIndex(randomInt(0, options.length - 1));
  }, [options.length]);

  const handleShuffle = () => {
    shuffle();
  };

  useEffect(() => {
    shuffle();
  }, [shuffle]);

  return (
    <>
      {!options?.length ? null : (
        <OptionWrapper>
          <div>And the choice is...</div>
          <OptionStyled>{options[randomIndex]}</OptionStyled>
          <ShuffleButton onClick={handleShuffle}>Shuffle...</ShuffleButton>
        </OptionWrapper>
      )}
    </>
  );
}
