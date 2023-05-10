import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "../App.css";
import "../css/navbar.css";
import "../css/buttons.css";
import Button from "./button";

const NavBar = () => {
	const getCurrentUser = () => {
		const userObj = localStorage.getItem("user");
		if (userObj) return JSON.parse(userObj).name;
		return "";
	};
	const [currentUser, setCurrentUser] = useState(getCurrentUser());

	const buttonClass = "glow-on-hover";
	return (
		<nav className="justify-content-center text-center nav navbar navbar-dark bg-dark navbar-expand-lg mb-5">
			<ul className="nav navbar-nav justify-content-start">
				<li className="nav-item">
					<span className="TextGradient1 logo navbar-brand mb-0 h1">
						💫𝓥𝓲𝓭𝓵𝔂👋
					</span>
				</li>
				<li className="nav-item">
					<Button
						className={buttonClass}
						component={
							<NavLink className="TextGradient1 NavText nav-link" to="/movies">
								Movies
							</NavLink>
						}
					/>
				</li>
				<li className="nav-item">
					<Button
						className={buttonClass}
						component={
							<NavLink
								className="TextGradient1 NavText nav-link"
								to="/customers"
							>
								Customers
							</NavLink>
						}
					/>
				</li>
				<li className="nav-item">
					<Button
						className={buttonClass}
						component={
							<NavLink className="TextGradient1 NavText nav-link" to="/rentals">
								Rentals
							</NavLink>
						}
					/>
				</li>
				<li className="nav-item">
					<Button
						className={buttonClass}
						component={
							<NavLink
								className="TextGradient1 NavText nav-link"
								to="/register"
							>
								Register
							</NavLink>
						}
					/>
				</li>
				{!currentUser && (
					<li className="nav-item">
						<Button
							className={buttonClass}
							component={
								<NavLink className="TextGradient1 NavText nav-link" to="/login">
									Login
								</NavLink>
							}
						/>
					</li>
				)}
				{currentUser && (
					<React.Fragment>
						<li className="nav-item">
							<button
								type="button"
								className={`glow-on-hover`}
								onClick={() => {
									setCurrentUser("");
									localStorage.removeItem("user");
								}}
							>
								Logout
							</button>
						</li>
					</React.Fragment>
				)}

				<li className="nav-item">
					{currentUser ? (
						<div className="alert alert-success" role="alert">
							{`Welcome ${currentUser}!`}
						</div>
					) : (
						<div className="alert alert-success" role="alert">
							{`Welcome User!`}
						</div>
					)}
				</li>
			</ul>
		</nav>
	);
};

export default NavBar;
