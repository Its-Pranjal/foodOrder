import React, { useState, useEffect } from "react";
import Card from "../components/Card";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

const Home = () => {
  const [search, setSearch] = useState("");
  const [foodCat, setFoodCat] = useState([]);
  const [foodItems, setFoodItems] = useState([]);

  const loadFoodItems = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/displayData", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      setFoodItems(data[0]);
      setFoodCat(data[1]);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    loadFoodItems();
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    // Handle search submission if needed
  };

  return (
    <div>
      <Navbar />
      <form onSubmit={handleSearchSubmit}>
        <div
          id="carouselExampleControls"
          className="carousel slide"
          data-bs-ride="carousel"
        >
          {/* Carousel code */}
        </div>
        <div className="container">
          {foodCat.length !== 0 ? (
            foodCat.map((data) => (
              <div className="row mb-3" key={data._id}>
                <div className="fs-3 m-3">{data.CategoryName}</div>
                <hr />
                {foodItems
                  .filter(
                    (item) =>
                      item.CategoryName === data.CategoryName &&
                      item.name.toLowerCase().includes(search.toLowerCase())
                  )
                  .map((filterItems) => (
                    <div
                      key={filterItems._id}
                      className="col-12 col-md-6 col-lg-3"
                    >
                      <Card
                        item={filterItems}
                        options={filterItems.options[0]}
                        imgSrc={filterItems.img}
                      />
                    </div>
                  ))}
              </div>
            ))
          ) : (
            <div>No such data found</div>
          )}
        </div>
      </form>
      <Footer />
    </div>
  );
};

export default Home;
