import React, {Component} from "react";
import {connect} from "react-redux";
import InfiniteScroll from "react-infinite-scroller";
import * as actions from "../actions";
import coupwaFetch from "../lib/coupwaFetch";
import ListContents from "../components/ListContents";
import "../css/ListContentsContainer.css";

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

		return (
			<div className="list-contents-container">
				<InfiniteScroll
					pageStart={0}
					loadMore={this.loadItems.bind(this)}
					hasMore={true}
					loader={loader}
				>
					<ListContents items={this.state.tracks} />
				</InfiniteScroll>
			</div>
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
