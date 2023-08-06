<script>
	import { createEventDispatcher, onMount } from 'svelte';
	import { fetchGenres } from '../lib/fetchFilms';
	import { selectedGenreName } from '../lib/store'; // Import the selectedGenreName store

	export let selectedGenre; // Accept selectedGenre as a prop

	let genres = [];

	let selectedGenreNameValue;
	selectedGenreName.subscribe((value) => {
		selectedGenreNameValue = value;
	});

	const dispatch = createEventDispatcher();

	onMount(() => {
		selectedGenreName.set(findGenreName(selectedGenre));
		fetchGenres().then((results) => {
			genres = results;
		});
	});

	function handleGenreChange(event) {
		selectedGenre = event.target.value;
		const genreName = findGenreName(selectedGenre);
		selectedGenreName.set(genreName); // Update the selectedGenreName store with the genre name
		dispatch('genreChange', selectedGenre); // Emit the genreChange event with the selectedGenre
	}

	// Helper function to find the genre name based on genre ID
	function findGenreName(genreId) {
		const genre = genres.find((g) => g.id === parseInt(genreId));
		return genre ? genre.name : '';
	}
</script>

<div class="select-container">

		<select class="minimal" bind:value={selectedGenre} on:change={handleGenreChange}>
			<option value="">Select a Genre</option>
			<!-- default option -->
			{#if selectedGenre}
				<option value={selectedGenre} selected>{selectedGenreNameValue}</option>
			{/if}
			{#each genres as genre}
				<option value={genre.id}>{genre.name}</option>
			{/each}
		</select>

</div>
