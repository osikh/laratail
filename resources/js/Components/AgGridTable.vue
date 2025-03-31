<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from "vue";
import {
    AllCommunityModule,
    ModuleRegistry,
    colorSchemeDarkBlue,
    colorSchemeLightCold,
    themeQuartz,
} from 'ag-grid-community';
import { AgGridVue } from "ag-grid-vue3";
import UsernameRenderer from "./AGCellRenderer/UsernameRenderer.vue";

ModuleRegistry.registerModules([AllCommunityModule]);

const rowData = ref([]);

// Column Definitions (With Grouping)
const colDefs = ref([
    {
        headerName: "Account",
        children: [
            { field: "name", headerName: "Name", checkboxSelection: true, flex: 2, minWidth: 250, cellRenderer: UsernameRenderer },
            { field: "gender", headerName: "Gender" },
            { field: "ethnicity", headerName: "Ethnicity" },
            { field: "age", headerName: "Age" },
        ],
    },
    {
        headerName: "Contact",
        children: [
            { field: "mobile_number", headerName: "Mobile" },
            { field: "email_id", headerName: "Email" },
        ],
    },
    {
        headerName: "Legal",
        children: [
            { field: "nationality", headerName: "Nationality", filter: "agTextColumnFilter" },
            { field: "national_id_card", headerName: "ID", filter: "agTextColumnFilter" },
            { field: "national_id_card_name", headerName: "ID Type", filter: "agTextColumnFilter" },
        ],
    },
]);

// Global Search
const gridApi = ref(null);
const searchQuery = ref("");
const agtheme = ref(themeQuartz.withPart(colorSchemeDarkBlue));

const darkTheme = themeQuartz.withPart(colorSchemeDarkBlue)
const lightTheme = themeQuartz.withPart(colorSchemeLightCold)

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
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.attributeName === "class") {
                const htmlTag = document.documentElement;
                if (htmlTag.classList.contains("dark")) {
                    agtheme.value = darkTheme
                } else {
                    agtheme.value = lightTheme
                }
            }
        });
    });

    observer.observe(document.documentElement, { attributes: true });

    // Store observer reference to stop it later if needed
    document.documentElement._darkModeObserver = observer;
});

onBeforeUnmount(() => {
    document.documentElement._darkModeObserver?.disconnect();
});
</script>

<template>
    <AgGridVue :rowData="rowData" :columnDefs="colDefs" class="w-full" rowSelection="multiple" :pagination="true"
        :animateRows="true" @grid-ready="onGridReady" :theme="agtheme"></AgGridVue>
</template>
