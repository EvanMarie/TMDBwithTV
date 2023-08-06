<script>
	import { fetchPopular } from '../lib/fetchPopular';
	import { truncateText } from '../lib/truncateText'; // Import the truncate function
	import PageContainer from './PageContainer.svelte';

	let popularMovies = [];

	// Fetch the movies when the component mounts
	fetchPopular().then((results) => {
		popularMovies = results.map((movie) => ({
			...movie,
			overview: truncateText(movie.overview, 70) // Truncate the overview to 150 characters
		}));
	});
</script>

<PageContainer>
	<h1>Popular Movies</h1>
	<ul>
		<div class="card-container">
			{#each popularMovies as movie}
				<div class="card-styles">
					<figure>
						<img
							src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`}
							alt="Movie Poster"
							class="movie-poster"
						/>
					</figure>
					<div class="card-body">
						<h2 class="card-title">{movie.title}</h2>
						<p>{movie.overview}</p>
					</div>
				</div>
			{/each}
		</div>
	</ul>
</PageContainer>

<style>

	.card-container {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		gap: 1rem;
	}

	.movie-poster {
		width: 300px;
		height: 300px;
		border-radius: 10px;
    box-shadow: 1px 1px 10px 1px rgba(0,0,0,0.8);
	}

	.card-styles {
		padding: 1rem;
		background-color: darkcyan;
		width: 375px;
		height: auto;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
    border-radius: 10px;
    box-shadow: 1px 1px 20px 1px rgba(0,0,0,0.8);
	}
</style>
