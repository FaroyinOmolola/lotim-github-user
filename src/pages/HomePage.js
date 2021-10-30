import React, { useEffect, useState } from "react";
import { Container, Card, Button, Col, Row } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUserAction } from "../actions/UserActions.js";
import { getOneUser } from "../AxiosCall";
import Loading from "../Loading";

function HomePage(props) {
	const getUser = useSelector((state) => state.users);
	const { loading, users } = getUser;
	const [nextId, setNextId] = useState(0);
	const [prevId, setPrevId] = useState(0);

	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(getUserAction(nextId));
	}, [dispatch, nextId]);

	return (
		<div>
			{loading ? (
				<Loading />
			) : (
				<Container className="bg-white py-4 con">
					{!users && (
						<p className="text-center text-warning">
							User not found!
						</p>
					)}
					{users &&
						users?.map((elm) => (
							<Card
								key={elm.id}
								style={{ width: "90%" }}
								className="mb-4 mx-auto card border-0 p-3"
							>
								<Row>
									<Col xs={12} md={4} className="txt-cen">
										<Card.Img
											variant="top"
											style={{
												width: "200px",
												height: "auto",
											}}
											className="rounded-circle txt-cen mx-auto"
											src={elm.avatar_url}
										/>
									</Col>
									<Col xs={12} md={8}>
										<ProfileDetails id={elm.login} />
									</Col>
								</Row>
							</Card>
						))}

					{users && (
						<Row className="my-3">
							<Col className="text-center">
								<Button
									disabled={prevId === 0 ? true : false}
									className="mx-3 bg-color"
									onClick={() => {
										setPrevId(
											prevId - 10 < 0 ? 0 : prevId - 10
										);
										setNextId(prevId);
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
										const len = users.length;
										setPrevId(users[0].id - 1);
										setNextId(users[len - 1].id);
									}}
								>
									Next >{" "}
								</Button>
							</Col>
						</Row>
					)}
				</Container>
			)}
		</div>
	);
}

export default HomePage;

const ProfileDetails = ({ id }) => {
	const [details, setDetails] = useState({});
	let history = useHistory();

	useEffect(() => {
		(async () => {
			try {
				const { data } = await getOneUser(id);
				setDetails(data);
			} catch (err) {}
		})();
	}, [id]);

	return (
		<Card.Body>
			<Card.Title className="txt-cen">{details.name}</Card.Title>
			<Card.Text className="txt-cen">Username: {details.login}</Card.Text>
			<Card.Text>
				<img
					src="/images/pin.png"
					alt=""
					className="me-2"
					style={{
						width: "23px",
					}}
				/>
				Location: {details.location || "NA"}
			</Card.Text>
			<Row>
				<Col xs={12} md={6}>
					<Card.Text className="mb-3">
						<img
							src="/images/followers.png"
							alt=""
							className="me-2"
							style={{
								width: "23px",
							}}
						/>
						Followers: {details.followers}
					</Card.Text>
				</Col>
				<Col xs={12} md={6}>
					<Card.Text className="mb-3">
						<img
							src="/images/add.png"
							alt=""
							className="me-2"
							style={{
								width: "27px",
							}}
						/>
						Following: {details.following}
					</Card.Text>
				</Col>
			</Row>

			<Button
				className="btn-color my-3  rounded-pill p-2 w-100"
				onClick={() => history.push(`/user/${id}`)}
			>
				VIEW PROFILE
			</Button>
		</Card.Body>
	);
};
