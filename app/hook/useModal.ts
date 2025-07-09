import { useCallback, useState } from 'react';

type UseModalReturn = {
  isVisible: boolean;
  open: () => void;
  close: () => void;
  toggle: () => void;
};

const useModal = (): UseModalReturn => {
  const [isVisible, setIsVisible] = useState(false);

  const open = useCallback(() => setIsVisible(true), []);
  const close = useCallback(() => setIsVisible(false), []);
  const toggle = useCallback(() => setIsVisible((prev) => !prev), []);

  return { isVisible, open, close, toggle };
};

export default useModal;
