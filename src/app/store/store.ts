import { Action, action, dispatch, select } from "@utils/state";

export const store = <T>() => {
  return {
    action<K extends keyof T & string>(type: K) {
      return action<K, T[K]>(type as K);
    },
    select<K extends keyof T & string>(type: K) {
      return select<T[K]>(type as K);
    },
    dispatch<K extends keyof T>(action: Action<T[K]>) {
      dispatch(action);
    },
  };
};
