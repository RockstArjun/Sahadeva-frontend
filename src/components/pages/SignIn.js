import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import styles from "./Login.module.css";

const SignIn = ({ axiosClient }) => {
	const [formErrors, setFormErrors] = useState({});
	const [isSubmit, setIsSubmit] = useState(false);
	const [user, setUserDetails] = useState({
		email: "",
		password: "",
	});

	const changeHandler = (e) => {
		const { name, value } = e.target;
		setUserDetails({
			...user,
			[name]: value,
		});
	};
	const validateForm = (values) => {
		const error = {};
		const regex = /^[^\s+@]+@[^\s@]+\.[^\s@]{2,}$/i;
		if (!values.email) {
			error.email = "Email is required";
		} else if (!regex.test(values.email)) {
			error.email = "Please enter a valid email address";
		}
		if (!values.password) {
			error.password = "Password is required";
		}
		return error;
	};

	const loginHandler = (e) => {
		e.preventDefault();
		setFormErrors(validateForm(user));
		setIsSubmit(true);
	};

	useEffect(() => {
		if (Object.keys(formErrors).length === 0 && isSubmit) {
			console.log(user);
			const formData = new FormData();
			formData.append("email", user.email);
			formData.append("password", user.password);
			axiosClient.current.post("/login", formData).then((res) => {
				// backend db url
				Swal.fire({ text: res.data.message, icon: "success" });
			});
		}
	}, [formErrors]);
	return (
		<div className={styles.container}>
			<div className={styles.login}>
				<form>
					<h1 style={{ margin: "10px" }}>Login</h1>
					<input
						type="email"
						name="email"
						id="email"
						placeholder="Email"
						onChange={changeHandler}
						value={user.email}
					/>
					<p className={styles.error}>{formErrors.email}</p>
					<input
						type="password"
						name="password"
						id="password"
						placeholder="Password"
						onChange={changeHandler}
						value={user.password}
					/>
					<p className={styles.error}>{formErrors.password}</p>
					<button className={styles.button_common} onClick={loginHandler}>
						Login
					</button>
				</form>
			</div>
		</div>
	);
};
export default SignIn;
