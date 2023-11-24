<template>
  <h1>{{ header }}</h1>

  <div class="card">
    <transition name="game">
      <div>

        <div class="buttons" v-if="showInput">
          <button type="button" @click="gameInput('rock')">
            <img src="rock.svg" alt="rock input" width="150" height="150">
          </button>
          <button type="button" @click="gameInput('paper')">
            <img src="paper.svg" alt="paper input" width="150" height="150">
          </button>
          <button type="button" @click="gameInput('scissors')">
            <img src="scissors.svg" alt="scissors input" width="150" height="150">
          </button>
        </div>

        <div class="message" v-if="!showInput">
          <div class="input-container">
            <h3>{{ userInput.value }}</h3>
            <img :src=userInput.src :alt=userInput.alt width="150" height="150">
          </div>
          <h2>VS</h2>
          <div class="input-container">
            <h3>{{ opponentInput.value }}</h3>
            <img :src=opponentInput.src :alt=opponentInput.alt width="150" height="150">
          </div>
        </div>

        <h3>{{ result }}</h3>
        <button @click="showInput = true">Play again</button>

        <div class="stats">
          <p>Win percentage | {{ winPercentage }}% |</p>
          <p>Wins - {{ wins }}</p>
          <p>Games played - {{ playedGames }}</p>
        </div>

      </div>
      
    </transition>

    <button @click=pokusFunction>ZMENA JE ŽIVOT</button>
    <transition name="animation-pokus" appear>
      <div class="stvorec" v-if="pokus"></div>
    </transition>
    
  </div>
</template>

<script setup lang="ts">
  import { ref, computed } from 'vue'
  import { gameDecisionType } from '../ts/types/gameDecisionType.ts'
  import { gameInputType } from '../ts/types/gameInputType.ts'
  import { decision } from '../ts/functions/gameDecision.ts'

  defineProps<{ 
    header: string
  }>()

  const playedGames = ref<number>(0);
  const wins = ref<number>(0);
  const winPer = ref<number>(0);

  const userInput = ref<gameInputType>({
    value: "",
    src: "",
    alt: ""
  });
  const opponentInput = ref<gameInputType>({
    value: "",
    src: "",
    alt: ""
  });
  const result = ref<string>("");

  const showInput = ref<boolean>(true);

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
    showInput.value = false;

    const randomValue: number = Math.floor(Math.random() * 3);
    const opponentMove: string = randomValue === 0 ? "rock" : randomValue === 1 ? "paper" : "scissors";

    userInput.value.value = input.charAt(0).toUpperCase() + input.slice(1);
    userInput.value.src = `${input}.svg`;
    userInput.value.alt = `${input} input`;

    opponentInput.value.value = opponentMove.charAt(0).toUpperCase() + opponentMove.slice(1);
    opponentInput.value.src = `${opponentMove}.svg`;
    opponentInput.value.alt = `${opponentMove} input`;

    const gameDecision: gameDecisionType = decision(input, opponentMove);

    result.value = gameDecision.message;
    if(gameDecision.win) gameResult(true);
    else gameResult(false);
  }

  const pokus = ref<boolean>(true);

  const pokusFunction = ():void => {
    pokus.value = !pokus.value
  }

</script>

<style scoped>

  .message {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 50px;
  }

  .message h2 {
    padding-top: 50px;
  }

  .input-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .stvorec {
    background-color: rgb(37, 168, 255);
    width: 150px;
    height: 150px;
  }

  .animation-pokus-enter-from {
    opacity: 0;
  }

  .animation-pokus-enter-to {
    opacity: 1;
  }

  .animation-pokus-enter-active,
  .animation-pokus-leave-active {
    transition: opacity 2s ease;
  }

  .animation-pokus-leave-from {
    opacity: 1;
  }

  .animation-pokus-leave-to {
    opacity: 0;
  }

</style>
