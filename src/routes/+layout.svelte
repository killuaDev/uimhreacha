<script>
    import "../app.css"
    import { page } from "$app/stores";
    console.log($page.route.id)
</script>

<div class="w-full max-w-screen-xl mx-auto">
    <div class="bg-white sticky top-0 py-1 border-b flex w-full">
        <h1 class="text-3xl p-4 font-bold text-orange-600">Uimhreacha</h1>
        <div class="hidden md:flex justify-around items-center w-full">
            <a href=/ class="{$page.route.id === "/" ? "text-orange-600" : ""} flex items-center justify-around">
                Convert
                <span class="material-symbols-outlined">
                    repeat
                </span>
            </a>
            <a href=/practice class="{$page.route.id === "/practice" ? "text-orange-600" : ""} flex items-center justify-around">
                Practice
                <span class="material-symbols-outlined">
                    edit
                </span>
            </a>
        </div>
    </div>

    <div class=overflow-auto>
        <slot/>
    </div>

    <div class="bg-white md:hidden sticky bottom-0 font-bold w-full flex py-4 border-t text-center items-center justify-around">
        <a href=/ class="{$page.route.id === "/" ? "text-orange-600" : ""} flex flex-col items-center justify-around">
            <span class="material-symbols-outlined">
                repeat
            </span>
            Convert
        </a>
        <a href=/practice class="{$page.route.id === "/practice" ? "text-orange-600" : ""} flex flex-col items-center justify-around">
            <span class="material-symbols-outlined">
                edit
            </span>
            Practice
        </a>
    </div>
</div>
