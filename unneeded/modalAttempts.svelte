<script>
	import { fetchMovies, fetchGenres } from '../lib/fetchFilms';
	import { truncateText } from '../lib/truncateText';
	import PageContainer from './PageContainer.svelte';
	import { filterStore } from '../lib/store.js';
	import { onMount } from 'svelte';
	import Navigation from './Navigation.svelte';
	import { selectedGenreName } from '../lib/store'; // Import the selectedGenreName store
	import { createEventDispatcher } from 'svelte';

	let movies = [];
	let genres = [];
	let filter;
	let selectedGenre = '';

	// Subscribe to the selectedGenreName store to get the current selected genre name
	let selectedGenreNameValue;
	selectedGenreName.subscribe((value) => {
		selectedGenreNameValue = value;
	});

	let selectedMovie = null;

	$: filterStore.subscribe((value) => {
		filter = value;
		loadMovies(filter);
	});

	onMount(() => {
		// Fetch genres when the component is mounted
		fetchGenres().then((results) => {
			genres = results;
		});
	});

	function loadMovies(endpoint, queryParameters = '', searchQuery = '') {
		const genreQuery = selectedGenre ? `&with_genres=${selectedGenre}` : '';
		fetchMovies(endpoint, queryParameters + genreQuery, searchQuery).then((results) => {
			movies = results.map((movie) => ({
				...movie,
				shortOverview: truncateText(movie.overview, 70),
				color: getNextColor()
			}));
			console.log(movies[0]);
		});
	}

	function handleGenreChange(genre) {
		selectedGenre = genre;
		selectedGenreName.set(findGenreName(genre)); // Update the selectedGenreName store with the genre name
		loadMovies(filter);
	}

	// Add this helper function in the same scope as handleGenreChange
	function findGenreName(genreId) {
		const genre = genres.find((g) => g.id === parseInt(genreId));
		return genre ? genre.name : '';
	}

	function formatFilter(filter) {
		let formattedFilter = filter.replace(/_/g, ' ');
		return formattedFilter
			.split(' ')
			.map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
			.join(' ');
	}

	let colors = ['#5c0233', '#4a025c', '#1c025c', '#02475c', '#025c3e', '#a64c03'];
	let colorIndex = 0; // Initialize the color index to 0

	function getNextColor() {
		const color = colors[colorIndex];
		colorIndex = (colorIndex + 1) % colors.length;
		return color;
	}

	function handleSearchChange(searchQuery) {
		// console.log('Handling Search:', searchQuery);
		loadMovies(filter, '', searchQuery);
	}

	const DEFAULT_IMAGE_URL = '/noimage.png';

	function closeModal() {
		selectedMovie = null;
	}
</script>

<PageContainer>
	<Navigation
		on:genreChange={(event) => handleGenreChange(event.detail)}
		on:searchChange={(event) => handleSearchChange(event.detail)}
		{selectedGenre}
	/>

	<h1 style="margin-bottom: 1rem;">{formatFilter(filter)} {selectedGenreNameValue}</h1>

	<ul>
		<div class="card-container">
			{#each movies as movie}
				<div
					class="card-styles"
					style="background-color: {movie.color}"
					on:click={() => {
						selectedMovie = movie;
						document.getElementById('my_modal_4').showModal();
					}}
					on:keydown={(event) => {
						if (event.key === 'Enter') selectedMovie = movie;
					}}
					role="button"
					tabindex="0"
				>
					<figure>
						<img
							src={movie.backdrop_path
								? `https://image.tmdb.org/t/p/w500${movie.backdrop_path}`
								: DEFAULT_IMAGE_URL}
							alt="Movie Poster"
							class="movie-poster"
						/>
					</figure>
					<div class="card-body">
						<p class="card-title">{movie.title}</p>
						<p>{movie.shortOverview}</p>
					</div>
				</div>
			{/each}
		</div>
	</ul>
</PageContainer>

<dialog id="my_modal_4" class="modal">
  <form method="dialog" class="modal-box w-11/12 max-w-5xl">
			<div class="modal-container">
				<h3 class="font-bold text-lg">{selectedMovie ? selectedMovie.title : 'Hello!'}</h3>

				<p class="py-4">{selectedMovie ? selectedMovie.overview : ''}</p>

				<div class="modal-action">
					<button class="btn">Close</button>
				</div>
			</div>
		</form>

</dialog>

<style>
	.card-container {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		gap: 1.25rem;
	}

	.movie-poster {
		width: 250px;
		height: 200px;
		border-radius: 10px;
		box-shadow: 1px 1px 10px 1px rgba(0, 0, 0, 0.8);
	}

	.card-styles {
		padding: 1rem;
		width: 300px;
		height: auto;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		border-radius: 10px;
		box-shadow: 1px 1px 20px 1px rgba(0, 0, 0, 0.6);
	}

	.card-styles:hover {
		cursor: pointer;
		transform: scale(1.04) rotate(-1deg);
		transition: transform 0.5s ease;
	}

	.card-title {
		padding: 4px;
		border-radius: 5px;
		text-align: center;
		font-size: 1.1rem;
		text-shadow: 3px 2px 20px rgba(0, 0, 0, 1);
		line-height: 1.2rem;
		margin-top: 0.25rem;
	}

	.card-body {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		padding: 5px;
		font-size: 0.85rem;
	}

	.modal-overlay {
		width: 100vw;
		height: 100vh;
		border-radius: 10px;
		background-color: rgba(10, 30, 50, 0.4);
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.modal-box {
		width: 100%;
		max-width: 800px;
	}
</style>
