import { useEffect, useState } from "react";

export const History = () => {
  const [payment, setPayment] = useState({});

  useEffect(() => {
    let obj = JSON.parse(localStorage.getItem("punctrd-user-form-data")) || {};
    setPayment(obj);
  }, []);
  return (
    <>
      <div id="hisCont">
        {Object.keys(payment).length == 0 ? (
          <h1>No History</h1>
        ) : (
          (() => {
            let arr = [];
            for (const key in payment) {
              arr.push(
                <div className="margin">{key + " : " + payment[key]}</div>
              );
            }
            return arr;
          })()
        )}
      </div>
    </>
  );
};
