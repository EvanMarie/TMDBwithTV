import axios from 'axios';
const API_KEY = import.meta.env.VITE_API_KEY;

const URL = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=1`;

export async function fetchPopular() {
	try {
		const response = await axios.get(URL);
		return response.data.results;
	} catch (error) {
		console.error('An error occurred while fetching the movies:', error);
		return [];
	}
}
