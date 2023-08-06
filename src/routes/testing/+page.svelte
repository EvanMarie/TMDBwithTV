<script>
	let movies = [];
	function loadMovies(endpoint, queryParameters = '') {
		// Modify this function to include genre ID if selected
		const genreQuery = selectedGenre ? `&with_genres=${selectedGenre}` : '';
		fetchMovies(endpoint, queryParameters + genreQuery).then((results) => {
			movies = results.map((movie) => ({
				...movie,
				overview: truncateText(movie.overview, 70)
			}));
		});
	}
</script>

<div>
	<ul>
		{#each movies as movie}
			<li>{movie.title}</li>{/each}
	</ul>
</div>
