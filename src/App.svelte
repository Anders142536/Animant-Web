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

<div>
	<h1>Animant</h1> 
	
	{#if editingPlayers}
		<PlayerEditor bind:players={players} 
			bind:latestId={latestId}
			bind:editingPlayers={editingPlayers}/>
	{:else}
		<PlayerList bind:players={players}
			bind:editingPlayers={editingPlayers} />
	{/if}
</div>