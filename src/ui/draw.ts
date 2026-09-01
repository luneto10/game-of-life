import type { Grid } from "../game/grid"
import type { CellIndex } from "./cellIndex"
import { paintCell } from "./paint"

function forEachCellOnLine(
    row0: number,
    col0: number,
    row1: number,
    col1: number,
    visit: (row: number, col: number) => void,
) {
    let row = row0
    let col = col0
    const dRow = Math.abs(row1 - row0)
    const dCol = Math.abs(col1 - col0)
    const sRow = row0 < row1 ? 1 : -1
    const sCol = col0 < col1 ? 1 : -1
    let err = dCol - dRow

    while (true) {
        visit(row, col)
        if (row === row1 && col === col1) break
        const err2 = 2 * err
        if (err2 > -dRow) {
            err -= dRow
            col += sCol
        }
        if (err2 < dCol) {
            err += dCol
            row += sRow
        }
    }
}

export function bindDraw(container: HTMLElement, grid: Grid, cells: CellIndex) {
    const coordsFromPoint = (x: number, y: number) => {
        const rect = container.getBoundingClientRect()
        const localX = x - rect.left
        const localY = y - rect.top
        if (localX < 0 || localY < 0 || localX >= rect.width || localY >= rect.height) {
            return null
        }
        const col = Math.min(grid.width - 1, Math.floor((localX / rect.width) * grid.width))
        const row = Math.min(grid.height - 1, Math.floor((localY / rect.height) * grid.height))
        return { row, col }
    }

    const applyPaintAt = (row: number, col: number, alive: boolean) => {
        if (row < 0 || row >= grid.height || col < 0 || col >= grid.width) return
        if (grid.state[row][col] === alive) return
        grid.setCell(row, col, alive)
        const cell = cells.at(row, col)
        if (cell) paintCell(cell, alive)
    }

    let isDrawing = false
    let paintAlive = false
    let lastRow = 0
    let lastCol = 0

    const paintStrokeTo = (row: number, col: number) => {
        forEachCellOnLine(lastRow, lastCol, row, col, (r, c) => {
            applyPaintAt(r, c, paintAlive)
        })
        lastRow = row
        lastCol = col
    }

    container.addEventListener("pointerdown", (event) => {
        if (event.button !== 0) return
        const coords = coordsFromPoint(event.clientX, event.clientY)
        if (!coords) return
        event.preventDefault()
        container.setPointerCapture(event.pointerId)
        isDrawing = true
        lastRow = coords.row
        lastCol = coords.col
        paintAlive = !grid.state[lastRow][lastCol]
        applyPaintAt(lastRow, lastCol, paintAlive)
    })

    container.addEventListener("pointermove", (event) => {
        if (!isDrawing) return
        const coords = coordsFromPoint(event.clientX, event.clientY)
        if (!coords) return
        paintStrokeTo(coords.row, coords.col)
    })

    const endStroke = (event: PointerEvent) => {
        if (!isDrawing) return
        isDrawing = false
        if (container.hasPointerCapture(event.pointerId)) {
            container.releasePointerCapture(event.pointerId)
        }
    }

    container.addEventListener("pointerup", endStroke)
    container.addEventListener("pointercancel", endStroke)
}
