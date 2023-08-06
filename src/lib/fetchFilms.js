import axios from 'axios';
const API_KEY = import.meta.env.VITE_API_KEY;

const BASE_URL = 'https://api.themoviedb.org/3';

export async function fetchMovies(endpoint, queryParameters = '', searchQuery = '') {
	try {
		let url;

		if (searchQuery) {
			// If there's a search query, use the search endpoint
			url = `${BASE_URL}/search/movie?api_key=${API_KEY}&language=en-US&query=${searchQuery}`;
		} else {
			// Otherwise, use the specified endpoint
			url = `${BASE_URL}/movie/${endpoint}?api_key=${API_KEY}&language=en-US${queryParameters}`;
		}

		const response = await axios.get(url);
		return response.data.results;
	} catch (error) {
		console.error('An error occurred while fetching the movies:', error);
		return [];
	}
}

export async function fetchGenres() {
	try {
		const url = `${BASE_URL}/genre/movie/list?api_key=${API_KEY}&language=en-US`;
		const response = await axios.get(url);
		return response.data.genres;
	} catch (error) {
		console.error('An error occurred while fetching the genres:', error);
		return [];
	}
}
