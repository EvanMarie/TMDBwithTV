<script>
	import { filterStore } from '../lib/store.js'; // adjust the path if needed

	let filter = $filterStore;

	function handleChange(event) {
		filterStore.set(event.target.value);
	}
</script>

<div class="select-container">
	<select bind:value={filter} id="filter" on:change={handleChange}>
		<option value="popular">Popular</option>
		<option value="top_rated">Top Rated</option>
		<option value="upcoming">Upcoming</option>
		<option value="now_playing">Now Playing</option>
	</select>
</div>



<style>

</style>
