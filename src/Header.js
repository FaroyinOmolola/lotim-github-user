import React, { useState } from "react";
import { InputGroup, Form, Navbar, Container } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useDispatch } from "react-redux";
import { searchUserAction, getUserAction } from "./actions/UserActions.js";
function Header() {
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();

  return (
    <Navbar style={{ background: "#2DA44E" }} expand="lg">
      <Container>
        <LinkContainer to="/">
          <Navbar.Brand className="text-white">
            <img
              src="/images/github.transparent.png"
              alt=""
              className="mx-3 mb-2"
              style={{
                width: "27px",
              }}
            />
            GitHub Users
          </Navbar.Brand>
        </LinkContainer>

        <InputGroup>
          <Form.Control
            type="search"
            name="search"
            id="search"
            placeholder="Search by username"
            style={{
              borderRight: "none",
              borderRadius: "30px 0 0 30px",
            }}
            className="mx-auto p-2 rounded-0 form-g2"
            onChange={(e) => {
              setSearch(e.target.value);
              if (!search) {
                dispatch(getUserAction());
              }
            }}
          />
          <InputGroup.Text
            id="cityTo"
            className="px-2 search-img text-success"
            style={{
              borderLeft: "none",
              borderRadius: "0 30px 30px 0",
              cursor: "pointer",
            }}
            onClick={() => dispatch(searchUserAction(search.toLowerCase()))}
          >
            {" "}
            Search
          </InputGroup.Text>
        </InputGroup>
      </Container>
    </Navbar>
  );
}

export default Header;
