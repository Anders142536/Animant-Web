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
        addPlayer: (sessionId) => update(x => {
                console.log(sessionId)
                x[sessionId].latestId++
                x[sessionId].players.push({ 
                    id: x[sessionId].latestId,
                    name: "Player " + x[sessionId].latestId,
                    ini: 0
                })
            }),
        removePlayer: () => {}
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