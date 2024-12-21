const initialStateAccount = {
  balance: 0,
  loan: 0,
  loanPurpose: "",
  currency: "USD",
};

export default function accountReducer(state = initialStateAccount, action) {
  switch (action.type) {
    // stateDomain/EventName
    case "account/deposit":
      return {
        ...state,
        balance: state.balance + action.payload.amount,
        currency: action.payload.currency,
      };
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
    default:
      return state;
  }
}

export function deposit(amount, currency) {
  return { type: "account/deposit", payload: { amount, currency } };
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
