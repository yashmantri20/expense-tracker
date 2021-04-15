import { useReducer, createContext } from 'react';

const initialState = {
  expenseMoney: 0,
  incomeMoney: 0,
  remainingMoney: 0,
  prevMonthIncome: 0,
  prevMonthExpense: 0,
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_EXPENSE_MONEY':
      return { ...state, expenseMoney: action.data };

    case 'SET_INCOME_MONEY':
      return { ...state, incomeMoney: action.data };

    case 'SET_REMAINING_MONEY':
      return {
        ...state,
        remainingMoney: state.incomeMoney - state.expenseMoney,
      };

    case 'SET_PREV_INCOME_MONEY':
      return { ...state, prevMonthIncome: action.data };

    case 'SET_PREV_EXPENSE_MONEY':
      return { ...state, prevMonthExpense: action.data };

    default:
      return { ...state };
  }
};

const AppContext = createContext({
  state: initialState,
  dispatch: () => {},
});

function AppContextProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = { state, dispatch };
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

const AppContextConsumer = AppContext.Consumer;

export { AppContext, AppContextProvider, AppContextConsumer };