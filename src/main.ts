import "./style.css"

// Innitialize

import { Grid } from "./game/grid"
import { renderGrid } from "./ui/grid"

// get grid element
const gridContainer = document.querySelector<HTMLElement>("[data-grid]")

if (!gridContainer) {
    throw new Error("Grid container not found")
}

const grid = new Grid()
gridContainer.style.setProperty("--cols", String(grid.width))
renderGrid(gridContainer, grid.state)

// Render

// Loop forever