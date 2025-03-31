<script setup>
import ApplicationLayout from '@/Layouts/ApplicationLayout.vue';
import Welcome from '@/Components/Welcome.vue';
import AgGridTable from '@/Components/AgGridTable.vue';
</script>

<template>
    <ApplicationLayout title="Dashboard">
        <template #header>
            <h2 class="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                Dashboard
            </h2>
        </template>

        <div class="py-2">
            <div class="bg-white dark:bg-gray-800 overflow-hidden shadow-xl sm:rounded-lg">
                <AgGridTable class="h-96" />
            </div>
            <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
                <div class="bg-white dark:bg-gray-800 overflow-hidden shadow-xl sm:rounded-lg">

                </div>
            </div>
        </div>
    </ApplicationLayout>
</template>
