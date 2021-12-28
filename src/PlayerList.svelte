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
	
	let failedEditAttempts
	resetFailedEditAttempts()

	// requires failedEditAttempts to be properly reset!
	let disableNext = shallDisableNext()
	
	

	// fills failedEditAttempts with true for every player id that does not have
	// a positive integer in its ini field
	function resetFailedEditAttempts() {
		failedEditAttempts = {}
		for (let i in players) {
			if (players[i].ini == 0) {
				failedEditAttempts[players[i].id] = true
			}
		}
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
		let inputValue = event.target.value.trim()
		console.log("> value: " + event.target.value)

		// valid number value
		if (/^\d+$/.test(inputValue)) {
			players.find(p => p.id == id).ini = Number(inputValue)
			players = players

			failedEditAttempts[id] = false
			disableNext = shallDisableNext();
			console.log("success")
		} else {
			console.log("failed attempt: " + inputValue)
			failedEditAttempts[id] = true
			disableNext = true
			console.log("failed")
		}
	}

	function shallDisableNext() {
		console.log("shall disable Next?")
		let values = Object.values(failedEditAttempts)
		return values.length == 0 || values.includes(true);
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