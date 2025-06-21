<script lang="ts">
  import { onMount } from 'svelte';

  type Mode = 'pomodoro' | 'short' | 'long';

  let time = 25 * 60;
  let running = false;
  let timer: NodeJS.Timeout;
  let mode: Mode = 'pomodoro';

  const modes = {
    pomodoro: 25 * 60,
    short: 5 * 60,
    long: 15 * 60,
  };

  function setMode(newMode: Mode) {
    mode = newMode;
    time = modes[newMode];
    stopTimer();
  }

  function startTimer() {
    running = true;
    timer = setInterval(() => {
      time--;
      if (time <= 0) {
        stopTimer();
        // TODO: add sound notification and auto-switch mode
      }
    }, 1000);
  }

  function stopTimer() {
    running = false;
    clearInterval(timer);
  }

  function formatTime(seconds: number) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  }

  onMount(() => {
    //
  });
</script>

<div class="min-h-screen bg-pomodoro-red text-white flex flex-col items-center pt-10 font-sans">
  <header class="w-full max-w-3xl flex justify-between items-center p-4">
    <h1 class="text-2xl font-bold">Pomofocus</h1>
    <div class="space-x-2">
      <button class="bg-pomodoro-red-light rounded p-2">Report</button>
      <button class="bg-pomodoro-red-light rounded p-2">Setting</button>
      <button class="bg-pomodoro-red-light rounded p-2">Sign In</button>
    </div>
  </header>

  <main class="w-full max-w-md mt-10">
    <div class="bg-pomodoro-red-light bg-opacity-75 p-8 rounded-lg">
      <div class="flex justify-center space-x-2 mb-8">
        <button on:click={() => setMode('pomodoro')} class:font-bold={mode === 'pomodoro'} class="px-4 py-2 rounded-md transition-colors" class:bg-pomodoro-red={mode === 'pomodoro'}>Pomodoro</button>
        <button on:click={() => setMode('short')} class:font-bold={mode === 'short'} class="px-4 py-2 rounded-md transition-colors" class:bg-pomodoro-red={mode === 'short'}>Short Break</button>
        <button on:click={() => setMode('long')} class:font-bold={mode === 'long'} class="px-4 py-2 rounded-md transition-colors" class:bg-pomodoro-red={mode === 'long'}>Long Break</button>
      </div>
      <div class="text-center">
        <h1 class="text-8xl font-bold">{formatTime(time)}</h1>
      </div>
      <div class="text-center mt-6">
        <button on:click={running ? stopTimer : startTimer} class="bg-white text-pomodoro-red font-bold px-16 py-4 rounded-lg text-2xl uppercase shadow-lg">
          {running ? 'Stop' : 'Start'}
        </button>
      </div>
    </div>

    <div class="mt-8 text-center">
        <p>#1</p>
        <p>Time to focus!</p>
    </div>

    <div class="mt-8">
        <div class="flex justify-between items-center border-b-2 border-white pb-2">
            <h2 class="text-xl font-semibold">Tasks</h2>
            <button class="bg-pomodoro-red-light p-2 rounded">...</button>
        </div>

        <div class="mt-4">
            <button class="w-full border-2 border-dashed border-pomodoro-red-light rounded-lg p-4 text-center hover:bg-pomodoro-red-light transition-colors">
                + Add Task
            </button>
        </div>
    </div>
  </main>
</div>
