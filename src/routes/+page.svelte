<script lang="ts">
    import { element } from "svelte/internal";
    import {
        lenite,
        dontMutate,
        eclipse,
        hPrefix,
        irishForNumber,
        tripletizeNew,
    } from "./numbers";
    let bigNumber = 428;
    let answer = "";
    let correctAnswers: String[] = [];
    let reviewText = "";
    
    let userNumber = 1;
    let irishNumber = irishForNumber(userNumber);

    function showIrishNumber() {
        try {
            irishNumber = irishForNumber(userNumber);
        } catch {
            console.log("invalid number");
        }
    }

    function checkAnswer() {
        if (correctAnswers.includes(answer.toLocaleLowerCase())) {
            reviewText = "good";
        } else {
            reviewText = "bad";
        }
    }

    function generateNewNumber() {
        bigNumber = Math.floor(Math.random() * 999999);
        generateAnswers();
    }

    function generateAnswers() {
        correctAnswers = [];
        correctAnswers = [...correctAnswers, irishForNumber(bigNumber)];
    }

    generateAnswers();
    $: [
        1, 2, 10, 14, 20, 21, 30, 32, 100, 101, 110, 114, 1041, 1300, 1301,
        13452, 18901,
    ].forEach((element) => {
        console.log(irishForNumber(element));
    });
    $: ["bord", "fuil", "éan", "spéir", "sruth"].forEach((element) => {
        console.log(dontMutate(element));
        console.log(eclipse(element));
        console.log(hPrefix(element));
        console.log(lenite(element));
    });

    $: console.log("triplets: ", tripletizeNew(15423));
</script>

<h1>Uimhreacha</h1>
<span class="big-number">{bigNumber}</span>
<br />
<input class="answer-box" bind:value={answer} />
<button on:click={checkAnswer}>Submit</button>
<span class="answer">{answer}</span>
<br />
<span class="review-text">{reviewText}</span>
<button class="new-number" on:click={generateNewNumber}>
    Generate New Number
</button>
<input class="number-box" bind:value={userNumber}/>
<button on:click={showIrishNumber}>Get Irish</button>
<span class="irish-number">{irishNumber}</span>
<br />

{#each correctAnswers as answer}
    <span>{answer}</span>
{/each}
