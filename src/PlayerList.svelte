<style>
    .list-grid {
	    display: grid;
	    grid-template-columns: auto 80px ;
		align-items: center;
		max-height: calc(100vh - 210px);
		overflow-y: auto;
    }
</style>

<script>
	import { c, cSess, sessions, currentView } from './stores'
	import { views, icons } from './enums'
	
	let failedEditAttempts
	resetFailedEditAttempts()

	// requires failedEditAttempts to be properly reset!
	let disableNext = shallDisableNext()
	
	

	// fills failedEditAttempts with true for every player id that does not have
	// a positive integer in its ini field
	function resetFailedEditAttempts() {
		failedEditAttempts = {}
		for (let i in $c.players) {
			if ($c.players[i].ini == 0) {
				failedEditAttempts[$c.players[i].id] = true
			}
		}
	}

	function editPlayers() {
		console.log("editing players")
		currentView.set(views.PlayerEditor)
	}

	function next() {
		console.log("neeeext!")
		if ($c.players.length == 0) { return; }
		sessions.reducePlayerIniBy($cSess, findLowestIni())
		resetFailedEditAttempts()
		disableNext = true
	}

	function findLowestIni() {
		let lowestDiff = $c.players.reduce(function(lowestSoFar, nextPlayer) {
			let lowest = Number(lowestSoFar)
			let nextIni = Number(nextPlayer.ini)
			return nextIni < lowest ? nextIni : lowest
		}, $c.players[1].ini)
		console.log(`lowest: ${lowestDiff}`)
		return lowestDiff
	}
	
	function input(event, id) {
		let inputValue = event.target.value.trim()
		console.log("> value: " + event.target.value)

		// valid number value
		if (/^\d+$/.test(inputValue)) {
			sessions.setPlayerIni($cSess, id, inputValue)

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

<!-- div necessary to shape shadow the way we want it to be -->
<div class="shadow-shaper">
	<h3>{$c.name}</h3>
</div>

<div class="button-bar">
    <button on:click={editPlayers}>
		<i class={icons.editusers}></i> Edit Actors
	</button>
    <button disabled={disableNext} on:click={next}>
		Next Turn
		<i class={icons.arrowright}></i>
	</button> 
</div>
<div class="list-grid">
    {#each $c.players as player (player.id)}		
        <div class="name-wrapper">
            {player.name}
        </div>
        <input type="number" value={player.ini} on:input={e => input(e, player.id)}>
    {/each}
</div>


