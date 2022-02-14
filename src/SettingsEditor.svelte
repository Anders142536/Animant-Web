<style>


</style>

<script>
	import { currentView } from './stores'
	import { icons, views } from './enums'

	function done() {
		console.log("done editing settings")
		currentView.set(views.PlayerList)
	}

</script>

<!-- div necessary to shape shadow the way we want it to be -->
<div class="shadow-shaper">
	<h3>Settings</h3>
</div>

<div class="button-bar">
	<div />
	<button on:click={done}>
		Done
		<i class={icons.chevronright}></i>
	</button>
</div>
