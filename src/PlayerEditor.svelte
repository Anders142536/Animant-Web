<style>
    .edit-grid {
	    display: grid;
	    width: 300px;
	    grid-template-columns: auto 20px;
    }
</style>


<script >
    export let players
    export let latestId
    export let editingPlayers
    
    export function init() {
        addPlayer()
        addPlayer()
    }

	function done() {
		console.log("done editing players")
		editingPlayers = false
	}

	export function addPlayer() {
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
</script>

<div class="button-bar">
	<button on:click={addPlayer}>Add Player</button>
	<button on:click={done}>Done</button>
</div>
<div class="edit-grid">
    {#each players as player (player.id)}
        <input type="text" bind:value={player.name}>
        <button on:click={removePlayer(player.id)}>x</button>
    {/each}
</div>
