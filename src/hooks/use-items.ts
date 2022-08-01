import { useCallback, useMemo, useReducer } from 'react';

type TItemsAction<T> =
  | { type: 'set'; payload: T[] }
  | { type: 'addToStart'; payload: T | T[] }
  | { type: 'addToEnd'; payload: T | T[] }
  | { type: 'remove'; payload: (items: T[]) => T[] }
  | { type: 'clear' };

const createItemsReducer =
  <T>() =>
  (state: T[], action: TItemsAction<T>) => {
    switch (action.type) {
      case 'set': {
        return action.payload;
      }
      case 'addToStart': {
        return [
          ...(Array.isArray(action.payload)
            ? action.payload
            : [action.payload]),
          ...state,
        ];
      }
      case 'addToEnd': {
        return [
          ...state,
          ...(Array.isArray(action.payload)
            ? action.payload
            : [action.payload]),
        ];
      }
      case 'remove': {
        return action.payload(state);
      }
      case 'clear':
        return [];
      default:
        return state;
    }
  };

export const useItems = <T>(
  initialItems: T[],
  selector: (state: T[]) => T[] = state => state
): [
  T[],
  {
    set: (payload: T[]) => void;
    addToStart: (payload: T | T[]) => void;
    addToEnd: (payload: T | T[]) => void;
    remove: (payload: (items: T[]) => T[]) => void;
    clear: () => void;
  }
] => {
  const [state, dispatch] = useReducer(createItemsReducer<T>(), initialItems);
  const set = useCallback(payload => dispatch({ type: 'set', payload }), []);
  const addToStart = useCallback(
    payload => dispatch({ type: 'addToStart', payload }),
    []
  );
  const addToEnd = useCallback(
    payload => dispatch({ type: 'addToEnd', payload }),
    []
  );
  const remove = useCallback(
    payload => dispatch({ type: 'remove', payload }),
    []
  );
  const clear = useCallback(() => dispatch({ type: 'clear' }), []);

  const items = useMemo(() => selector(state), [selector, state]);

  const actions = useMemo(
    () => ({
      set,
      addToStart,
      addToEnd,
      remove,
      clear,
    }),
    [set, addToStart, addToEnd, remove, clear]
  );

  return [items, actions];
};
