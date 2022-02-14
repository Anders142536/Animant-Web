<style>
    .edit-grid {
	    display: grid;
	    grid-template-columns: auto 30px;
		max-height: calc(100vh - 210px);
		overflow-y: auto;
    }
</style>


<script >
	import { c, cSess, sessions, currentView } from './stores'
	import { icons, views } from './enums'

	function done() {
		console.log("done editing players")
		currentView.set(views.PlayerList)
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

<!-- div necessary to shape shadow the way we want it to be -->
<div class="shadow-shaper">
	<h3>{$c.name}</h3>
</div>

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
