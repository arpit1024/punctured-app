import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CheckOut.css";
export const CheckOut = () => {
  const [formdata, setFormData] = useState({ totalShops: 0, totalCost: 0 });
  const [form, setform] = useState({});
  const navigate = useNavigate();
  const setChanges = () => {
    let arr = form;
    arr.Payment = formdata.totalCost;
    localStorage.setItem("punctrd-user-form-data", JSON.stringify(arr));
    navigate("/history");
  };
  const setPaymentForm = (data) => {
    let totalCost = 0;
    data.map((ele) => {
      totalCost += ele.Payment;
    });
    let totalShops = data.length;

    console.log(totalCost, totalShops);
    if (data[0].Promo) {
      setFormData({ totalCost: totalCost * 0.7, totalShops });
    } else {
      setFormData({ totalCost, totalShops });
    }
  };
  const handleChange = (e) => {
    let { name, value } = e.target;
    setform((state) => ({
      ...state,
      [name]: value,
    }));
  };
  console.log(form);
  useEffect(() => {
    let data = JSON.parse(localStorage.getItem("car-service-shop-cart"));
    setPaymentForm(data);
  }, []);
  return (
    <>
      <div className="checkOutCont">
        <div className="form-container">
          <input
            type="text"
            placeholder="Enter Your Name"
            name="name"
            onChange={handleChange}
          />
          <input
            type="email"
            placeholder="Enter Your email address"
            name="email"
            pattern="[^ @]*@[^ @]*"
            onChange={handleChange}
          />
          <input
            type="number"
            placeholder="Enter Your phone number"
            name="phone"
            onChange={handleChange}
          />
          <div>
            <span>Choose Service Date</span>
            <input type="date" name="Service date" onChange={handleChange} />
          </div>
          <textarea
            rows={10}
            cols={50}
            placeholder="Enter Your Location address"
            name="adress"
            onChange={handleChange}
          />
          <button onClick={setChanges}>Proceed</button>
        </div>
        <div className="payments">
          <h2>Cart Added Shops</h2>
          <div>Total Shops : {formdata.totalShops}</div>
          <div>Total Costs : {formdata.totalCost}</div>
        </div>
      </div>
    </>
  );
};
