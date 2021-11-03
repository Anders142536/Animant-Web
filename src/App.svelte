<script>
	let players = [{
		name: "Player 1",
		ini: 0
	}]

	function addPlayer() {
		console.log("add player")
	}

	function next() {
		console.log("neeeext!")
	}
</script>

<div>
	<h1>Animant</h1>
	<div class="main-grid">
		{#each players as player}
			<input type="text" value={player.name}>
			<input type="text" pattern="^\d*$" value={player.ini}>
		{/each}
	</div>
	<div class="bottom-buttons">
		<button on:click={addPlayer}>Add Player</button>
		<button on:click={next}>Next</button> 
	</div>
</div>