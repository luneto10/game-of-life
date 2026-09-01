export function createCell(
    row: number,
    col: number,
    alive: boolean
): HTMLDivElement {
    const cell = document.createElement("div")

    cell.classList.add("cell")

    if (alive){
        cell.classList.add("alive")
    }

    cell.dataset.row = row.toString()
    cell.dataset.col = col.toString()
    
    return cell
}