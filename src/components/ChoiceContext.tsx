import {
  createContext,
  PropsWithChildren,
  useReducer,
  Dispatch,
  useMemo,
} from 'react';
import { useURL } from '../hooks/useURL';

export type Choice = {
  id?: string;
  label: string;
  count: number;
  isWinner: boolean;
};

interface ChoiceContextProps {
  // countMap: Record<string,number>;
  // countMap: ChoiceCounter[];
  // choiceCount: ChoiceCounter[];
  choiceCountMap: ChoiceCountMap;
  incrementChoiceCount: Dispatch<string>;
  // setWinningChoice: Dispatch<string>;
  // winningChoiceId: string;
  setClickTimestamp: Dispatch<number>;
  clickTimestamp: number;
  // timeLeft: number;
  // isRunning: boolean;
  // startChoice: () => void;
  // stopChoice: () => void;
}

// populate map from url
// const initialCountMap = new Map<string, Choice>();
// const initialCountMap = {}; //new Map();

// function getWinningChoice(map:Map<string, Choice>) {
function setWinningChoice(map: Map<string, Choice>) {
  // let maxKey = '';
  let max = 0;
  Object.keys(map).forEach((key) => {
    const choice = map.get(key);
    // const choiceCount = choice?.count || 0;
    if (choice && choice.count > max) {
      max = choice.count;
      choice.isWinner = true;
    }
  });
  // return maxKey;
}

// export const ChoiceContext = createContext<ChoiceContextProps>({choiceCount: [], incrementChoiceCount: ()=>{return}});
export const ChoiceContext = createContext<ChoiceContextProps>({
  choiceCountMap: new Map<string, Choice>(),
  incrementChoiceCount: () => {
    return;
  },
  // winningChoiceId: '',
  // setWinningChoice: () => {
  //   return;
  // },
  clickTimestamp: 0,
  setClickTimestamp: () => {
    return;
  },
});

// const fullTime = 30;

// export type ChoiceCountMap = Map<string, number>;
export type ChoiceCountMap = Map<string, Choice>;
// export type ChoiceCountMap = Record<string, number>;
// type ChoiceCounter =
//   {
//     id: string,
//     count: number,
//   };

// type ChoiceAction =
//   {
//     id: string,
//     type: string,
//   };

// const simpleReducer = (choiceIdState: string, choiceId: string) => {
//   return choiceId;
// };
const clickTimestampReducer = (
  timestampReducerState: number,
  timestamp: number
) => {
  timestampReducerState = timestamp;
  return timestampReducerState;
};

// const countMapReducer = (state:ChoiceCounter[], choiceId:string) => {
const countMapReducer = (counterMap: ChoiceCountMap, choiceId: string) => {
  const currentChoice = counterMap.get(choiceId);
  // counterMap.set(, {...winningChoice, winningChoice}winningChoiceCount + 1);
  // counterMap.set(choiceId, winningChoiceCount + 1);
  if (currentChoice) {
    counterMap.set(choiceId, {
      ...currentChoice,
      count: currentChoice.count + 1,
    });
  }
  // const winningChoiceCount = counterMap[choiceId] || 0;
  // counterMap[choiceId] = winningChoiceCount + 1;
  // console.log('Context - counterMap', counterMap);

  // const winningChoice = getWinningChoice(counterMap);

  // counterMap.set(winningChoice, {});
  setWinningChoice(counterMap);

  return counterMap;
  // switch (choiceId) {
  // case "COMPLETE":
  // return state.map((choice) => {
  //   if (choice.id === choiceId) {
  //     return { ...choice, count: choice.count++ };
  //   } else {
  //     return choice;
  //   }
  // });

  // default:
  //   return state;
  // }
};

export function ChoiceProvider({ children }: PropsWithChildren) {
  const { options } = useURL();

  const initialCountMap = useMemo(() => {
    const choiceMap = new Map<string, Choice>();
    options.forEach((option) => {
      choiceMap.set(option, {
        id: option,
        label: decodeURIComponent(option),
        isWinner: false,
        count: 0,
      });
    });
    return choiceMap;
  }, [options]);

  // const [timeLeft, setTimeLeft] = useState<number>(fullTime);
  const [choiceCountMap, incrementChoiceCount] = useReducer(
    countMapReducer,
    initialCountMap
  );
  // const [winningChoice, dispatchChoice] = useReducer(simpleReducer, '');
  const [clickTimestamp, dispatchClickTimestamp] = useReducer(
    clickTimestampReducer,
    0
  );

  // const winningChoice = getWinningChoice(choiceCountMap);
  // const [isRunning, setIsRunning] = useState<boolean>(false);

  // const startChoice = () => {
  //   if (timeLeft === 0) {
  //     setTimeLeft(fullTime);
  //     // return;
  //   }
  //   setIsRunning(true);
  // }

  // const stopChoice = () => setIsRunning(false);

  // useEffect(() => {
  //   // if (!isRunning || timeLeft === 0) return;
  //   if (!isRunning) return;
  //   if (timeLeft === 0) {
  //     setTimeLeft(fullTime);
  //     setIsRunning(false);
  //     return;
  //   }
  //   const choice = setTimeout(() => {
  //     setTimeLeft(timeLeft - 1);
  //   }, 1000);
  //   return () => clearTimeout(choice);
  // }, [isRunning, timeLeft]);

  return (
    // <ChoiceContext.Provider value={{ countMap, timeLeft, isRunning, startChoice, stopChoice }}>
    // <ChoiceContext.Provider value={{choiceCount,countMap,dispatch}}>
    <ChoiceContext.Provider
      value={{
        choiceCountMap: choiceCountMap,
        incrementChoiceCount,
        // winningChoiceId: winningChoice,
        // setWinningChoice: dispatchChoice,
        clickTimestamp,
        setClickTimestamp: dispatchClickTimestamp,
      }}
    >
      {children}
    </ChoiceContext.Provider>
  );
}
