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
			hasMoreItems: true
		};
	}

	loadItems(i) {
		if (this.props.toonList.length === 0) {
			return;
		} else {
			if (i - 2 === this.props.toonList.length) {
				this.setState({
					hasMoreItems: false
				});
				return;
			}
			let tracks = this.state.tracks;

			let lastIdx = tracks[tracks.length - 1].toon_data_seq;
			tracks.push(
				this.props.toonList.filter(ele => {
					return ele.toon_data_seq === lastIdx + 1;
				})[0]
			);
			this.setState({
				tracks: tracks
			});
			return;
		}
	}
	componentWillUnmount() {
		this.props.handleLoadToonList({}, []);
	}
	componentDidMount() {
		coupwaFetch.fetchToonList(this.props.toon_info_idx).then(r => {
			let toonInfo = {
				toon_info_author: r.toon_info_author,
				toon_info_count: r.toon_info_count,
				toon_info_idx: r.toon_info_idx,
				toon_info_intro: r.toon_info_intro,
				toon_info_thumb: r.toon_info_thumb,
				toon_info_title_name: r.toon_info_title_name
			};
			let toonList = r.toonListData;
			let tracks = this.state.tracks;
			tracks.push(toonList[0]);
			this.setState({
				tracks: tracks
			});
			this.props.handleLoadToonList(toonInfo, toonList);
		});
	}
	render() {
		const loader = (
			<div key={0} className="loader">
				로딩중 ...
			</div>
		);

		return (
			<div className="list-contents-container">
				<div className="list-contents">
					<InfiniteScroll
						pageStart={0}
						loadMore={this.loadItems.bind(this)}
						hasMore={this.state.hasMoreItems}
						loader={loader}
					>
						<ListContents
							items={this.state.tracks}
							toonInfo={this.props.toonInfo}
						/>
					</InfiniteScroll>
				</div>
			</div>
		);
	}
}

const mapStateToPrpos = state => {
	return {
		toonInfo: state.listContentsReducer.toonInfo,
		toonList: state.listContentsReducer.toonList
	};
};

const mapDispatchToProps = dispatch => {
	return {
		handleLoadToonList: (toonInfo, toonList) => {
			dispatch(actions.loadToonList(toonInfo, toonList));
		}
	};
};
export default connect(mapStateToPrpos, mapDispatchToProps)(
	ListContentsContainer
);
