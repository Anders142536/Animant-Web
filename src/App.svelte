<script>
	let latestId = 1
	let players = []
	$:console.log(players)

	addPlayer()
	addPlayer()

	function addPlayer() {
		console.log("add player")
		players.push({
			id: latestId,
			name: "Player " + latestId,
			ini: 0
		})
		players = players
		latestId++
	}

	function next() {
		console.log("neeeext!")
	}
</script>

<div>
	<h1>Animant</h1>
	<div class="main-grid">
		{#each players as player (player.id)}
			<input type="text" bind:value={player.name}>
			<!-- inputmode does not work?! -->
			<input type="text" inputmode="numeric" bind:value={player.ini}>
		{/each}
	</div>
	<div class="bottom-buttons">
		<button on:click={addPlayer}>Add Player</button>
		<button on:click={next}>Next</button> 
	</div>
</div>