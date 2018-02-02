import React, { Component } from 'react';
import PropTypes from 'prop-types';

const propTypes = {
	curListType: PropTypes.number,
	selectedListType: PropTypes.number,
	listTypes: PropTypes.array,
	isLeftClickable: PropTypes.bool,
	isRightClickable: PropTypes.bool,
	clickTypes: PropTypes.func,
	clickLeft: PropTypes.func,
	clickRight: PropTypes.func,
};

function createWarning(funcName) {
	return () => console.warn(funcName + 'is not defined');
}

const defaultProps = {
	curListType: 0,
	selectedListType: 0,
	listTypes: ['조회순', '업데이트순', '별점순', '제목순', '오픈순'],
	isLeftClickable: false,
	isRightClickable: true,

	clickTypes: createWarning('clickTypes'),
	clickLeft: createWarning('clickLeft'),
	clickRight: createWarning('clickRight'),
};

class ListTypeInfo extends Component {
	render() {
		return (
			<li onClick={()=>{this.props.clickTypes(this.props.seq)}}>
				<a className="dropdown-item" value={this.props.seq}>
					{this.props.ListType}
				</a>
			</li>
		);
	}
}

class MainHeader extends Component {
	constructor(props) {
		super(props);
	}
	render() {
		let pparentStyle = {
			textAlign: 'center',
		};
		let parentStyle = {
			display: 'inline-block',
			width: '100%',
			textAlign: 'center',
		};
		let sideStyle = { display: 'inline' };
		let listTypeStyle = {
			textAlign: 'center',
			display: 'inline-block',
			minWidth: '130px',
		};
		const mapToListType = data => {
			return data.map((ListType, i) => {
				return <ListTypeInfo clickTypes={(n)=>{this.props.clickTypes(n)}} ListType={ListType} key={i} seq={i} />;
			});
		};

		return (
			<div className="hide navbar" style={pparentStyle}>
				<div style={parentStyle}>
					<div
						style={sideStyle}
						className="oi oi-caret-left"
						onClick={this.props.clickLeft}
					/>
					<div style={listTypeStyle} className="dropdown">
						<button className="btn" data-toggle="dropdown">
							{this.props.listTypes[this.props.curListType]}
						</button>
						<ul className="dropdown-menu">
							{mapToListType(this.props.listTypes)}
						</ul>
					</div>
					<div
						style={sideStyle}
						className="oi oi-caret-right"
						onClick={this.props.clickRight}
					/>
				</div>
			</div>
		);
	}
}

MainHeader.propTypes = propTypes;
MainHeader.defaultProps = defaultProps;
export default MainHeader;
