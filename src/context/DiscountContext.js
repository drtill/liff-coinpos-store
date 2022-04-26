import { createContext, useContext } from 'react';

const DisCountContext = createContext();

export function DisCountWrapper({ children }) {
  let sharedState = {}

  return (
    <DisCountContext.Provider value={sharedState}>
      {children}
    </DisCountContext.Provider>
  );
}

export function useDisCountContext() {
  return useContext(DisCountContext);
}