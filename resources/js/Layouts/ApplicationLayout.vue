<script setup>
import { ref } from 'vue';
import { useDarkModeStore } from '@/Store/DarkMode';
import { Head, Link, router } from '@inertiajs/vue3';
import Navbar from '@/Components/Layout/Navbar.vue';
import Sidebar from '@/Components/Layout/Sidebar.vue';

import ApplicationMark from '@/Components/ApplicationMark.vue';
import Banner from '@/Components/Banner.vue';
import Dropdown from '@/Components/Dropdown.vue';
import DropdownLink from '@/Components/DropdownLink.vue';
import NavLink from '@/Components/NavLink.vue';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink.vue';

const darkModeStore = useDarkModeStore()

defineProps({
    title: String,
});

const showingNavigationDropdown = ref(false);

const switchToTeam = (team) => {
    router.put(route('current-team.update'), {
        team_id: team.id,
    }, {
        preserveState: false,
    });
};

const logout = () => {
    router.post(route('logout'));
};

import { onMounted } from 'vue'
import { initFlowbite } from 'flowbite'

// initialize components based on data attribute selectors
onMounted(() => {
    initFlowbite();

    darkModeStore.initiliaze()
})
</script>

<template>
    <div class="antialiased bg-gray-50 min-h-screen dark:bg-gray-900">

        <Head :title="title" />

        <Banner />

        <Navbar />
        <Sidebar />

        <main class="p-4 md:ml-64 h-auto pt-20">
            <div class="grid grid-cols-1 mb-4">
                <slot />
            </div>
        </main>

        <!-- Page Heading -->
        <!-- <header v-if="$slots.header" class="bg-white dark:bg-gray-800 shadow">
            <div class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                <slot name="header" />
            </div>
        </header> -->
    </div>
</template>
