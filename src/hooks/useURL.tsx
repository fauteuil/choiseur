import { useCallback, useMemo } from 'react';

// TODO: use react-router
export function useURL() {
  const query = useMemo(() => new URLSearchParams(window.location.search), []);
  const valueByKey = useCallback((key: string) => query?.get(key) || '', [
    query,
  ]);
  const topicRaw = valueByKey('topic').trim();
  const topic = topicRaw ? decodeURIComponent(topicRaw) : '';
  const choices: string[] =
    valueByKey('choices')
      .trim()
      .split(',')
      .map((opt) => decodeURIComponent(opt))
      .filter((opt) => opt !== '') || [];
  const addChoice = (choice: string) => {
    choices.push(encodeURIComponent(choice));
    query.set('choices', choices.join(','));
    window.location.search = query.toString();
  };
  const addTopic = useCallback((topic = '') => {
    // const newTopic = topic.replaceAll(' ','');
    const newTopic = topic.trim();
    const currentTopic = query.get('topic');
    // if(newTopic && currentTopic !== newTopic){
    if(currentTopic !== newTopic){
      query.set('topic', encodeURIComponent(newTopic));
      window.location.search = query.toString();
    }
  },[query]);

  const removeChoice = (choice: string) => {
    const newChoices = choices.filter((opt) => opt !== choice);
    query.set('choices', newChoices.join(','));
    window.location.search = query.toString();
  };
  const removeAllChoices = () => {
    query.set('choices', '');
    window.location.search = query.toString();
  };

  return {
    addChoice,
    addTopic,
    choices,
    query,
    removeAllChoices,
    removeChoice,
    topic,
    valueByKey,
  };
}
