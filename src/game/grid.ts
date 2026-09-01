import { isNextAlive } from "./rules"

export const DEFAULT_ROWS = 5
export const DEFAULT_COLS = 5

const NEIGHBOR_OFFSETS = [
    [-1, -1],
    [-1, 0],
    [-1, 1],
    [0, -1],
    [0, 1],
    [1, -1],
    [1, 0],
    [1, 1],
] as const


export class Grid {
    width: number
    height: number
    state: boolean[][]
    next: boolean[][]
    constructor(width: number = DEFAULT_ROWS, height: number = DEFAULT_ROWS) {
        this.width = width
        this.height = height
        this.state = this.createGrid()
        this.next = this.createGrid()
    }

    private createGrid(): boolean[][] {
        return Array.from({ length: this.height },
            () => Array(this.width).fill(false)
        )
    }

    /**
     * step
     */
    public step(): void {
        
        this.next = this.state.map((row, rowIndex) =>
            row.map((_, colIndex) =>
                this.nextCellState(rowIndex, colIndex)
            )
        )
        const prev = this.state
        this.state = this.next
        this.next = prev
    }

    /**
     * countNeighbors
     */
    public countNeighbors(row: number, col: number): number {
        
        let count = 0

        for (const [dRow, dCol] of NEIGHBOR_OFFSETS){
            const neighborRow = row + dRow
            const neighborCol = col + dCol

            if (neighborRow < 0 || neighborRow >= this.height || neighborCol < 0 || neighborCol >= this.width) continue

            if (this.state[neighborRow][neighborCol]) count++
        }
        return count
    }

    /**
     * nextCellState
     */
    public nextCellState(row: number, col: number): boolean {
        return isNextAlive(
            this.state[row][col], 
            this.countNeighbors(row, col)
        )
    }

    public reset(): void {
        this.state = this.createGrid()
        this.next = this.createGrid()
    }

    public resize(size: number): void {
        const n = Math.min(150, Math.max(1, Math.floor(size)))
        this.width = n
        this.height = n
        this.state = this.createGrid()
        this.next = this.createGrid()
    }

    public setCell(row: number, col: number, alive: boolean): void {
        this.state[row][col] = alive
    }

    public toggleCell(row: number, col: number): boolean {
        this.setCell(row, col, !this.state[row][col])
        return this.state[row][col]
    }

}
