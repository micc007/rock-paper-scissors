<template>
  <h1>{{ msg }}</h1>

  <div class="card">
    <button type="button" @click="gameResult(true)">Win</button>
    <button type="button" @click="gameResult(false)">Lose</button>
    <p>Win percentage | {{ winPercentage }}% |</p>
    <p>Wins - {{ wins }}</p>
    <p>Games played - {{ playedGames }}</p>
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

</script>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
