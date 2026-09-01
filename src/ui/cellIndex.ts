export class CellIndex {
    private cells: (HTMLElement | undefined)[][] = []

    rebuild(container: HTMLElement, height: number, width: number) {
        this.cells = Array.from({ length: height }, () => Array(width))
        for (const el of container.querySelectorAll<HTMLElement>(".cell")) {
            const row = Number(el.dataset.row)
            const col = Number(el.dataset.col)
            this.cells[row][col] = el
        }
    }

    at(row: number, col: number): HTMLElement | undefined {
        return this.cells[row]?.[col]
    }

    forEach(visit: (el: HTMLElement, row: number, col: number) => void) {
        for (let row = 0; row < this.cells.length; row++) {
            const line = this.cells[row]
            for (let col = 0; col < line.length; col++) {
                const el = line[col]
                if (el) visit(el, row, col)
            }
        }
    }
}
