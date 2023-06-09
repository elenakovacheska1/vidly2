import React, { Component } from "react";
import DisplayError from "../common/displayError";
import FormGroup from "../common/formGroup";
import config from "../utils/config.json";
import Joi from "joi-browser";
import axios from "axios";
import { toast } from "react-toastify";
import { saveToLocalDb } from "./../services/localdbService";

const { baseUrl, port, usersUrl } = config;

class Register extends Component {
	state = {
		username: "",
		password: "",
		name: "",
		errors: { username: "", password: "", name: "" },
		usernameValid: false,
		passwordValid: false,
		nameValid: false,
		formValid: false,
	};

	schema = {
		username: Joi.string()
			.required()
			.email()
			.label("Username"),
		password: Joi.string()
			.required()
			.min(5)
			.label("Password"),
		name: Joi.string()
			.required()
			.label("Name"),
	};

	componentDidMount() {
		toast("Please sign up", {
			toastId: "signup",
		});
	}

	validateForm = () => {
		const { usernameValid, passwordValid, nameValid } = this.state;
		if (usernameValid && passwordValid && nameValid) {
			this.setState({ formValid: true });
		} else {
			this.setState({ formValid: false });
		}
	};

	validateField = (fieldName, value) => {
		const obj = {
			[fieldName]: value,
		};

		const fieldSchema = {
			[fieldName]: this.schema[fieldName],
		};

		const result = Joi.validate(obj, fieldSchema);
		const errorMessage =
			result.error === null ? "" : result.error.details[0].message;
		const fieldValidValue = errorMessage === "" ? true : false;
		const errors = { ...this.state.errors };
		errors[fieldName] = errorMessage;
		const fieldValid = `${fieldName}Valid`;
		this.setState({ [fieldValid]: fieldValidValue, errors }, this.validateForm);
	};

	saveUserToLS = () => {
		const { username, password, name } = this.state;
		if (!username || !password || !name) return;
		localStorage.setItem("user", JSON.stringify({ name: name }));
		const allUsersStr = localStorage.getItem("allUsers");
		const currentUser = {
			name: name,
			email: username,
			password: password,
		};

		let users = [];
		if (!allUsersStr) {
			users.push(currentUser);
		} else {
			users = [...JSON.parse(allUsersStr), currentUser];
		}
		localStorage.setItem("allUsers", JSON.stringify(users));
	};

	handleSubmit = (e) => {
		e.preventDefault();
		this.saveUserToLS();
		window.location = "/movies";
	};

	handleChange = (e) => {
		const name = e.target.name;
		const value = e.target.value;
		this.setState({ [name]: value }, () => this.validateField(name, value));
	};

	render() {
		const { username, password, name, errors, formValid } = this.state;
		return (
			<form onSubmit={this.handleSubmit} className="MainContainer">
				<FormGroup
					fieldLabel="Username"
					fieldName="username"
					fieldValue={username}
					onChange={this.handleChange}
					type="text"
					placeholder="Enter username"
				/>
				<DisplayError errorMessage={errors.username} />
				<FormGroup
					fieldLabel="Password"
					fieldName="password"
					fieldValue={password}
					onChange={this.handleChange}
					type="password"
					placeholder="Enter password"
				/>
				<DisplayError errorMessage={errors.password} />
				<FormGroup
					fieldLabel="Name"
					fieldName="name"
					fieldValue={name}
					onChange={this.handleChange}
					type="text"
					placeholder="Enter name"
				/>
				<DisplayError errorMessage={errors.name} />
				<button type="submit" className="btn btn-primary" disabled={!formValid}>
					Register
				</button>
			</form>
		);
	}
}

export default Register;
