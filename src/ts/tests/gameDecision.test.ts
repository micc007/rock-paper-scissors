import { decision } from '../functions/gameDecision.ts'
import { describe, expect, it } from 'vitest'

// ROCK INPUT

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

// PAPER INPUT

describe("#decision", () => {
    it("paper vs rock -> paper should win", () => {
        expect(decision('paper', 'rock')).toMatchObject({ win: true, tie: false, message: "Paper wraps around a rock, YOU WIN" });
    })
})

describe("#decision", () => {
    it("paper vs scissors -> scissors should win", () => {
        expect(decision('paper', 'scissors')).toMatchObject({ win: false, tie: false, message: "Scissors cut paper, YOU LOSE" });
    })
})

// SCISSORS INPUT

describe("#decision", () => {
    it("rock vs scissors -> rock should win", () => {
        expect(decision('scissors', 'rock')).toMatchObject({ win: false, tie: false, message: "Rock blunts scissors, YOU LOSE" });
    })
})

describe("#decision", () => {
    it("rock vs scissors -> rock should win", () => {
        expect(decision('scissors', 'paper')).toMatchObject({ win: true, tie: false, message: "Scissors cut paper, YOU WIN" });
    })
})

// TIE

describe("#decision", () => {
    it("rock vs rock -> should be a tie", () => {
        expect(decision('rock', 'rock')).toMatchObject({ win: false, tie: true, message: "It's a TIE" });
    })
})

describe("#decision", () => {
    it("paper vs paper -> should be a tie", () => {
        expect(decision('paper', 'paper')).toMatchObject({ win: false, tie: true, message: "It's a TIE" });
    })
})

describe("#decision", () => {
    it("scissors vs scissors -> should be a tie", () => {
        expect(decision('scissors', 'scissors')).toMatchObject({ win: false, tie: true, message: "It's a TIE" });
    })
})