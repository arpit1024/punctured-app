import { nanoid } from "nanoid";
import "./Cart.css";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export const Cart = () => {
  const [shops, setShops] = useState([]);
  const [promo, setPromo] = useState("");
  const navigate = useNavigate();
  const [formdata, setFormData] = useState({ totalShops: 0, totalCost: 0 });
  const [applied, SetApplied] = useState(false);
  const checkout = () => {
    let newData = shops;
    newData[0].Promo = applied;
    localStorage.setItem("car-service-shop-cart", JSON.stringify(newData));
    navigate("/checkout");
  };
  const sethandlePromo = () => {
    if (promo != "punc30") {
      alert("Wrong Code!");
      return;
    } else if (!applied) {
      setFormData((state) => ({
        ...state,
        totalCost: 0.7 * state.totalCost,
      }));
      SetApplied(true);
      alert("Hurray! You Got 30% Discount");
    } else {
      alert("Code Already added");
    }
  };
  const setPaymentForm = (data) => {
    let totalCost = 0;
    data.map((ele) => {
      totalCost += ele.Payment;
    });
    console.log(shops);
    let totalShops = data.length;
    console.log(totalCost, totalShops);
    setFormData({ totalCost, totalShops });
  };
  console.log(formdata);
  useEffect(() => {
    let data = JSON.parse(localStorage.getItem("car-service-shop-cart")) || [];
    setShops(data);
    setPaymentForm(data);
  }, []);
  const deleteService = (service) => {
    let newData = shops.filter((d) => {
      if (!(d.id == service.id)) {
        return d;
      }
    });
    localStorage.setItem("car-service-shop-cart", JSON.stringify(newData));
    setShops(newData);
    setPaymentForm(newData);
  };
  return (
    <>
      <input
        type="text"
        placeholder="Apply Promo punc30"
        onChange={(e) => setPromo(e.target.value)}
      />
      <button onClick={sethandlePromo}>Apply Code</button>
      <div className="cart-container">
        {shops.length ? (
          <div className="shops-container-cart">
            {shops.map((d) => (
              <>
                <div className="pro-cont">
                  {" "}
                  <img
                    src="https://images.ctfassets.net/33n6gwydcv8y/5baEc7ZISMkYP9nHVZpklO/5bdf46f27ffc65a3697cfd9c9be71ad5/car-service-history.png"
                    alt="Image Not Found"
                  />
                  <div key={nanoid()}>Shop Name: {d.ShopName}</div>
                  <div key={nanoid()}>Location: {d.Location}</div>
                  <div key={nanoid()}>Discount: {d.Discount}</div>
                  <div key={nanoid()}>Ratings: {d.Ratings}</div>
                  <div key={nanoid()}>Payment: {d.Payment}</div>
                  <button onClick={() => deleteService(d)}>
                    Delete Service
                  </button>
                </div>
              </>
            ))}
          </div>
        ) : (
          <div className="empty">
            <div>No Shops added to your cart!</div>
            <Link to={"/"} className="link-tag emt">
              Add Shops
            </Link>
          </div>
        )}
        <div className="payments">
          <h2>Cart Added Shops</h2>
          <div>Total Shops : {formdata.totalShops}</div>
          <div>Total Costs : {formdata.totalCost}</div>
          <button className="checkOut-btn" onClick={checkout}>
            checkout{" "}
            <span>
              <img
                src="https://img2.hkrtcdn.com/react/static/media/common/cart-arrow.svg"
                alt=""
                srcset=""
              />
            </span>
          </button>
        </div>
      </div>
    </>
  );
};
