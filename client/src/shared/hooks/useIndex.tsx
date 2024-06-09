import { useState } from 'react';

function useIndex(defaulIndex: number = 0) {
  const [index, setIndex] = useState(defaulIndex);
  return { index, setIndex };
}

export default useIndex;
