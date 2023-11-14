<template>
  <h1>{{ msg }}</h1>

  <div class="card">
    <div class="buttons">
      <button type="button" @click="gameInput('rock')">Rock</button>
      <button type="button" @click="gameInput('paper')">Paper</button>
      <button type="button" @click="gameInput('scissors')">Scissors</button>
    </div>
    
    <div class="message">
      <p>{{ userInput }}</p>
    <p>{{ opponentInput }}</p>
    <p>{{ result }}</p>
    </div>

    <div class="stats">
      <p>Win percentage | {{ winPercentage }}% |</p>
    <p>Wins - {{ wins }}</p>
    <p>Games played - {{ playedGames }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

defineProps<{ 
  msg: string
}>()

const playedGames = ref<number>(0);
const wins = ref<number>(0);
const winPer = ref<number>(0);

const userInput = ref<string>("");
const opponentInput = ref<string>("");
const result = ref<string>("");

const winPercentage = computed((): number => {
    if(wins.value === 0 && playedGames.value === 0) return winPer.value = 0;
    winPer.value = parseFloat(((wins.value/playedGames.value) * 100).toFixed(1));
    return winPer.value;
})

const gameResult = (win: boolean) => {
  if(win) {
    wins.value++,
    playedGames.value++
  }
  else {
    playedGames.value++;
  }

}

const gameInput = (input: string) => {
  const randomValue: number = Math.floor(Math.random() * 3);
  const opponentMove: string = randomValue === 0 ? "rock" : randomValue === 1 ? "paper" : "scissors";

  type gameDecisionType = {
    win: boolean,
    tie: boolean,
    message: string
  }

  const gameDecision: gameDecisionType = {
    win: false,
    tie: false,
    message: ''
  };

  userInput.value = input;
  opponentInput.value = opponentMove;

  if(input === opponentMove){
    gameDecision.tie = true;
    gameDecision.message = "It's a TIE";
  }
  else if(input === "rock" && opponentMove === "paper") {
    gameDecision.message = "Paper wraps around a rock, YOU LOSE";
  }
  else if(input === "rock" && opponentMove === "scissors"){
    gameDecision.win = true;
    gameDecision.message = "Rock blunts scissors, YOU WIN";
  } 
  else if(input === "paper" && opponentMove === "rock") {
    gameDecision.win = true;
    gameDecision.message = "Paper wraps around a rock, YOU WIN";
  }
  else if(input === "paper" && opponentMove === "scissors") {
    gameDecision.message = "Scissors cut paper, YOU LOSE";
  }
  else if(input === "scissors" && opponentMove === "rock") {
    gameDecision.message = "Rock blunts scissors, YOU LOSE";
  }
  else if(input === "scissors" && opponentMove === "paper") {
    gameDecision.win = true;
    gameDecision.message = "Scissors cut paper, YOU WIN";
  }
  else gameDecision.message = "Oops";

  result.value = gameDecision.message;
  if(gameDecision.win) gameResult(true);
  else gameResult(false);

}

</script>

<style scoped>

</style>
