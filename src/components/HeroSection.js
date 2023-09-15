import React from "react";
import { Link } from "react-router-dom";
import "../App.css";
import { Button } from "./Button";
import "./HeroSection.css";

function HeroSection() {
	return (
		<div className="hero-container">
			<video src="/videos/video-1.mp4" autoPlay loop muted />
			<h1>SAHADEVA</h1>
			<p>Your Partner to all the Technical queries!</p>
			<div className="hero-btns">
				<Link to="/chat" className="btn-mobile">
					<Button className="btns" buttonStyle="btn--outline" buttonSize="btn--large">
						Ask Me!
					</Button>
				</Link>
			</div>
		</div>
	);
}

export default HeroSection;
