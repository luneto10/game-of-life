import { createCell } from "./cell"

export function renderGrid(
    container: HTMLElement,
    state: boolean[][]
) {
    const fragment = document.createDocumentFragment()

    state.forEach((row, rowIndex) => {
        row.forEach((isAlive, colIndex) => {
            fragment.appendChild(createCell(rowIndex, colIndex, isAlive))
        })
    })

    container.replaceChildren(fragment)
}
