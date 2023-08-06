import { selectedGenreName } from './store';

let currentColorIndex = 0;
let colors = ['#5c0233', '#4a025c', '#1c025c', '#02475c', '#025c3e', '#a64c03'];

export function getNextColor() {
	const color = colors[currentColorIndex];
	currentColorIndex = (currentColorIndex + 1) % colors.length;
	return color;
}

export function handleGenreChange(selectedGenre, filter, loadMedia) {
	selectedGenreName.set(findGenreName(selectedGenre));
	loadMedia(filter);
}

export function findGenreName(genres, genreId) {
	const genre = genres.find((g) => g.id === parseInt(genreId));
	return genre ? genre.name : '';
}

export function formatFilter(filter) {
	let formattedFilter = filter.replace(/_/g, ' ');
	return formattedFilter
		.split(' ')
		.map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
		.join(' ');
}

export function formatDate(dateString) {
	if (!dateString) return '';

	const date = new Date(dateString);
	const day = date.getDate();
	const month = date.toLocaleString('default', { month: 'long' });
	const year = date.getFullYear();

	return `${day} ${month} ${year}`;
}

export function roundPopularity(popularity) {
	if (!popularity) return '';

	return Math.round(popularity);
}

export function closeModal(selectedMedia) {
	// eslint-disable-next-line no-unused-vars
	selectedMedia = null;
}

export function loadMedia(
	fetchFunction,
	mediaArray,
	filter,
	selectedGenre,
	queryParameters = '',
	searchQuery = ''
) {
	const genreQuery = selectedGenre ? `&with_genres=${selectedGenre}` : '';
	fetchFunction(filter, queryParameters + genreQuery, searchQuery).then((results) => {
		mediaArray = results.map((media) => {
			const rating = Math.round(media.vote_average * 10);
			return {
				...media,
				shortOverview: truncateText(media.overview, 70),
				color: getNextColor(),
				rating
			};
		});
		console.log(mediaArray[0]);
	});
}

export function truncateText(text, length = 100) {
	if (text.length <= length) return text;
	return text.slice(0, length) + '...';
}

// eslint-disable-next-line no-unused-vars
let selectedShow = '';
export function handleShowChange(show) {
	selectedShow = show;
}

export function fetchSearchResults(query, type) {
	const url = `https://api.themoviedb.org/3/search/${type}?api_key=YOUR_API_KEY&query=${query}`;
	return fetch(url)
		.then((res) => res.json())
		.then((res) => res.results);
}
