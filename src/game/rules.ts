export function isNextAlive(isAlive: boolean, neighbors: number): boolean {
    // If alive 2 or 3 nei keeps alive
    if (isAlive){
        return neighbors === 2 || neighbors === 3
    }

    // if dead, 3 neighboor makes it alive
    return neighbors === 3
}