import { useReducer, createContext } from 'react';

const initialState = {
  expenseMoney: 0,
  incomeMoney: 0,
  remainingMoney: 0,
  prevMonthIncome: 0,
  prevMonthExpense: 0,
  incomePercentage: 0,
  expensePercentage: 0,
  loading: true,
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: action.data };

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

    case 'SET_PERCENTAGE_INCOME':
      return {
        ...state,
        incomePercentage:
          state.prevMonthIncome > 0
            ? (state.incomeMoney - state.prevMonthIncome) /
            state.prevMonthIncome
            : 1,
      };

    case 'SET_PERCENTAGE_EXPENSE':
      return {
        ...state,
        expensePercentage:
          state.prevMonthExpense > 0
            ? (state.expenseMoney - state.prevMonthExpense) /
            state.prevMonthExpense
            : 1,
      };

    case 'SET_ALL':
      return {
        expenseMoney: 0,
        incomeMoney: 0,
        remainingMoney: 0,
        prevMonthIncome: 0,
        prevMonthExpense: 0,
        incomePercentage: 0,
        expensePercentage: 0,
      };

    default:
      return { ...state };
  }
};

const AppContext = createContext({
  state: initialState,
  dispatch: () => { },
});

function AppContextProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = { state, dispatch };
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

const AppContextConsumer = AppContext.Consumer;

export { AppContext, AppContextProvider, AppContextConsumer };
