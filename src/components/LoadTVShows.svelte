<script>
	import { fetchGenres, fetchTvShows, fetchSearchResults } from '../lib/fetchTV';
	import { truncateText } from '../lib/utils';
	import { filterStore, selectedGenreName } from '../lib/store.js';
	import { onMount } from 'svelte';
	import {
		getNextColor,
		handleGenreChange,
		findGenreName,
		formatFilter,
		formatDate,
		roundPopularity,
		closeModal
	} from '../lib/utils.js';

	let tvShows = [];
	let genres = [];
	let filter;
	let selectedGenre = '';
	let selectedGenreNameValue;
	let selectedShow = null;

	selectedGenreName.subscribe((value) => {
		selectedGenreNameValue = value;
	});

	$: filterStore.subscribe((value) => {
		filter = value;
		loadMedia(fetchTvShows, tvShows, filter, selectedGenre);
	});

	onMount(() => {
		fetchGenres().then((results) => {
			genres = results;
		});
	});

	async function loadMedia(fetchFunction, endpoint, queryParameters = '', searchQuery = '') {
		console.log('Load TV');
		const genreQuery = selectedGenre ? `&with_genres=${selectedGenre}` : '';
		const results = await fetchFunction(endpoint, queryParameters + genreQuery, searchQuery);
		return results.map((media) => {
			const rating = Math.round(media.vote_average * 10);
			return {
				...media,
				shortOverview: truncateText(media.overview, 70),
				color: getNextColor(),
				rating // This is the rounded rating
			};
		});
	}

	$: filterStore.subscribe(async (value) => {
		filter = value;
		tvShows = await loadMedia(fetchTvShows, filter, selectedGenre);
	});

	function handleSearchChange(searchQuery) {
		fetchSearchResults(searchQuery, 'tv').then((results) => {
			tvShows = results.map((tvShow) => {
				const rating = Math.round(tvShow.vote_average * 10);
				return {
					...tvShow,
					shortOverview: truncateText(tvShow.overview, 70),
					color: getNextColor(),
					rating // This is the rounded rating
				};
			});
		});
	}
</script>
