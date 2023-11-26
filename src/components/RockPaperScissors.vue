<template>
  <transition name="header" appear>
    <h1>{{ header }}</h1>
  </transition>

  <div class="card">
    <transition name="game" mode="out-in" appear>
      <div class="buttons" v-if="showInput">
        <button class="game_button" type="button" @click="gameInput('rock')">
          <img src="rock.svg" alt="rock input" width="150" height="150">
        </button>
        <button class="game_button" type="button" @click="gameInput('paper')">
          <img src="paper.svg" alt="paper input" width="150" height="150">
        </button>
        <button class="game_button" type="button" @click="gameInput('scissors')">
          <img src="scissors.svg" alt="scissors input" width="150" height="150">
        </button>
      </div>

      <div v-else>
        <div class="round" v-if="!showInput">
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
        
        <div class="message" v-if="!showInput">
          <h3 class="tieMessageBackground">{{ result }}</h3>
          <button @click="showInput = true">Play again</button>
        </div>

        <div class="stats" v-if="!showInput">
          <div class="stat">
            Win percentage <p :class="winPercentageClass">{{ winPercentage }}%</p>
          </div>
          <div class="stat">
            Wins <p>{{ wins }}</p>
          </div>
          <div class="stat">
            Games played <p>{{ playedGames }}</p>
          </div>
        </div>
      </div>
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
  const result = ref<string>("");
  const showInput = ref<boolean>(true);
  const winPerClass = ref<string>("");

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

  const winPercentage = computed((): number => {
      if(wins.value === 0 && playedGames.value === 0) return winPer.value = 0;
      winPer.value = parseFloat(((wins.value/playedGames.value) * 100).toFixed(1));
      return winPer.value;
  })

  const winPercentageClass = computed((): string => {
    switch(true){
        case winPer.value < 20: {
          winPerClass.value = "winPer1";
          break;
        }
        case winPer.value >= 20 && winPer.value < 40: {
          winPerClass.value = "winPer2";
          break;
        }
        case winPer.value >= 40 && winPer.value < 60: {
          winPerClass.value = "winPer3";
          break;
        }
        case winPer.value >= 60 && winPer.value < 80: {
          winPerClass.value = "winPer4";
          break;
        }
        case winPer.value >= 80: {
          winPerClass.value = "winPer5";
          break;
        }
        default: {
          break;
        }
      }

      return winPerClass.value;
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

</script>

<style src="../styles/component_style.css" scoped></style>