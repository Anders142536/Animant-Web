<style>
	.big-box {
		background: rgba(0, 0, 0, 0.4);
		border: 1px solid #4b4a44;
		border-radius: 2px;
		box-shadow: 0 0 20px #000;
		outline: 2px solid #000;
		padding: 0 10px 5px;
		margin: 10px;
		height: fit-content;
	}

	.shadow-shaper {
		overflow: hidden;
		padding-bottom: 10px;
	}

</style>

<script>
	import PlayerEditor from './PlayerEditor.svelte'
	import PlayerList from './PlayerList.svelte'

	let editingPlayers = false
	let latestId = 3
	let players = [
		{ id: 1, name: 'Player 1', ini: 0 },
		{ id: 2, name: 'Player 2', ini: 0 }
	]
	$: { //debug prints
		let output = ""
		for (let i in players) {
			output += `id: ${players[i].id}, name: ${players[i].name}, ini: ${players[i].ini}\n`
		}
		console.log(output)
	}
</script>

<div class="big-box" >
	<h1>Animant</h1>
	<!-- div necessary to shape shadow the way we want it to be -->
	<div class="shadow-shaper">
		<h3>Encounter name</h3>
	</div>
	
	{#if editingPlayers}
		<PlayerEditor bind:players={players} 
			bind:latestId={latestId}
			bind:editingPlayers={editingPlayers}/>
	{:else}
		<PlayerList bind:players={players}
			bind:editingPlayers={editingPlayers} />
	{/if}
</div>