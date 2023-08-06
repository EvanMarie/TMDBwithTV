<script>
	import FilterMenu from './FilterMenu.svelte';
	import GenreMenu from './GenreMenu.svelte';
	import { createEventDispatcher } from 'svelte';
	import { dataTypeStore } from '../lib/store'; // Import the dataTypeStore store
	import { selectedGenreName } from '../lib/store'; // Import the selectedGenreName store

	export let selectedGenre;
	export let selectedGenreNameValue;
	let searchQuery = '';


	const dispatch = createEventDispatcher();

	// Subscribe to the selectedGenreName store to get the current selected genre name
	selectedGenreName.subscribe((value) => {
		selectedGenreNameValue = value;
	});

	function handleGenreChange(event) {
		dispatch('genreChange', event.detail);
	}

	// Subscribe to the dataTypeStore to get the current data type (movies or TV shows)
	let dataTypeValue;
	dataTypeStore.subscribe((value) => {
		dataTypeValue = value;
	});

	// Dispatch an event when the data type changes
	$: dataTypeStore.set(dataTypeValue), dispatch('dataTypeChange', dataTypeValue);


	export function handleSearchInput(event) {
		if (event.key === 'Enter') {
			if (dataTypeValue === 'movies') {
				dispatch('searchMoviesChange', searchQuery);
			} else if (dataTypeValue === 'tv-shows') {
				dispatch('searchTVChange', searchQuery);
			}
		}
	}
</script>

<div class="navigation-container">
	<div class="logo-container">
		<img src="njatmdbCyan.png" alt="logo" class="logo" />
	</div>
	<div class="user-inputs">
		<GenreMenu on:genreChange={handleGenreChange} {selectedGenre} />
		<FilterMenu />

		<!-- Add radio buttons for choosing between movies and TV shows -->
		<div>
			<input type="radio" id="movies" name="dataType" value="movies" bind:group={dataTypeValue} />
			<label for="movies">Movies</label>
			<input
				type="radio"
				id="tv-shows"
				name="dataType"
				value="tv-shows"
				bind:group={dataTypeValue}
			/>
			<label for="tv-shows">TV Shows</label>
		</div>

		<div class="input-container">
			<input
				type="text"
				bind:value={searchQuery}
				placeholder="Search movies..."
				on:keydown={handleSearchInput}
			/>
		</div>
	</div>
</div>

<style>
	.navigation-container {
		position: fixed;
		z-index: 10;
		background-color: rgba(28, 32, 48, 0.8);
		top: 0;
		left: 0;
		width: 100%;
		height: 215px;
		padding: 10px 20px;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		box-shadow: 0 0 10px 1px rgba(0, 0, 0, 0.8);
		gap: 12px;
	}

	.logo-container {
		display: flex;
		width: 100%;
		justify-content: flex-start;
		align-items: center;
	}

	.logo {
		width: 240px;
	}

	.user-inputs {
		display: flex;
		padding: 0px 20px;
		width: 100%;
		flex-direction: column;
		justify-content: space-evenly;
		gap: 10px;
	}

	@media (min-width: 1080px) {
		.navigation-container {
			flex-direction: row;
			justify-content: space-between;
			height: 70px;
		}

		.user-inputs {
			flex-direction: row;
		}
	}
</style>
