import {
	GET_USER_SUCCESS,
	GET_USER_REQUEST,
	GET_USER_FAIL,
	GET_ONE_USER_SUCCESS,
	GET_ONE_USER_REQUEST,
	GET_ONE_USER_FAIL,
} from "../constants/UserConstants.js";
import { getUser, getOneUser } from "../AxiosCall.js";

export const getUserAction = (num) => async (dispatch) => {
	try {
		dispatch({
			type: GET_USER_REQUEST,
			payload: num,
		});
		const { data } = await getUser(num);
		dispatch({
			type: GET_USER_SUCCESS,
			payload: data,
		});
	} catch (error) {
		dispatch({
			type: GET_USER_FAIL,
			payload:
				error.response && error.response.data?.message
					? error.response.data.message
					: error.message,
		});
	}
};

export const searchUserAction = (id) => async (dispatch) => {
	try {
		dispatch({
			type: GET_USER_REQUEST,
			payload: id,
		});
		const { data } = await getOneUser(id);
		dispatch({
			type: GET_USER_SUCCESS,
			payload: data ? [data] : null,
		});
	} catch (error) {
		dispatch({
			type: GET_USER_FAIL,
			payload:
				error.response && error.response.data?.message
					? error.response.data.message
					: error.message,
		});
	}
};

export const getOneUserAction = (id) => async (dispatch) => {
	try {
		dispatch({
			type: GET_ONE_USER_REQUEST,
			payload: id,
		});
		const { data } = await getOneUser(id);
		dispatch({
			type: GET_ONE_USER_SUCCESS,
			payload: data,
		});
	} catch (error) {
		dispatch({
			type: GET_ONE_USER_FAIL,
			payload:
				error.response && error.response.data?.message
					? error.response.data.message
					: error.message,
		});
	}
};
