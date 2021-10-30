import axios from "axios";

//created axios instance and interceptors
const userInstance = axios.create({
	baseURL: "http://api.github.com",
});

//user axios call
export const getUser = (num) => {
	return userInstance.get(`/users?per_page=10&since=${num || 0}`);
};

export const getOneUser = (id) => {
	return userInstance.get(`/users/${id}`);
};

export const getRandom = (url, page = 1, per_page = 10) => {
	return userInstance.get(`${url}?page=${page}&per_page=${per_page}`);
};
