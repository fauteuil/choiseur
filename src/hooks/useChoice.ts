import { useMemo } from "react";

import { type Choice } from "../components/ChoiceContext";
import { useURL } from "./useURL";

export function useChoice() {

  const { choices } = useURL();

  const initialChoiceMap = useMemo(() => {
    const choiceMap = new Map<string, Choice>();
    choices.forEach((choice) => {
      const choiceDecoded = decodeURIComponent(choice);
      choiceMap.set(choiceDecoded, {
        id: choiceDecoded,
        label: choiceDecoded,
        isWinner: false,
        count: 0,
      });
    });
    return choiceMap;
  }, [choices]);

return {initialChoiceMap};
}