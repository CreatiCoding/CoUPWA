import React from "react";
import {Link} from "react-router-dom";

const ListRoute = () => {
	return (
		<div>
			List
			<Link to="/">
				<span>프로그레시브 웹툰</span>
			</Link>
		</div>
	);
};

export default ListRoute;
