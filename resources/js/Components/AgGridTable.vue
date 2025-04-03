<script setup>
import { ref, computed, onMounted } from "vue";
import { useDarkModeStore } from "@/Store/DarkMode";
import {
    IconPlusOutline,
    IconFilterOutline,
    IconAngleDownOutline
} from "@iconify-prerendered/vue-flowbite";
import {
    AllCommunityModule,
    ModuleRegistry,
    colorSchemeDarkBlue,
    colorSchemeLightCold,
    themeQuartz,
} from 'ag-grid-community';
import { AgGridVue } from "ag-grid-vue3";
import UsernameRenderer from "./AGCellRenderer/UsernameRenderer.vue";
import SetFilter from "./AGColFilter/SetFilter.vue";

ModuleRegistry.registerModules([AllCommunityModule]);

const rowData = ref([]);

// Column Definitions (With Grouping)
const colDefs = ref([
    {
        headerName: "Account",
        children: [
            { field: "name", headerName: "Name", checkboxSelection: true, flex: 2, minWidth: 250, cellRenderer: UsernameRenderer },
            { field: "gender", headerName: "Gender", flex: 1, minWidth: 100 },
            { field: "ethnicity", headerName: "Ethnicity", flex: 1, minWidth: 150 },
            { field: "age", headerName: "Age", flex: 1, minWidth: 100 },
        ],
    },
    {
        headerName: "Contact",
        children: [
            { field: "mobile_number", headerName: "Mobile", flex: 1, minWidth: 155 },
            { field: "email_id", headerName: "Email", flex: 1, minWidth: 150 },
        ],
    },
    {
        headerName: "Legal",
        children: [
            { field: "nationality", headerName: "Nationality", flex: 1, minWidth: 150, filter: SetFilter },
            { field: "national_id_card", headerName: "ID", flex: 1, minWidth: 150 },
            { field: "national_id_card_name", headerName: "ID Type", flex: 1, minWidth: 150, filter: SetFilter },
        ],
    },
]);

// Global Search
const gridApi = ref(null);
const searchQuery = ref("");

const darkTheme = themeQuartz.withPart(colorSchemeDarkBlue)
const lightTheme = themeQuartz.withPart(colorSchemeLightCold)

const darkModeStore = useDarkModeStore()
const agtheme = computed(() => darkModeStore.isDark ? darkTheme : lightTheme)

const onGridReady = (params) => {
    gridApi.value = params.api;
};

// Fetch data from API
const loadGridData = async () => {
    try {
        const response = await fetch("/json/users.json");
        rowData.value = await response.json();
    } catch (error) {
        console.error("Error loading data:", error);
    }
};

// Load data when component is mounted
onMounted(() => {
    loadGridData()
});
</script>

<template>
    <div class="flex flex-col">
        <div class="relative h-34 lg:h-16 bg-white shadow-md dark:bg-gray-800 sm:rounded-lg mb-4">
            <div class="flex flex-col items-center justify-between p-4 space-y-3 md:flex-row md:space-y-0 md:space-x-4">
                <div class="w-full md:w-1/2">
                    <form class="flex items-center">
                        <label for="simple-search" class="sr-only">Search</label>
                        <div class="relative w-full">
                            <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                <svg aria-hidden="true" class="w-5 h-5 text-gray-500 dark:text-gray-400"
                                    fill="currentColor" viewbox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd"
                                        d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                                        clip-rule="evenodd" />
                                </svg>
                            </div>
                            <input type="text" id="simple-search"
                                class="block w-full p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                placeholder="Search" required="">
                        </div>
                    </form>
                </div>
                <div
                    class="flex flex-col items-stretch justify-end flex-shrink-0 w-full space-y-2 md:w-auto md:flex-row md:space-y-0 md:items-center md:space-x-3">
                    <button type="button"
                        class="flex items-center justify-center px-4 py-2 text-sm font-medium text-white rounded-lg bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800">
                        <IconPlusOutline class="h-4 w-4 mr-2" />
                        Add product
                    </button>
                    <div class="flex items-center w-full space-x-3 md:w-auto">
                        <button id="actionsDropdownButton" data-dropdown-toggle="actionsDropdown"
                            class="flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg md:w-auto focus:outline-none hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                            type="button">
                            <IconAngleDownOutline class="h-4 w-4 mr-2" />
                            Actions
                        </button>
                        <div id="actionsDropdown"
                            class="z-10 hidden bg-white divide-y divide-gray-100 rounded shadow w-44 dark:bg-gray-700 dark:divide-gray-600">
                            <ul class="py-1 text-sm text-gray-700 dark:text-gray-200"
                                aria-labelledby="actionsDropdownButton">
                                <li>
                                    <a href="#"
                                        class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Mass
                                        Edit</a>
                                </li>
                            </ul>
                            <div class="py-1">
                                <a href="#"
                                    class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Delete
                                    all</a>
                            </div>
                        </div>
                        <button id="filterDropdownButton" data-dropdown-toggle="filterDropdown"
                            class="flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg md:w-auto focus:outline-none hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                            type="button">
                            <IconPlusOutline class="h-4 w-4 mr-2" />
                            Filter
                            <IconAngleDownOutline class="-mr-1 ml-1.5 h-4 w-4" />
                        </button>
                        <!-- Dropdown menu -->
                        <div id="filterDropdown"
                            class="z-10 hidden w-48 p-3 bg-white rounded-lg shadow dark:bg-gray-700">
                            <h6 class="mb-3 text-sm font-medium text-gray-900 dark:text-white">
                                Category
                            </h6>
                            <ul class="space-y-2 text-sm" aria-labelledby="dropdownDefault">
                                <li class="flex items-center">
                                    <input id="apple" type="checkbox" value=""
                                        class="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
                                    <label for="apple"
                                        class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-100">
                                        Apple (56)
                                    </label>
                                </li>
                                <li class="flex items-center">
                                    <input id="fitbit" type="checkbox" value=""
                                        class="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
                                    <label for="fitbit"
                                        class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-100">
                                        Fitbit (56)
                                    </label>
                                </li>
                                <li class="flex items-center">
                                    <input id="dell" type="checkbox" value=""
                                        class="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
                                    <label for="dell" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-100">
                                        Dell (56)
                                    </label>
                                </li>
                                <li class="flex items-center">
                                    <input id="asus" type="checkbox" value="" checked
                                        class="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
                                    <label for="asus" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-100">
                                        Asus (97)
                                    </label>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="flex-grow">
            <AgGridVue
            :rowData="rowData"
            :columnDefs="colDefs"
            class="myAgTable w-full h-[100%]"
            rowSelection="multiple"
            :pagination="true"
            :animateRows="true"
            @grid-ready="onGridReady"
            :theme="agtheme"></AgGridVue>
        </div>
    </div>
</template>
