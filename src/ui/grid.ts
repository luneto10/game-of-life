import { createCell } from "./cell"

export function renderGrid(
    container: HTMLElement,
    state: boolean[][]
) {
    container.innerHTML = ""

    state.forEach((row, rowIndex) => {
        row.forEach((isAlive, colIndex) => {
            const cell = createCell(
                rowIndex,
                colIndex,
                isAlive
            )
            container.appendChild(cell)
        })
    })
}