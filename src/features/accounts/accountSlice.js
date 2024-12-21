const initialStateAccount = {
  balance: 0,
  loan: 0,
  loanPurpose: "",
  isLoading: false,
};

export default function accountReducer(state = initialStateAccount, action) {
  switch (action.type) {
    // stateDomain/EventName
    case "account/deposit":
      return {
        ...state,
        balance: state.balance + action.payload,
        isLoading: false,
      };
    // return {
    //   ...state,
    //   balance: state.balance + action.payload.amount,
    //   currency: action.payload.currency,
    // };
    case "account/withdraw":
      return { ...state, balance: state.balance - action.payload };
    case "account/requestLoan":
      return {
        ...state,
        loan: action.payload.amount,
        loanPurpose: action.payload.purpose,
        balance: state.balance + action.payload.amount,
      };
    case "account/payLoan":
      return {
        ...state,
        loan: 0,
        loanPurpose: "",
        balance: state.balance - state.loan,
      };
    case "account/convertingCurrency":
      return { ...state, isLoading: true };
    case "rejected":
      return { ...state, isLoading: false };
    default:
      return state;
  }
}

export function deposit(amount, currency) {
  if (currency === "USD") return { type: "account/deposit", payload: amount };
  return async function (dispatch, getState) {
    try {
      // API Call
      dispatch({ type: "account/convertingCurrency" });
      const res = await fetch(
        `https://api.frankfurter.dev/v1/latest?amount=${amount}&base=${currency}&symbols=USD`
      );
      const data = await res.json();
      const converted = data.rates.USD;
      // return Action
      dispatch({ type: "account/deposit", payload: converted });
    } catch (err) {
      dispatch({ type: "rejected" });
    }
  };
}

export function withdraw(amount) {
  return { type: "account/withdraw", payload: amount };
}

export function requestLoan(amount, purpose) {
  return {
    type: "account/requestLoan",
    payload: { amount, purpose },
  };
}

export function payLoan() {
  return { type: "account/payLoan" };
}
