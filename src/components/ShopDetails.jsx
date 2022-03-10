import { nanoid } from "nanoid";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import data from "../shops.json";
import "./ShopDetails.css";
export const ShopDetails = () => {
  const [shop, setShop] = useState([]);
  let { id } = useParams();

  useEffect(() => {
    data.map((d) => {
      if (d.id == id) {
        setShop(d);
      }
    });
  }, []);
  const addService = () => {
    if (localStorage.getItem("car-service-shop-cart") == null) {
      localStorage.setItem("car-service-shop-cart", JSON.stringify([]));
    }
    let array = JSON.parse(localStorage.getItem("car-service-shop-cart"));
    console.log(array);
    for (let i = 0; i < array.length; i++) {
      if (array[i].id == shop.id) {
        alert("Service Already in Cart!");
        return;
      }
    }
    array.push(shop);
    localStorage.setItem("car-service-shop-cart", JSON.stringify(array));
    alert("Service is added to your cart!");
  };
  console.log(shop);

  return (
    <>
      <h1 className="heading">Shop Details Page</h1>
      <div id="details-cont">
        {" "}
        <img
          src="https://images.ctfassets.net/33n6gwydcv8y/5baEc7ZISMkYP9nHVZpklO/5bdf46f27ffc65a3697cfd9c9be71ad5/car-service-history.png"
          alt="Image Not Found"
        />
        {(() => {
          let arr = [];
          for (const key in shop) {
            if (key != "coordinate" && key != "id") {
              arr.push(<div key={nanoid()}>{key + " : " + shop[key]}</div>);
            }
          }
          return arr;
        })()}
        <button className="btns" id="btn-effects" onClick={addService}>
          ADD THIS SERVICE
        </button>
      </div>
      {/* <Pagination
      postPerPage={postsPerPage}
      totalPosts={posts.length}
      paginate={paginate}
      /> */}
    </>
  );
};
