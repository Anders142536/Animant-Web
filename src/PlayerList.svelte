<style>
    .main-grid {
	    display: grid;
	    width: 300px;
	    grid-template-columns: auto 80px ;
    }
</style>

<script>
    export let players
    export let editingPlayers

	let disableNext = true
	$: {
		players = players
		disableNext = findLowestIni() == 0
	}

	function editPlayers() {
		console.log("editing players")
		editingPlayers = true
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
	
	function input(event, id) {
		console.log("> value: " + event.target.value)
		if (/^\d+$/.test(event.target.value)) {
			players.find(p => p.id == id).ini = Number(event.target.value)
			players = players
		} else {
			disableNext = true
		}
		
	}
</script>


<div class="button-bar">
    <button on:click={editPlayers}>Edit Players</button>
    <button disabled={disableNext} on:click={next}>Next</button> 
</div>
<div class="main-grid">
    {#each players as player (player.id)}		
        <div>
            {player.name}
        </div>
        <input type="number" value={player.ini} on:input={e => input(e, player.id)}>
    {/each}
</div>