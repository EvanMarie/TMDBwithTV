<script>
	import LoadMovies from '../components/LoadMovies.svelte';
	import Navigation from '../components/Navigation.svelte';
	import PageContainer from '../components/PageContainer.svelte';
    import { writable } from 'svelte/store';
	import LoadTVShows from '../components/LoadTVShows.svelte';
import { dataTypeStore } from '../lib/store.js';

	let loadComponent;  // Component to load (either LoadMovies or LoadTVShows)

	// Subscribe to the dataTypeStore
	dataTypeStore.subscribe(value => {
		if (value === 'movies') {
			loadComponent = LoadMovies;
		} else if (value === 'tv-shows') {
			loadComponent = LoadTVShows;
		}
	});
	// Define a writable store for selectedGenre
	export let selectedGenre = writable(null);

    // handleGenreChange
	function handleGenreChange(newGenre) {
		selectedGenre.set(newGenre);
	}

function handleSearchChange(searchQuery) {
  dataTypeStore.subscribe(value => {
    if (value === 'movies') {
      LoadMovies.handleSearchChange(searchQuery);
    } else if (value === 'tv-shows') {
      LoadTVShows.handleSearchChange(searchQuery);
    }
  });
}



</script>

<PageContainer>
	<Navigation
		on:genreChange={(event) => handleGenreChange(event.detail)}
		on:searchChange={(event) => handleSearchChange(event.detail)}
		{selectedGenre}
	/>
	<!-- Dynamically load either the LoadMovies or LoadTVShows component -->
	<svelte:component this={loadComponent} />
</PageContainer>
