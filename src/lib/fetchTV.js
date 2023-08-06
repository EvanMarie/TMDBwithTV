import axios from 'axios';
const API_KEY = import.meta.env.VITE_API_KEY;

const BASE_URL = 'https://api.themoviedb.org/3';

export async function fetchTvShows(endpoint, queryParameters = '', searchQuery = '') {
	try {
		let url;

		if (searchQuery) {
			// If there's a search query, use the search endpoint
			url = `${BASE_URL}/search/tv?api_key=${API_KEY}&language=en-US&query=${searchQuery}`;
		} else {
			// Otherwise, use the specified endpoint
			url = `${BASE_URL}/tv/${endpoint}?api_key=${API_KEY}&language=en-US${queryParameters}`;
		}

		const response = await axios.get(url);
		return response.data.results;
	} catch (error) {
		console.error('An error occurred while fetching the tv shows:', error);
		return [];
	}
}

export async function fetchGenres() {
	try {
		const url = `${BASE_URL}/genre/tv/list?api_key=${API_KEY}&language=en-US`;
		const response = await axios.get(url);
		return response.data.genres;
	} catch (error) {
		console.error('An error occurred while fetching the genres:', error);
		return [];
	}
}

export async function fetchSearchResults(type, query) {
	try {
		const url = `${BASE_URL}/search/${type}?api_key=${API_KEY}&language=en-US&query=${encodeURIComponent(
			query
		)}`;
		const response = await axios.get(url);
		return response.data.results;
	} catch (error) {
		console.error(`An error occurred while fetching the search results: ${error}`);
		return [];
	}
}
