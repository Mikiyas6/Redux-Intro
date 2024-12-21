import { useCallback } from "react";
import { useSelector } from "react-redux";

function BalanceDisplay() {
  const balance = useSelector((store) => store.account.balance);
  const currency = useSelector((store) => store.account.currency);
  const formatCurrency = useCallback(
    function formatCurrency(value) {
      return new Intl.NumberFormat("en", {
        style: "currency",
        currency,
      }).format(value);
    },
    [currency]
  );
  return <div className="balance">{formatCurrency(balance)}</div>;
}

export default BalanceDisplay;
