import { useMemo } from "react";

import { Choice } from "../components/ChoiceContext";
import { useURL } from "./useURL";

// export function useChoice(choiceMap:ChoiceMap) {
export function useChoice() {

  const { options } = useURL();

  const initialChoiceMap = useMemo(() => {
    const choiceMap = new Map<string, Choice>();
    options.forEach((option) => {
      const optionDecoded = decodeURIComponent(option);
      choiceMap.set(optionDecoded, {
        id: optionDecoded,
        label: optionDecoded,
        isWinner: false,
        count: 0,
      });
    });
    return choiceMap;
  }, [options]);

// function getWinningChoice(map:Map<string, Choice>) {
  // const winningChoice = useMemo((map: Map<string, Choice>) => {
  // const winningChoice = useMemo(() => {
  // const winningChoice = useCallback((choiceMap:ChoiceMap) => {
  //   let winner ;
  //   let maxCount = 0;
  //   Object.keys(choiceMap).forEach((key) => {
  //     const choice = choiceMap.get(key);
  //     // const choiceCount = choice?.count || 0;
  //     if (choice && choice.count > maxCount) {
  //       maxCount = choice.count;
  //       choice.isWinner = true;
  //       winner = choice;
  //     }
  //   });
  //   // return maxKey;
  //   return winner;
  // },[]);

// return {initialCountMap, winningChoice};
return {initialChoiceMap};
}