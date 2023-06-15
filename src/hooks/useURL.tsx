import { useMemo } from 'react';

// TODO: use react-router
export function useURL() {
  const query = useMemo(() => new URLSearchParams(window.location.search), []);
  const valueByKey = (key: string) => query?.get(key) || '';
  const options: string[] = valueByKey('options').trim().split(',').filter((opt) => opt !== '') || [];
  const addOption = (option: string) => {
    options.push(encodeURIComponent(option));
    window.location.search = `?options=${options.join(',')}`;
  };
  const removeOption = (option: string) => {
    const newOptions = options.filter((opt) => opt !== option);
    window.location.search = `?options=${newOptions.join(',')}`;
  };
  const removeAllOptions = () => { window.location.search = `?options=`; };

  return {
    addOption,
    options,
    query,
    removeAllOptions,
    removeOption,
    valueByKey,
  };
}
