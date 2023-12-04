<script lang="ts">
    import {
        irishForNumberNew
    } from "./numbers";
    let userNumber = 1;
    let irishNumber = '';

    function showIrishNumber() {
        try {
            irishNumber = irishForNumberNew(userNumber);
        } catch {
            console.log("invalid number");
        }
    }
    showIrishNumber();
</script>

<!--Is it better to use gap here? or add padding to the individual things-->
<div class="flex flex-col md:flex-row m-4 gap-8 justify-stretch">
    <div class="flex flex-col gap-4 items-stretch w-full">
        <input class="px-2 py-4 block border" bind:value={userNumber}/>
        <button on:click={showIrishNumber} class="py-4 bg-orange-200">Convert</button>
        <div class="p-4 bg-gray-200 flex items-center align-center justify-center text-left min-h-[8em]">
            {irishNumber}
        </div>
    </div>
    <div>
        <h1 class="text-2xl"> Notes </h1>
        Numbers are formed based on Córas na mBunuimhreacha, from An Caighdeán Oifigiúil 2017. 
        Input without commas.
        I've tested the numbers up to around 1,000,000 and they seem to work, but I can't guarantee that this will work with higher numbers.
        Source code: <a href=https://github.com/killuaDev/uimhreacha>here</a>
    </div>
</div>
