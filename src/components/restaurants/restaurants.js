import { useEffect, useState } from "react";
import axios from "axios";

import "./restaurants.css";

import rate0 from "../assets/0rate.jpg";
import rate1 from "../assets/1rate.jpg";
import rate2 from "../assets/2rate.jpg";
import rate3 from "../assets/3rate.jpg";
import rate4 from "../assets/4rate.jpg";
import rate5 from "../assets/5rate.jpg";

import { TiTick } from "react-icons/ti";

function checkRate(rate) {
  if (rate > 4) {
    return rate5;
  } else if (rate > 3 && rate <= 4) {
    return rate4;
  } else if (rate > 2 && rate <= 3) {
    return rate3;
  } else if (rate > 1 && rate <= 2) {
    return rate2;
  } else if (rate > 0 && rate <= 1) {
    return rate1;
  } else {
    return rate0;
  }
}

export default function Restaurants({ searchedValue, data }) {
  const [displayedRestaurants, setDisplayedRestaurants] = useState([]);
  const [selectValue, setSelectValue] = useState(5);
  const [success, setSuccess] = useState(false)

  useEffect(() => {
    setDisplayedRestaurants(data);
  }, [data]);

  useEffect(() => {
    const filtered = data.filter((item) =>
      item.name.toLowerCase().includes(searchedValue.toLowerCase().trim())
    );
    setDisplayedRestaurants(filtered);
  }, [searchedValue]);

  const handleSelectChange = (e) => {
    setSelectValue(e.target.value);
  };

  const handleSubmit = (e) => {
    e.target.disabled = true;

    const btn = document.getElementById("submitBtn");
    btn.style.backgroundColor = "#D3D3D3";

    const clickedKey = e.target.getAttribute("data-key");

    data.filter((item) => {
      if (item.id === +clickedKey) {
        let newRate = (item.rating + +selectValue) / 2;
        let setData = async () => {
          try {
            let response = await axios.post(
              "http://localhost:3001/restaurant",
              { newRate, id: item.id }
            );
            if(response.status === 200){
              setSuccess(true)
            }
          } catch (err) {
            console.log(err);
          }
        };

        setData();
      }
    });
  };

  return (
    <div id="restaurantsMainContainer">
      {displayedRestaurants.length === 0 ? (
        <div>There isn't matching restaurant</div>
      ) : (
        displayedRestaurants.map((item, index) => {
          return (
            <div className="restaurantItem" key={index}>
              <div className="firstPart">
                <img
                  src={require(`../../components/assets/${item.image}`)}
                  alt={item.name}
                  className="restPic"
                ></img>
                <div className="nameAndRateContainer">
                  <a href={item.page} target="_blank">
                    <h3 className="restNameDiv">
                      {item.name}
                      <span className="show">Go to the site</span>
                    </h3>
                  </a>
                  <div>{item.priceCategory}</div>
                  <div className="ratingContainer">
                    <h5>Rating: {item.rating.toFixed(1)} </h5>
                    <img
                      src={checkRate(item.rating)}
                      className="starPic"
                      alt="ratingStars"
                    ></img>
                  </div>
                </div>
              </div>
              <div className="secondPart">
                <h1>Description</h1>
                <div>{item.description}</div>
                <div className="rateSelectContainer">
                  <h5>Rate please</h5>
                  <select onChange={handleSelectChange}>
                    <option>5</option>
                    <option>4</option>
                    <option>3</option>
                    <option>2</option>
                    <option>1</option>
                    <option>0</option>
                  </select>
                </div>
                <div className="btnContainer">
                  <button
                    onClick={handleSubmit}
                    data-key={item.id}
                    id="submitBtn"
                  >
                    submit your choice
                  </button>
                  {
                    success ? <div className="greetings">
                                <span>Thanks for review</span>
                                <TiTick />
                              </div>   : null
                  }
                </div>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
}
