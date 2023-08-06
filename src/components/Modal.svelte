<!--Modal.svelte -->
<script>
	export let movie;
	export let closeModal;
	console.log('Modal component is being rendered');
</script>

<div class="modal">
	<div class="modal-content">
		<h2>{movie.title}</h2>
		<p>{movie.overview}</p>
		<!-- Add any other movie information you want to display in the modal -->
		<button on:click={() => closeModal()}>Close</button>
	</div>
</div>

<style>
	.modal {
		position: fixed;
		z-index: 100;
		left: 0;
		top: 0;
		width: 50%;
		height: 50%;
		overflow: auto;
		background-color: rgb(0, 0, 0);
		background-color: rgba(0, 0, 0, 0.4);
	}

	.modal-content {
		background-color: #fefefe;
		margin: 15% auto;
		padding: 20px;
		border: 1px solid #888;
		width: 80%;
	}
</style>
