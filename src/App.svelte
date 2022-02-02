<style>
	.big-box {
		background: rgba(0, 0, 0, 0.4);
		border: 1px solid #4b4a44;
		border-radius: 2px;
		box-shadow: 0 0 20px #000;
		outline: 2px solid #000;
		padding: 0 10px 5px;
		margin: 20px;
		height: fit-content;
	}

	.shadow-shaper {	
		overflow: hidden;
		padding-bottom: 10px;
	}

</style>

<script>
	import { c } from './stores'
	import { editingPlayers } from './stores'
	import PlayerEditor from './PlayerEditor.svelte'
	import PlayerList from './PlayerList.svelte'

</script>

<div class="big-box" >
	<h1>Animant</h1>
	<!-- div necessary to shape shadow the way we want it to be -->
	<div class="shadow-shaper">
		<h3>{$c.name}</h3>
	</div>
	
	{#if $editingPlayers}
		<PlayerEditor />
	{:else}
		<PlayerList  />
	{/if}
</div>