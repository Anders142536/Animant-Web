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

	.header-settings-area {
		display: flex;
		justify-content: space-between;
	}

</style>

<script>
	import { c, currentView } from './stores'
	import { views, icons } from './enums'

	// components
	import PlayerEditor from './PlayerEditor.svelte'
	import PlayerList from './PlayerList.svelte'
	import SessionsEditor from './SessionsEditor.svelte'
	import SettingsEditor from './SettingsEditor.svelte'

	function settings() {
		console.log("going to settings")
		currentView.set(views.Settings)
	}
</script>

<div class="big-box" >
	<div class="header-settings-area" >
		<h1>Animant</h1>
		<button on:click={settings}>
			<i class={icons.settings}></i>
		</button>
	</div>
	<!-- div necessary to shape shadow the way we want it to be -->
	<div class="shadow-shaper">
		<h3>{$c.name}</h3>
	</div>
	
	{#if $currentView === views.PlayerEditor}
		<PlayerEditor />
	{:else if $currentView === views.PlayerList}
		<PlayerList  />
	{:else if $currentView === views.SessionsEditor}
		<SessionsEditor />
	{:else if $currentView === views.Settings}
		<SettingsEditor />
	{/if}
</div>
