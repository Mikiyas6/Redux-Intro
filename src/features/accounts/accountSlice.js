import { createSlice } from "@reduxjs/toolkit";
// Defines the default structure of the state managed by this slice
const initialState = {
  balance: 0,
  loan: 0,
  loanPurpose: "",
  isLoading: false,
};
// responsible for managing one portion of the global Redux state. That portion of the state is "account"
const accountSlice = createSlice({
  name: "account", // Specifies the stateDomain for the Action Types generated from this slice
  initialState, //Defines the initial state of the slice
  reducers: {
    deposit(state, action) {
      state.balance += action.payload;
    },
    withdraw(state, action) {
      state.balance -= action.payload;
    },
    requestLoan: {
      prepare(amount, purpose) {
        return { payload: { amount, purpose } };
      },
      reducer(state, action) {
        if (state.loan > 0) return;
        state.loan = action.payload.amount;
        state.loanPurpose = action.payload.purpose;
        state.balance += action.payload.amount;
      },
    },
    payLoan(state, action) {
      state.balance -= state.loan;
      state.loan = 0;
      state.loanPurpose = "";
    },
  },
});
console.log(accountSlice);
export const { deposit, payLoan, requestLoan, withdraw } = accountSlice.actions;
export default accountSlice.reducer;
