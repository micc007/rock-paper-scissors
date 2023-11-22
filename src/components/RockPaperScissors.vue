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
  import { gameDecisionType } from '../ts/types/gameDecisionType.ts'
  import { decision } from '../ts/functions/gameDecision.ts'

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

    userInput.value = input;
    opponentInput.value = opponentMove;

    const gameDecision: gameDecisionType = decision(input, opponentMove);

    result.value = gameDecision.message;
    if(gameDecision.win) gameResult(true);
    else gameResult(false);
  }

</script>

<style scoped>

</style>
