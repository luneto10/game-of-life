import "./style.css"

import { Grid } from "./game/grid"
import { CellIndex } from "./ui/cellIndex"
import { bindControls } from "./ui/controls"
import { bindDraw } from "./ui/draw"
import { renderGrid } from "./ui/grid"
import { paintBoard } from "./ui/paint"

const gridContainer = document.querySelector<HTMLElement>("[data-grid]")
const stepButton = document.querySelector<HTMLElement>("[data-step]")
const resetButton = document.querySelector<HTMLElement>("[data-reset]")
const playButton = document.querySelector<HTMLElement>("[data-play]")
const speedSelect = document.querySelector<HTMLSelectElement>("[data-speed]")
const sizeSelect = document.querySelector<HTMLSelectElement>("[data-size]")

if (!gridContainer || !stepButton) {
    throw new Error("Grid container not found")
}

const initialSize = Number(sizeSelect?.value) || 80
const grid = new Grid(initialSize, initialSize)
const cells = new CellIndex()

const syncBoard = () => {
    gridContainer.style.setProperty("--cols", String(grid.width))
    renderGrid(gridContainer, grid.state)
    cells.rebuild(gridContainer, grid.height, grid.width)
}

syncBoard()
bindDraw(gridContainer, grid, cells)
bindControls(
    {
        step: stepButton,
        reset: resetButton ?? undefined,
        play: playButton ?? undefined,
        speed: speedSelect ?? undefined,
        size: sizeSelect ?? undefined,
    },
    grid,
    () => {
        paintBoard(grid.state, cells)
    },
    syncBoard,
)
