import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatchCart, useCart } from "./ContextReducer";

export default function Card(props) {
	const data = useCart();
	const navigate = useNavigate();
	const priceRef = useRef();
	let options = props.options;
	let priceOptions = Object.keys(options);
	
	const [qty, setQty] = useState(1);
	const [size, setSize] = useState("");
	const foodItem = props.item; //foodItems
	//const foodItem = props.foodItems; //foodItems
	const dispatch = useDispatchCart();

	const handleClick = () => {
		if (!localStorage.getItem("authToken")) {
			navigate("/login");
		}
	};

	// const handleQty = (e) => {
	//   setQty(parseInt(e.target.value));
	// };
	const handleQty = (e) => {
		const parsedQty = parseInt(e.target.value);
		setQty(isNaN(parsedQty) ? 1 : parsedQty);
	};

	const handleOptions = (e) => {
		setSize(e.target.value);
	};

	const handleAddToCart = async () => {
		let food = null;
		for (const item of data) {
			if (item.id === (props.foodItem && props.foodItem._id)) {
				food = item;
				break;
			}
		}


		if (food) {
			if (food.size === size) {
				await dispatch({
					type: "UPDATE",
					id: props.foodItem && props.foodItem._id,
					name: foodItem.name,
					price: finalPrice,
					qty: qty,
				});
				return;
			} else {
				await dispatch({
					type: "ADD",
					id: props.foodItem && props.foodItem._id,
					name: foodItem.name,
					price: finalPrice,
					qty: qty,
					size: size,
					img: props.ImgSrc,
				});
				console.log("Size is different, so simply add one more to the list");
				return;
			}
		}

		await dispatch({
			type: "ADD",
			id: props.foodItem && props.foodItem._id,
			name: foodItem.name,
			price: finalPrice,
			qty: qty,
			size: size,
		});
	};

	// const handleAddToCart = () => {
	// 	if (!foodItem || !foodItem._id) {
	// 	  // Handle the case when foodItem is undefined or doesn't have _id property
	// 	  console.log("Invalid food item or missing _id property");
		  
	// 	}
	  
	// 	const existingFood = data.find((item) => item.id === props.foodItem?._id);
	  
	// 	if (existingFood) {
	// 	  if (existingFood.size === size) {
	// 		dispatch({
	// 		  type: "UPDATE",
	// 		  id:  props.foodItem?._id,
	// 		  price: finalPrice,
	// 		  qty: qty
	// 		});
	// 	  } else {
	// 		dispatch({
	// 		  type: "ADD",
	// 		  id:  props.foodItem?._id,
	// 		name: props.name,
	// 		  price: finalPrice,
	// 		  qty: qty,
	// 		  size: size,
	// 		  img: props.ImgSrc
	// 		});
	// 		console.log("Size is different, so simply add one more to the list");
	// 	  }
	// 	} else {
	// 	  dispatch({
	// 		type: "ADD",
	// 		id:  props.foodItem?._id,
	// 		//name: props.food_items?.name,
	// 		name: props.name,
	// 		price: finalPrice,
	// 		qty: qty,
	// 		size: size
	// 	  });
	// 	}
	//   };
	  
	useEffect(() => {
		setSize(priceOptions[0]); // Set the initial size based on the first option
	}, [priceOptions]);

	const finalPrice = qty * parseInt(options[size]);

	return (
		<div>
			<div className="card mt-3" style={{ width: "20rem", maxHeight: "375px" }}>
				<img
					src={props.imgSrc}
					className="card-img-top"
					alt="..."
					style={{ height: "125px", objectFit: "fill" }}
				/>
				<div className="card-body">
					<h5 className="card-title">{props.foodName}</h5>
					<p className="card-text">{props.description}</p>
					
					<div className="container w-100 p-0" style={{ height: "36px" }}>
						<select
							className="m-2 h-100 w-20 bg-success text-black rounded"
							style={{ select: "#FF0000" }}
							onClick={handleClick}
							onChange={handleQty}
						>
							{Array.from(Array(6), (e, i) => (
								<option key={i + 1} value={i + 1}>
									{i + 1}
								</option>
							))}
						</select>
						<select
							className="m-2 h-100 w-20 bg-success text-black rounded"
							style={{ select: "#FF0000" }}
							ref={priceRef}
							onClick={handleClick}
							onChange={handleOptions}
						>
							{priceOptions.map((data) => (
								 <option key={data} value={data}>
									{data}
								</option>
							))}
						</select>
						<div className="d-inline ms-2 h-100 w-20 fs-5">₹{finalPrice}/-</div>
					</div>
					<hr />
					<button
						className="btn btn-success justify-center ms-2"
						onClick={handleAddToCart}
					>
						Add to Cart
					</button>
				</div>
			</div>
		</div>
	);
}
