import { gameDecisionType } from '../types/gameDecisionType.ts'

export const decision = (input: string, opponentMove: string): gameDecisionType => {

    const gameResult: gameDecisionType = {
      win: false,
      tie: false,
      message: ''
    };
    
    if(input === opponentMove){
      gameResult.tie = true;
      gameResult.message = "It's a TIE";
    }
    else if(input === "rock" && opponentMove === "paper") {
      gameResult.message = "Paper wraps around a rock, YOU LOSE";
    }
    else if(input === "rock" && opponentMove === "scissors"){
      gameResult.win = true;
      gameResult.message = "Rock blunts scissors, YOU WIN";
    } 
    else if(input === "paper" && opponentMove === "rock") {
      gameResult.win = true;
      gameResult.message = "Paper wraps around a rock, YOU WIN";
    }
    else if(input === "paper" && opponentMove === "scissors") {
      gameResult.message = "Scissors cut paper, YOU LOSE";
    }
    else if(input === "scissors" && opponentMove === "rock") {
      gameResult.message = "Rock blunts scissors, YOU LOSE";
    }
    else if(input === "scissors" && opponentMove === "paper") {
      gameResult.win = true;
      gameResult.message = "Scissors cut paper, YOU WIN";
    }
    else gameResult.message = "Oops";

    return gameResult;
    
}