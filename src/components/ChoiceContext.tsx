import { createContext, PropsWithChildren, useReducer, Dispatch } from 'react';
import { useChoice } from '../hooks/useChoice';

export type Choice = {
  id: string;
  label: string;
  count: number;
  isWinner: boolean;
};

export type ChoiceMap = Map<string, Choice>;
interface ChoiceContextProps {
  choiceMap: ChoiceMap;
  incrementChoiceCount: Dispatch<string>;
  setWinningChoiceId: Dispatch<string>;
  winningChoiceId: string;
  setClickTimestamp: Dispatch<number>;
  clickTimestamp: number;
}

export const ChoiceContext = createContext<ChoiceContextProps>({
  choiceMap: new Map<string, Choice>(),
  incrementChoiceCount: () => {
    return;
  },
  winningChoiceId: '',
  setWinningChoiceId: () => {
    return;
  },
  clickTimestamp: 0,
  setClickTimestamp: () => {
    return;
  },
});

const simpleReducer = (winningChoiceIdState: string, choiceId: string) => {
  winningChoiceIdState = choiceId;
  return winningChoiceIdState;
};

const clickTimestampReducer = (
  timestampReducerState: number,
  timestamp: number
) => {
  timestampReducerState = timestamp;
  return timestampReducerState;
};

const countMapReducer = (choiceMap: ChoiceMap, incrementedChoiceId: string) => {
  // Set the winning choice
  let winnerId = '';
  let max = 0;

  choiceMap.forEach((choice, testId) => {
    const choiceCount =
      testId === incrementedChoiceId ? choice.count + 1 : choice.count;
    if (choice && choiceCount >= max) {
      max = choice.count;
      winnerId = testId;
    }
  });

  choiceMap.forEach((choice, testId) => {
    const choiceCount =
      testId === incrementedChoiceId ? choice.count + 1 : choice.count;

    if (choice) {
      choiceMap.set(testId, {
        ...choice,
        isWinner: winnerId && testId === winnerId ? true : false,
        count: choiceCount,
      });
    }
  });

  return choiceMap;
};

export function ChoiceProvider({ children }: PropsWithChildren) {
  const { initialChoiceMap } = useChoice();

  const [choiceMap, incrementChoiceCount] = useReducer(
    countMapReducer,
    initialChoiceMap
  );
  const [winningChoiceId, dispatchWinningChoiceId] = useReducer(
    simpleReducer,
    ''
  );
  const [clickTimestamp, dispatchClickTimestamp] = useReducer(
    clickTimestampReducer,
    0
  );

  return (
    <ChoiceContext.Provider
      value={{
        choiceMap,
        incrementChoiceCount,
        winningChoiceId,
        setWinningChoiceId: dispatchWinningChoiceId,
        clickTimestamp,
        setClickTimestamp: dispatchClickTimestamp,
      }}
    >
      {children}
    </ChoiceContext.Provider>
  );
}
