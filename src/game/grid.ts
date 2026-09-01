export const DEFAULT_ROWS = 5
export const DEFAULT_COLS = 5

export class Grid {
    width: number
    height: number
    state: boolean[][]
    constructor(width: number = DEFAULT_ROWS, height: number = DEFAULT_ROWS) {
        this.width = width
        this.height = height
        this.state = this.createGrid()
    }

    private createGrid(): boolean[][]{
        return Array.from({length : this.height},
            () => Array(this.width).fill(false)
        )
    }

}
