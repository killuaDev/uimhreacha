<script lang="ts">
    import { irishForNumberNew } from "../numbers";
    let score: number;
    let lives: number;
    let target: number;
    let userAnswer: string;
    let hasLost: boolean;
    let correctAnswer: string;
    let minNumber = 1;
    let maxNumber = 1000000

    let answerResult: "correct" | "incorrect" | "unanswered";

    function reset() {
        score = 0;
        lives = 3;
        hasLost = false;
        nextNumber();
    }

    // A random number between 1 and 1,000,000
    function generateNumber(min?: number, max?: number): number {
        if (!min || min < 1) {
            min = 1;
        }

        if (!max || max > 1000000) { 
            max = 1000000;
        }

        return Math.floor(Math.random() * max) + min;
    }

    function nextNumber() {
        if (lives <= 0) {
            hasLost = true;
        }

        target = generateNumber(minNumber, maxNumber);
        userAnswer = "";
        answerResult = "unanswered";
    }

    function checkAnswer() {
        correctAnswer = irishForNumberNew(target);
        if (userAnswer === correctAnswer) {
            answerResult = "correct";
            score += 1;
        } else {
            console.log("Correct answer: ", correctAnswer);
            answerResult = "incorrect";
            lives -= 1;
        }
    }

    reset();
</script>

<div class="flex flex-col md:flex-row m-4 gap-8 justify-stretch">
    {#if hasLost}
        <div class="flex flex-col gap-4 items-stretch w-full">
            <div class="p-4 bg-red-200 w-full">
                You lost! Your final score was {score}.
            </div>
            <button on:click={reset} class="py-4 bg-orange-200">Play Again</button>
        </div>
    {:else}
        <div class="flex flex-col gap-4 items-stretch w-full">
            <div class="flex justify-around w-full">
                <div> Score: {score} </div>
                <div> Lives: {lives} </div>
            </div>
            <div class="p-4 bg-gray-200 flex items-center align-center justify-center text-left min-h-[8em]">
                {target}
            </div>
            <input disabled={answerResult !== "unanswered"} class="px-2 py-4 block border" bind:value={userAnswer}/>

            {#if answerResult === "unanswered"}
                <button on:click={checkAnswer} class="py-4 bg-orange-200">Check</button>
            {:else}
                <button on:click={nextNumber} class="py-4 {answerResult == "correct" ? "bg-green-200" : "bg-red-200"}">
                    <div class='flex justify-center items-center'>
                    Next
                    <span class="material-symbols-outlined">{answerResult === "correct" ? "check" : "close"}</span>
                    </div>
                </button>
            {/if}
            {#if answerResult === "incorrect"} 
            <div class="p-1 text-red-600 flex justify-center text-center items-center">
                {correctAnswer}
            </div>
            {/if}
        </div>
    {/if}
    <div>
        <h1 class="text-2xl"> Notes </h1>
        <div class=py-2>
        Numbers are formed based on Córas na mBunuimhreacha, from An Caighdeán Oifigiúil 2017. 
        You shouldn't capitalise any of the letters, but you should include commas and spaces as appropriate.
        </div>

        <h1 class="text-2xl"> Options </h1>
        <div class=py-2>
            Minimum <input bind:value={minNumber} type="number" id="min" name="min" min=1 max=1000000 class="border p-1">
        </div>
        <div class=py-2>
            Maximum <input bind:value={maxNumber} type="number" id="max" name="max" min=10 max=1000000 class="border p-1">
        </div>
        <button on:click={reset} class="m-2 px-6 py-4 bg-orange-200">Start Again</button>
    </div>
</div>