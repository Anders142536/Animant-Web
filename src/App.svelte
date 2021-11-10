<script>
	let editingPlayers = false
	let latestId = 1
	let players = []
	$: { //debug prints
		let output = ""
		for (let i in players) {
			output += `id: ${players[i].id}, name: ${players[i].name}, ini: ${players[i].ini}\n`
		}
		console.log(output)
	}

	addPlayer()
	addPlayer()

	function addPlayer() {
		console.log("adding player")
		players.push({
			id: latestId,
			name: "Player " + latestId,
			ini: 0
		})
		players = players
		latestId++
	}

	function removePlayer(id) {
		console.log("removing player " + id)
		let toDelete = players.filter(function(x) {
			return x.id == id
		})

		let index = players.indexOf(toDelete[0])

		players.splice(index, 1)
		players = players
	}

	function editPlayers() {
		console.log("editing players")
		editingPlayers = true
	}

	function done() {
		console.log("done editing players")
		editingPlayers = false
	}

	function next() {
		console.log("neeeext!")
		if (players.length == 0) { return; }
		let lowestIni = findLowestIni()

		for (let i in players) {
			players[i].ini -= lowestIni
		}

		players.sort(function(a, b) {
			if (Number(a.ini) == Number(b.ini)) return 0
			if (Number(a.ini) < Number(b.ini)) return -1
			return 1
		})
	}

	function findLowestIni() {
		let lowestDiff = players.reduce(function(lowestSoFar, nextPlayer) {
			let lowest = Number(lowestSoFar)
			let nextIni = Number(nextPlayer.ini)
			return nextIni < lowest ? nextIni : lowest
		}, players[1].ini)
		console.log(`lowest: ${lowestDiff}`)
		return lowestDiff
	}

</script>

<div>
	<h1>Animant</h1> 
	
	{#if editingPlayers}
		<div class="edit-grid">
			{#each players as player (player.id)}
				<input type="text" bind:value={player.name}>
				<button on:click={removePlayer(player.id)}>x</button>
			{/each}
		</div>
	{:else}
		<div class="main-grid">
			{#each players as player (player.id)}		
				<div>
					{player.name}
				</div>
				<input type="number" bind:value={player.ini}>
			{/each}
		</div>
	{/if}
	<div class="bottom-buttons">
		{#if editingPlayers}
			<button on:click={addPlayer}>Add Player</button>
			<button on:click={done}>Done</button>
		{:else}
			<button on:click={editPlayers}>Edit Players</button>
			<button on:click={next}>Next</button> 
		{/if}
	</div>
</div>