import { createContext, PropsWithChildren, useReducer, Dispatch } from 'react';

interface ChoiceContextProps {
  // countMap: Record<string,number>;
  // countMap: ChoiceCounter[];
  // choiceCount: ChoiceCounter[];
  choiceCountMap: ChoiceCountMap;
  incrementChoiceCount: Dispatch<string>;
  // setWinningChoice: Dispatch<string>;
  winningChoice: string;
  setClickTimestamp: Dispatch<number>;
  clickTimestamp: number;
  // timeLeft: number;
  // isRunning: boolean;
  // startChoice: () => void;
  // stopChoice: () => void;
}

const initialCountMap = new Map();
// const initialCountMap = {}; //new Map();

function getWinningChoice(map:Map<string, number>) {
  let maxKey = '';
  let max = 0;
  Object.keys(map).forEach((key) => {
    const value = map.get(key) || 0;
    if(value >= max)
    {
      max = value;
      maxKey = key;
    }
  });
  return maxKey;
}

// export const ChoiceContext = createContext<ChoiceContextProps>({choiceCount: [], incrementChoiceCount: ()=>{return}});
export const ChoiceContext = createContext<ChoiceContextProps>({
  choiceCountMap: initialCountMap,
  incrementChoiceCount: () => {
    return;
  },
  winningChoice: '',
  // setWinningChoice: () => {
  //   return;
  // },
  clickTimestamp: 0,
  setClickTimestamp: () => {
    return;
  },
});

// const fullTime = 30;

export type ChoiceCountMap = Map<string, number>;
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
  const winningChoiceCount = counterMap.get(choiceId) || 0;
  counterMap.set(choiceId, winningChoiceCount + 1);
  // const winningChoiceCount = counterMap[choiceId] || 0;
  // counterMap[choiceId] = winningChoiceCount + 1;
  // console.log('Context - counterMap', counterMap);
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
  // const [timeLeft, setTimeLeft] = useState<number>(fullTime);
  const [choiceCountMap, dispatch] = useReducer(countMapReducer, initialCountMap);
  // const [winningChoice, dispatchChoice] = useReducer(simpleReducer, '');
  const [clickTimestamp, dispatchClickTimestamp] = useReducer(
    clickTimestampReducer,
    0
  );

  const winningChoice = getWinningChoice(choiceCountMap);
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
        incrementChoiceCount: dispatch,
        winningChoice,
        // setWinningChoice: dispatchChoice,
        clickTimestamp,
        setClickTimestamp: dispatchClickTimestamp,
      }}
    >
      {children}
    </ChoiceContext.Provider>
  );
}
