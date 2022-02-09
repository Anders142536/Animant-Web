import { writable, derived } from 'svelte/store'

export const editingPlayers = writable(false)
export const cSess = writable(0)

function createSessions() {
    const { subscribe, set, update } = writable([
    {
        name: 'Session 1',
        latestId: 2,
        players: [
            { id: 1, name: 'Player 1', ini: 0 },
            { id: 2, name: 'Player 2', ini: 0 }
        ]
    }])

    return {
        subscribe,
        set,
        addPlayer: (sessId) => update(quo => {
            quo[sessId].latestId++
            quo[sessId].players.push({ 
                id: quo[sessId].latestId,
                name: "Player " + quo[sessId].latestId,
                ini: 0
            })
            return quo
        }),
        removePlayer: (sessId, playerId) => update(quo => {
		    let toDelete = quo[sessId].players.filter(x => x.id == playerId)
		    let index = quo[sessId].players.indexOf(toDelete[0])

		    quo[sessId].players.splice(index, 1)
            return quo
        }),
        reducePlayerIniBy: (sessId, n) => update(quo => {
            for (let i in quo[sessId].players) {
                quo[sessId].players[i].ini -= n
            }
            quo[sessId].players.sort(function(a, b) {
			    if (Number(a.ini) == Number(b.ini)) return 0
			    if (Number(a.ini) < Number(b.ini)) return -1
			    return 1
            })
            return quo
        }),
        setPlayerIni: (sessId, playerId, ini) => update(quo => {
            quo[sessId].players.find(p => p.id == playerId).ini = Number(ini)
            return quo
        })
    }
}
export const sessions = createSessions()

// current session
export const c = derived(
    [sessions, cSess],
    ([$sessions, $cSess]) => {
        console.log("derived session fetching")
        return $sessions[$cSess]
    }
)
