// import necessary dependencies
import axios from 'axios';
import { writable } from 'svelte/store';

// create a writable store to track the current data type
export const dataTypeStore = writable('movie'); // defaults to 'movie'
const BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = import.meta.env.VITE_API_KEY;
// create a unified fetchData function
export async function fetchData(dataType, endpoint, queryParameters = '', searchQuery = '') {
	try {
		let url;

		if (searchQuery) {
			// If there's a search query, use the search endpoint
			url = `${BASE_URL}/search/${dataType}?api_key=${API_KEY}&language=en-US&query=${searchQuery}`;
		} else {
			// Otherwise, use the specified endpoint
			url = `${BASE_URL}/${dataType}/${endpoint}?api_key=${API_KEY}&language=en-US${queryParameters}`;
		}

		const response = await axios.get(url);
		return response.data.results;
	} catch (error) {
		console.error(`An error occurred while fetching the ${dataType}s:`, error);
		return [];
	}
}

export async function fetchGenres(dataType) {
	try {
		const url = `${BASE_URL}/genre/${dataType}/list?api_key=${API_KEY}&language=en-US`;
		const response = await axios.get(url);
		return response.data.genres;
	} catch (error) {
		console.error(`An error occurred while fetching the genres:`, error);
		return [];
	}
}
