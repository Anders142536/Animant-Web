<style>
    .edit-grid {
	    display: grid;
	    width: 300px;
	    grid-template-columns: auto 20px;
    }
</style>


<script >
	import { cSess, sessions, currentView } from './stores'
	import { icons } from './enums'

	function done() {
		console.log("done editing players")
		currentView.set(false)
	}

	export function addPlayer() {
		console.log("adding player")
		sessions.addPlayer($cSess)
	}

	function removePlayer(id) {
		console.log("removing player " + id)
		sessions.removePlayer($cSess, id)
	}
</script>

<div class="button-bar">
	<button on:click={addPlayer}>
		<i class={icons.plus}></i>
		Add Actor
	</button>
	<button on:click={done}>
		Done
		<i class={icons.chevronright}></i>
	</button>
</div>
<div class="edit-grid">
    {#each $sessions[$cSess].players as player (player.id)}
        <input type="text" bind:value={player.name}>
        <button style="padding-top: 0px;" on:click={removePlayer(player.id)}>
			<i class="fas fa-trash"></i>
		</button>
    {/each}
</div>
