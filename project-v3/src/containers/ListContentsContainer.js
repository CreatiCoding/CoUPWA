import React, {Component} from "react";
import {connect} from "react-redux";
import InfiniteScroll from "react-infinite-scroller";
import * as actions from "../actions";
import coupwaFetch from "../lib/coupwaFetch";

class ListContentsContainer extends Component {
	constructor(props) {
		super(props);
		this.state = {
			tracks: [],
			hasMoreItems: true,
			nextHref: null
		};
	}
	loadItems(page) {
		let tracks = this.state.tracks;
		tracks.push(tracks.length);
		this.setState({
			tracks: tracks
		});
	}

	componentDidMount() {}
	render() {
		const loader = <div className="loader">Loading ...</div>;
		let items = [];
		this.state.tracks.map((track, i) => {
			items.push(
				<div className="track" key={i}>
					{track}
				</div>
			);
		});

		let style = {height: "700px", overflow: "auto"};
		return (
			<InfiniteScroll
				pageStart={0}
				loadMore={this.loadItems.bind(this)}
				hasMore={true}
				loader={loader}
			>
				<div className="tracks">{items}</div>
			</InfiniteScroll>
		);
	}
}

const mapStateToPrpos = state => {
	return {};
};

const mapDispatchToProps = dispatch => {
	return {};
};
export default connect(mapStateToPrpos, mapDispatchToProps)(
	ListContentsContainer
);
