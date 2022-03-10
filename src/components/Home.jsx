import "./Home.css";
import { nanoid } from "nanoid";
import React, { useEffect, useState } from "react";
import data from "../shops.json";
import { ShopDetails } from "./ShopDetails";
import { useNavigate } from "react-router-dom";

export const Home = () => {
  const [posts, setPosts] = useState([]);
  const [dist, setDist] = useState(null);
  const [location, setLocation] = useState("");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostPerPage] = useState(20);

  //   const fetchData = async (url, filter) => {
  //     setLoading(true);
  //     const res = await fetch(url);
  //     const data = await res.json();
  //     setPosts(data);
  //     setLoading(false);
  //   };
  //   useEffect(() => {
  //     fetchData("https://api.sampleapis.com/wines/whites");
  //   }, []);

  const search = () => {
    if (dist == null || dist == "" || location == "") {
      alert("please enter some number & select your location");
      return;
    }
    let coar;
    data.map((ele) => {
      if (ele.Location == location) {
        coar = ele.coordinate;
      }
    });
    let arr = data.filter((d) => {
      if (Math.abs(d.coordinate - coar) <= dist) {
        return d;
      }
    });
    setPosts(arr);
  };

  const filterRecords = (e) => {
    let { value } = e.target;
    console.log(value);
    let records = data.slice();
    if (value == "ltoh") {
      records.sort((a, b) => {
        var keyA = a.Ratings,
          keyB = b.Ratings;
        if (keyA < keyB) return -1;
        if (keyA > keyB) return 1;
        return 0;
      });
    } else if (value == "htol") {
      records.sort((a, b) => {
        var keyA = a.Ratings,
          keyB = b.Ratings;
        if (keyA < keyB) return 1;
        if (keyA > keyB) return -1;
        return 0;
      });
    } else if (value == "ltohD") {
      records.sort((a, b) => {
        let keyA = a.Discount;
        let keyB = b.Discount;
        if (+keyA < +keyB) return -1;
        if (+keyA > +keyB) return 1;
        return 0;
      });
    } else if (value == "htolD") {
      records.sort((a, b) => {
        let keyA = a.Discount;
        let keyB = b.Discount;
        if (+keyA < +keyB) return 1;
        if (+keyA > +keyB) return -1;
        return 0;
      });
    } else if (value == "ltohP") {
      records.sort((a, b) => {
        let keyA = a.Payment;
        let keyB = b.Payment;
        if (+keyA < +keyB) return -1;
        if (+keyA > +keyB) return 1;
        return 0;
      });
    } else if (value == "htolP") {
      records.sort((a, b) => {
        let keyA = a.Payment;
        let keyB = b.Payment;
        if (+keyA < +keyB) return 1;
        if (+keyA > +keyB) return -1;
        return 0;
      });
    }
    console.log(records);
    setPosts(records);
  };
  const getDetails = (d) => {
    console.log(d);
    return navigate(`/shopdetails/${d}`);
  };
  const addService = (d) => {
    if (localStorage.getItem("car-service-shop-cart") == null) {
      localStorage.setItem("car-service-shop-cart", JSON.stringify([]));
    }
    let array = JSON.parse(localStorage.getItem("car-service-shop-cart"));
    console.log(array);
    for (let i = 0; i < array.length; i++) {
      if (array[i].id == d.id) {
        alert("Service Already in Cart!");
        return;
      }
    }
    array.push(d);
    localStorage.setItem("car-service-shop-cart", JSON.stringify(array));
    alert("Service is added to your cart!");
  };
  useEffect(() => {
    setPosts(data);
  }, []);
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  let currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  return (
    <>
      <div className="search-container">
        <div>
          <input
            className="seach-box"
            type="number"
            placeholder="Search Shops Near From You(In Number)(KM)"
            onChange={(e) => {
              setDist(e.target.value);
            }}
          />
        </div>
        <div>
          <select
            onChange={(e) => setLocation(e.target.value)}
            style={{ height: "30px" }}
          >
            <option value="">choose your location</option>
            <option value="Mp Nagar">Mp Nagar</option>
            <option value="Kolar">Kolar</option>
            <option value="Piplani Petrol Pump">Piplani Petrol Pump</option>
            <option value="Board Office">Board Office</option>
            <option value="katara hills">katara hills</option>
            <option value="Jahangirabad">Jahangirabad</option>
            <option value="HB Road">HB Road</option>
            <option value="Shahpura Lake">Shahpura Lake</option>
            <option value="Vip">Vip</option>
          </select>
        </div>
        <div>
          <button onClick={search}>Search</button>
        </div>
      </div>

      <div className="filters-container">
        <div className="select">
          <select onChange={filterRecords}>
            <option value="">Filter Shops By Discount Offered</option>
            <option value="ltohD">Low to High</option>
            <option value="htolD">High to Low</option>
          </select>
        </div>
        <br />
        <div className="select">
          <select onChange={filterRecords}>
            <option value="">Filter Shops By Payment</option>
            <option value="ltohP">Low to High</option>
            <option value="htolP">High to Low</option>
          </select>
        </div>

        <br />
        <div className="select">
          <select onChange={filterRecords}>
            <option value="">Filter Shops By Rating</option>
            <option value="ltoh">Low to High</option>
            <option value="htol">High to Low</option>
          </select>
        </div>
      </div>
      <div className="shops-container">
        {posts.map((d) => (
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
              <button onClick={() => getDetails(d.id)}>Get Details</button>
              <button
                className="btns"
                id="btn-effects"
                onClick={() => addService(d)}
              >
                ADD THIS SERVICE
              </button>
            </div>
          </>
        ))}
      </div>
      {/* <Pagination
      postPerPage={postsPerPage}
      totalPosts={posts.length}
      paginate={paginate}
      /> */}
    </>
  );
};
