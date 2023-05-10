import React, { Component } from "react";
import "../css/movieCard.css";

class MovieCard extends Component {
	state = {};

	styles = {
		background: `url(${this.props.poster})`,
		backgroundSize: "cover",
		backgroundPosition: "100% 80%",
	};

	render() {
		return (
			<React.Fragment>
				<div className="containerMovie">
					<div className="movie-card">
						<div className="movie-header" style={this.styles}></div>
						<div className="movie-content">
							<div className="movie-content-header">
								<h3 className="movie-title">{this.props.title}</h3>
							</div>
							<div className="movie-info">
								<div className="info-section">
									<label>Year</label>
									<span>{this.props.year}</span>
								</div>
								<div className="info-section">
									<label>Type</label>
									<span>{this.props.type}</span>
								</div>
							</div>
						</div>
					</div>
				</div>
			</React.Fragment>
		);
	}
}

export default MovieCard;
