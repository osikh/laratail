<script setup>
import { defineProps } from "vue";
const { params } = defineProps(["params"]);

const { value, data } = params;
const { first_name, last_name, ethnicity } = data;
</script>

<template>
    <div class="px-2 py-0 text-sm">
        <div class="flex">
            <div class="flex-shrink-0 w-10 h-10">
                <img class="w-full h-full rounded-full"
                    src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.2&w=160&h=160&q=80"
                    alt="" />
            </div>
            <div class="ml-3">
                <p class="text-gray-900 whitespace-no-wrap dark:text-white">
                    {{ first_name }} {{ last_name }}
                </p>
                <p class="text-gray-600 whitespace-no-wrap  dark:text-gray-400">{{ ethnicity }}</p>
            </div>
        </div>
    </div>
</template>

<style>
</style>
