import { FC } from 'react';
import { createPortal } from 'react-dom';

import { usePortal } from './hooks';

export type TPortal = {
  id: string;
};

export const Portal: FC<TPortal> = ({ id, children }) => {
  const target = usePortal(id);

  return target ? createPortal(children, target) : null;
};
