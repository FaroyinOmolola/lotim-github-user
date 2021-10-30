import React from "react";
import { Spinner } from "react-bootstrap";

function Loading() {
	return (
		<div className="loader">
			<Spinner
				animation="border"
				className="fs-1 color  rounded-circle"
			/>
		</div>
	);
}

export default Loading;
