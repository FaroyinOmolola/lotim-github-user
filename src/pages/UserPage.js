import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container, Card, Button, Col, Row } from "react-bootstrap";
import { getOneUserAction } from "../actions/UserActions.js";
import { getRandom } from "../AxiosCall";
import Loading from "../Loading";

const colors = ["#c74a4a", "#afc74a", "#6f4ff9", "#4fe3f9", "#f54ff9"];

function UserPage(props) {
	const getOneUser = useSelector((state) => state.oneUser);
	const { oneUser, loading } = getOneUser;

	const _id = props.match.params?.id;
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(getOneUserAction(_id));
	}, [dispatch, _id]);

	return (
		<div>
			{loading ? (
				<Loading />
			) : (
				<Container className="py-4">
					<Row>
						<Col xs={12} md={5}>
							<div className="bg-white p-3 mx-2 mb-3 text-center">
								<div className="text-center mb-3">
									<img
										style={{
											width: "200px",
											height: "auto",
										}}
										alt={oneUser?.name}
										className="rounded-circle mx-auto"
										src={oneUser?.avatar_url}
									/>
								</div>
								<h1 className="fs-3">{oneUser?.name}</h1>
								<p>Username: {oneUser?.login}</p>
								<p>
									<img
										src="/images/pin.png"
										alt=""
										className="mx-2"
										style={{
											width: "23px",
										}}
									/>
									Location: {oneUser?.location || "NA"}
								</p>
								<div className="d-flex align-items-center justify-content-center w-100 mb-2">
									<ImageLap link={oneUser?.followers_url} />{" "}
									<span className="ms-2">
										{" "}
										{oneUser?.followers} followers
									</span>
								</div>
								<div className="d-flex align-items-center justify-content-center w-100">
									<ImageLap link={oneUser?.following_url} />{" "}
									<span className="ms-2">
										{" "}
										{oneUser?.following} following
									</span>
								</div>
							</div>
						</Col>
						<Col className="bg-white p-3 " xs={12} md={7}>
							<div>
								<h1 className="fs-3 text-center">
									Repositories
								</h1>
								<Repository post={oneUser?.repos_url} />
							</div>
						</Col>
					</Row>
				</Container>
			)}
		</div>
	);
}

export default UserPage;

const Repository = ({ post }) => {
	const [loading, setLoading] = useState(false);
	const [page, setPage] = useState(1);
	const [data, setData] = useState("");
	useEffect(() => {
		(async () => {
			try {
				setLoading(true);
				const { data } = await getRandom(post, page, 10);
				setData(data);
				setLoading(false);
			} catch (err) {}
		})();
	}, [post, page]);

	return (
		<div>
			{" "}
			{loading && <Loading />}
			{data &&
				data?.map((elm) => (
					<Card key={elm.id} className="mb-4 border-0">
						<Card.Header
							as="h5"
							className="color"
							style={{ background: "#2da44e12" }}
						>
							{elm.name}
						</Card.Header>
						<Card.Body>
							<Card.Text style={{ color: "#adadad" }}>
								Description:{" "}
								{elm.description || "Desciption not available"}
							</Card.Text>
							<div className="d-flex flex-wrap">
								<span className="me-2">Language:</span>{" "}
								<Language url={elm.languages_url} />
							</div>
							<Row className="dt-txt mt-3">
								<Col xs={12} md={6} className="mb-3">
									<Card.Text>
										Created On:{" "}
										{new Date(
											`${elm.created_at}`
										).toDateString()}
									</Card.Text>
								</Col>
								<Col
									xs={12}
									md={6}
									className="text-md-end mb-3 text-sm-start"
								>
									<Card.Text>
										Updated On:{" "}
										{new Date(
											`${elm.updated_at}`
										).toDateString()}
									</Card.Text>
								</Col>
							</Row>
							<div className="d-flex align-items-center  w-100 mb-2">
								<span className="me-2">Contributors:</span>
								<ImageLap link={elm.contributors_url} />{" "}
							</div>

							<a
								href={elm.html_url}
								className="btn btn-color p-2 w-100 my-3 rounded-pill text-decoration-none color"
								target="_blank"
								rel="noreferrer"
							>
								View Repo{" "}
							</a>
						</Card.Body>
					</Card>
				))}
			<Row className="my-3">
				<Col className="text-center">
					<Button
						disabled={page === 1 ? true : false}
						className="mx-3 bg-color"
						onClick={() => {
							setPage((prev) => (prev > 1 ? prev - 1 : 1));
						}}
					>
						{" "}
						{"<"}Back
					</Button>
				</Col>
				<Col className="text-center">
					<Button
						className="mx-3 bg-color"
						onClick={() => {
							setPage((prev) => prev + 1);
						}}
					>
						Next >{" "}
					</Button>
				</Col>
			</Row>
		</div>
	);
};

const Language = ({ url }) => {
	const [data, setData] = useState("");
	useEffect(() => {
		(async () => {
			try {
				const { data } = await getRandom(url);
				setData(data);
			} catch (err) {}
		})();
	}, [url]);
	let lang = Object.keys(data);

	return (
		<>
			{lang.map((elm, index) => {
				const colorIndex = Math.round(Math.random() * 4);

				return (
					<Row key={index}>
						<Col className="d-flex me-4 align-items-center">
							<div
								className="dot me-1"
								style={{ background: `${colors[colorIndex]}` }}
							></div>
							{!lang && <span>Not available</span>}
							<span>{elm}</span>
						</Col>
					</Row>
				);
			})}
		</>
	);
};

const ImageLap = ({ link }) => {
	const [_data, setData] = useState([]);

	useEffect(() => {
		(async () => {
			try {
				const l = link.replace(/\{.*\}/g, "");
				const { data } = await getRandom(l, 1, 4);
				data.length = 4;
				setData(data);
			} catch (err) {}
		})();
	}, [link]);

	return (
		<div className="overlapping-image">
			{_data.map((value, index) => (
				<img
					style={{
						width: "50px",
						height: "auto",
					}}
					key={index}
					className="rounded-circle"
					src={value.avatar_url}
					alt={value.name}
				/>
			))}
		</div>
	);
};
