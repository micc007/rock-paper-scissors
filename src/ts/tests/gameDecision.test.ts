import { decision } from '../functions/gameDecision.ts'
import { describe, expect, it } from 'vitest'

describe("#decision", () => {
    it("rock vs paper -> paper should win", () => {
        expect(decision('rock', 'paper')).toMatchObject({ win: false, tie: false, message: "Paper wraps around a rock, YOU LOSE" });
    })
})

describe("#decision", () => {
    it("rock vs scissors -> rock should win", () => {
        expect(decision('rock', 'scissors')).toMatchObject({ win: true, tie: false, message: "Rock blunts scissors, YOU WIN" });
    })
})

describe("#decision", () => {
    it("scissors vs scissors -> should be a tie", () => {
        expect(decision('scissors', 'scissors')).toMatchObject({ win: false, tie: true, message: "It's a TIE" });
    })
})