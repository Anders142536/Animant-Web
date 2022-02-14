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

<div class="button-bar">
	<div />
	<button on:click={done}>
		Done
		<i class={icons.chevronright}></i>
	</button>
</div>
