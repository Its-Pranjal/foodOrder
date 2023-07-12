import React, { useEffect, useState } from "react";
import Card from "../components/Card";

import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

const Home = () => {
	const [foodCat, setFoodCat] = useState([]);
	const [foodItems, setFoodItems] = useState([]);
	const [search, setSearch] = useState("");

	const loadFoodItems = async () => {
		try {
			let response = await fetch("http://localhost:5000/api/displayData", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
			});
			response = await response.json();
			setFoodItems(response[0]);
			setFoodCat(response[1]);
		} catch (error) {
			console.error(error);
		}
	};

	// const loadFoodItems = async () => {
	// 	try {
	// 	  const response = await fetch("http://localhost:5000/api/displayData", {
	// 		method: "POST",
	// 		headers: {
	// 		  "Content-Type": "application/json",
	// 		},
	// 	  });
	// 	  const data = await response.json();
	// 	  setFoodItems(data.foodItems || []); // Set foodItems state to the fetched data or an empty array if data is null
	// 	  setFoodCat(data.foodCat || []); // Set foodCat state to the fetched data or an empty array if data is null
	// 	} catch (error) {
	// 	  console.error(error);
	// 	}
	//   };

	useEffect(() => {
		loadFoodItems();
	}, []);

	return (
		<div>
			<Navbar />
			<div
				id="carouselExampleFade"
				className="carousel slide carousel-fade "
				data-bs-ride="carousel"
			>
				<div className="carousel-inner " id="carousel">
					<div className=" carousel-caption  " style={{ zIndex: "9" }}>
						<div className=" d-flex justify-content-center">
							{/* justify-content-center, copy this <form> from navbar for search box */}
							<input
								className="form-control me-2 w-75 bg-white text-dark"
								type="search"
								placeholder="Type in..."
								aria-label="Search"
								value={search}
								onChange={(e) => {
									setSearch(e.target.value);
								}}
							/>
						</div>
					</div>
					<div className="carousel-item active">
						<img
							src="https://source.unsplash.com/random/900x700/?burger"
							className="d-block w-100  "
							style={{ filter: "brightness(30%)" }}
							alt="..."
						/>
					</div>
					<div className="carousel-item">
						<img
							src="https://source.unsplash.com/random/900x700/?momos"
							className="d-block w-100 "
							style={{ filter: "brightness(30%)" }}
							alt="..."
						/>
					</div>
					<div className="carousel-item">
						<img
							src="https://source.unsplash.com/random/900x700/?barbeque"
							className="d-block w-100 "
							style={{ filter: "brightness(30%)" }}
							alt="..."
						/>
					</div>
				</div>
				<button
					className="carousel-control-prev"
					type="button"
					data-bs-target="#carouselExampleFade"
					data-bs-slide="prev"
				>
					<span
						className="carousel-control-prev-icon"
						aria-hidden="true"
					></span>
					<span className="visually-hidden">Previous</span>
				</button>
				<button
					className="carousel-control-next"
					type="button"
					data-bs-target="#carouselExampleFade"
					data-bs-slide="next"
				>
					<span
						className="carousel-control-next-icon"
						aria-hidden="true"
					></span>
					<span className="visually-hidden">Next</span>
				</button>
			</div>

			<div className="container">
				{foodCat.length !== 0 ? (
					foodCat.map((data) => (
						<div key={data.id} className="row mb-3">
							<div className="fs-3 m-3">{data.CategoryName}</div>
							<hr
								id="hr-success"
								style={{
									height: "4px",
									backgroundImage:
										"-webkit-linear-gradient(left,rgb(0, 255, 137),rgb(0, 0, 0))",
								}}
							/>
							{foodItems.length !== 0 ? (
								foodItems
									.filter(
										(item) =>
											item.CategoryName === data.CategoryName &&
											item.name.toLowerCase().includes(search.toLowerCase())
									)
									.map((filterItems) => (
										<div
											key={filterItems.id}
											className="col-12 col-md-6 col-lg-3"
										>
											{console.log(filterItems.url)}
											<Card
												foodName={filterItems.name}
												item={filterItems}
												options={filterItems.options[0]}
												ImgSrc={filterItems.img}
											/>
										</div>
									))
							) : (
								<div>No Such Data</div>
							)}
						</div>
					))
				) : (
					<div></div>
				)}
			</div>

			<Footer />
		</div>
	);
};

export default Home;
