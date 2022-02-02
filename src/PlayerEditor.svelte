<style>
    .edit-grid {
	    display: grid;
	    width: 300px;
	    grid-template-columns: auto 20px;
    }
</style>


<script >
	import { c } from './stores'
	import { cSess } from './stores'
	import { sessions } from './stores'
	import { editingPlayers } from './stores'

	function done() {
		console.log("done editing players")
		editingPlayers.set(false)
	}

	export function addPlayer() {
		console.log("adding player")
		sessions.addPlayer($cSess)
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
	<button on:click={addPlayer}>
		<i class="fas fa-plus"></i>
		Add Actor
	</button>
	<button on:click={done}>
		Done
		<i class="fas fa-chevron-right"></i>
	</button>
</div>
<div class="edit-grid">
    {#each $c.players as player (player.id)}
        <input type="text" bind:value={player.name}>
        <button style="padding-top: 0px;" on:click={removePlayer(player.id)}>
			<i class="fas fa-trash"></i>
		</button>
    {/each}
</div>
