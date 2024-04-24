import {useCallback, useEffect, useRef, useState} from 'react';

export function useWindowSize () {
  const [size, setSize] = useState([window.innerWidth, window.innerHeight]);
  const rafRef = useRef(0);
  const handleWindowSizeChange = useCallback(() => {
    cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      setSize([window.innerWidth, window.innerHeight]);
    });
  }, []);
  useEffect(() => {
    window.addEventListener('resize', handleWindowSizeChange);
    return () => {
      window.removeEventListener('resize', handleWindowSizeChange);
    };
  }, [handleWindowSizeChange]);
  return size;
}
