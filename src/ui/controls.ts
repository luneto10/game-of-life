import type { Grid } from "../game/grid"

const BASE_STEP_MS = 500

type ControlButtons = {
    step: HTMLElement
    reset?: HTMLElement
    play?: HTMLElement
    speed?: HTMLSelectElement
    size?: HTMLSelectElement
}

export function bindControls(
    buttons: ControlButtons,
    grid: Grid,
    onBoardChange: () => void,
    onSizeChange?: () => void,
) {
    let intervalId: ReturnType<typeof setInterval> | undefined
    let speed = Number(buttons.speed?.value) || 1

    const stepDelay = () => BASE_STEP_MS / speed

    const stop = () => {
        if (intervalId !== undefined) {
            clearInterval(intervalId)
            intervalId = undefined
        }
        if (buttons.play) {
            buttons.play.textContent = "Play"
        }
    }

    const start = () => {
        if (intervalId !== undefined) {
            clearInterval(intervalId)
        }
        intervalId = setInterval(() => {
            grid.step()
            onBoardChange()
        }, stepDelay())
        if (buttons.play) {
            buttons.play.textContent = "Stop"
        }
    }

    buttons.step.addEventListener("click", () => {
        grid.step()
        onBoardChange()
    })

    buttons.reset?.addEventListener("click", () => {
        stop()
        grid.reset()
        onBoardChange()
    })

    buttons.play?.addEventListener("click", () => {
        if (intervalId !== undefined) {
            stop()
            return
        }
        start()
    })

    buttons.speed?.addEventListener("change", () => {
        speed = Number(buttons.speed?.value) || 1
        if (intervalId !== undefined) {
            start()
        }
    })

    buttons.size?.addEventListener("change", () => {
        const size = Number(buttons.size?.value)
        if (!Number.isFinite(size)) return
        const wasPlaying = intervalId !== undefined
        stop()
        grid.resize(size)
        onSizeChange?.()
        if (wasPlaying) start()
    })
}
