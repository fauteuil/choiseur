import {
  createContext,
  PropsWithChildren,
  useReducer,
  Dispatch,
  // useMemo,
} from 'react';
// import { useURL } from '../hooks/useURL';
import { useChoice } from '../hooks/useChoice';

export type Choice = {
  id: string;
  label: string;
  count: number;
  isWinner: boolean;
};

export type ChoiceMap = Map<string, Choice>;
interface ChoiceContextProps {
  // countMap: Record<string,number>;
  // countMap: ChoiceCounter[];
  // choiceCount: ChoiceCounter[];
  choiceMap: ChoiceMap;
  incrementChoiceCount: Dispatch<string>;
  setWinningChoiceId: Dispatch<string>;
  winningChoiceId: string;
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

function setWinningChoice(choiceMap:ChoiceMap) {
// function setWinningChoice(map: Map<string, Choice>) {
//   // let maxKey = '';
  // let winner:Choice = {} as Choice;
  let winnerId = '';
  let max = 0;
  Object.keys(choiceMap).forEach((key) => {
    const choice = choiceMap.get(key);
    // const choiceCount = choice?.count || 0;
    if (choice && choice.count > max) {
      max = choice.count;
      winnerId = key;
      // choice.isWinner = true;
    }
  });

  const winner = choiceMap.get(winnerId);
  if(winner){
    console.log('winner',winner);
    choiceMap.set(winnerId, {...winner, isWinner:true});
  }
  // return winner;
  // return maxKey;
}

// export const ChoiceContext = createContext<ChoiceContextProps>({choiceCount: [], incrementChoiceCount: ()=>{return}});
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

// const fullTime = 30;

// export type ChoiceCountMap = Map<string, number>;
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

// const countMapReducer = (state:ChoiceCounter[], choiceId:string) => {
const countMapReducer = (counterMap: ChoiceMap, choiceId: string) => {

  const currentChoice = counterMap.get(choiceId);
  // counterMap.set(, {...winningChoice, winningChoice}winningChoiceCount + 1);
  // counterMap.set(choiceId, winningChoiceCount + 1);
  if (currentChoice) {
    counterMap.set(choiceId, {
      ...currentChoice,
      count: currentChoice.count + 1,
      // isWinner: winningChoice ? winningChoice.id === currentChoice.id : false,
    });
  }
  setWinningChoice(counterMap);
  // const winningChoiceCount = counterMap[choiceId] || 0;
  // counterMap[choiceId] = winningChoiceCount + 1;
  // console.log('Context - counterMap', counterMap);

  // const winningChoice = getWinningChoice(counterMap);

  // counterMap.set(winningChoice, {});
  // setWinningChoice(counterMap);

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
  const {initialChoiceMap} = useChoice();
  // const {choiceMap:existingMap} = useContext(ChoiceContext);
  // const { options } = useURL();

  // const initialCountMap = useMemo(() => {
  //   const choiceMap = new Map<string, Choice>();
  //   options.forEach((option) => {
  //     const optionDecoded = decodeURIComponent(option);
  //     choiceMap.set(optionDecoded, {
  //       id: optionDecoded,
  //       label: optionDecoded,
  //       isWinner: false,
  //       count: 0,
  //     });
  //   });
  //   return choiceMap;
  // }, [options]);

  // const [timeLeft, setTimeLeft] = useState<number>(fullTime);

  // console.log('ChoiceProvider.choiceMap',existingMap);

  const [choiceMap, incrementChoiceCount] = useReducer(
    countMapReducer,
    initialChoiceMap
  );
  const [winningChoiceId, dispatchWinningChoiceId] = useReducer(simpleReducer, '');
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
