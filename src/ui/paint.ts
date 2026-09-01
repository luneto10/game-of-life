import type { CellIndex } from "./cellIndex"

export function paintCell(el: HTMLElement, alive: boolean) {
    if (el.classList.contains("alive") === alive) return
    el.classList.toggle("alive", alive)
}

export function paintBoard(state: boolean[][], index: CellIndex) {
    index.forEach((el, row, col) => {
        paintCell(el, state[row][col])
    })
}
