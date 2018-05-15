import React, {Component} from "react";
import {connect} from "react-redux";
import "../css/ListHeader.css";
import {Link} from "react-router-dom";

class ListHeaderContainer extends Component {
	constructor(props) {
		super(props);
	}
	componentDidMount() {
		console.log(this.props.toonInfo);
	}
	render() {
		return (
			<div className="list-header-container">
				<div className="list-header">
					<div>
						<div className="list-header-left">
							<span className="backbutton">
								<Link to="/">〈</Link>
							</span>
							<span className="list-header-title">
								{this.props.toonInfo.toon_info_title_name}
							</span>
						</div>
						<div className="list-header-right">
							<span className="like">
								<a href="#">관심</a>
							</span>
							<span className="first-chapter">
								<a href="#">첫화보기</a>
							</span>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToPrpos = state => {
	return {
		toonInfo: state.listContentsReducer.toonInfo
	};
};

const mapDispatchToProps = dispatch => {
	let self = {};
	return self;
};

export default connect(mapStateToPrpos, mapDispatchToProps)(
	ListHeaderContainer
);
