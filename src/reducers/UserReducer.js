import {
	GET_USER_SUCCESS,
	GET_USER_REQUEST,
	GET_USER_FAIL,
	GET_ONE_USER_SUCCESS,
	GET_ONE_USER_REQUEST,
	GET_ONE_USER_FAIL,
} from "../constants/UserConstants.js";

export const GetUserReducer = (state = "", action) => {
	switch (action.type) {
		case GET_USER_REQUEST:
			return { loading: true, sucess: false };
		case GET_USER_SUCCESS:
			return {
				loading: false,
				success: true,
				users: action.payload,
			};
		case GET_USER_FAIL:
			return { loading: false, success: false, error: action.payload };

		default:
			return state;
	}
};

export const GetOneUserReducer = (state = "", action) => {
	switch (action.type) {
		case GET_ONE_USER_REQUEST:
			return { loading: true, sucess: false };
		case GET_ONE_USER_SUCCESS:
			return {
				loading: false,
				success: true,
				oneUser: action.payload,
			};
		case GET_ONE_USER_FAIL:
			return { loading: false, success: false, error: action.payload };

		default:
			return state;
	}
};
