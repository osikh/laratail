<script setup>
import { ref, watch, computed } from 'vue';

const selectedValue = ref('');
const props = defineProps(['params']);

const styleClass = {
    active: "w-full px-4 py-2 font-medium text-left rtl:text-right text-white bg-blue-700 border-b border-gray-200 cursor-pointer focus:outline-none dark:bg-gray-800 dark:border-gray-600",
    regular: "w-full px-4 py-2 font-medium text-left rtl:text-right border-b border-gray-200 cursor-pointer hover:bg-gray-100 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:border-gray-600 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-500 dark:focus:text-white"
}

const isFilterActive = () => {
    return selectedValue.value !== '';
};

const doesFilterPass = (params) => {
    if (!isFilterActive()) return true;
    const { node } = params;
    const value = props.params.getValue(node).toString().toLowerCase();
    return value.includes(selectedValue.value.toLowerCase());
};

const getModel = () => {
    return isFilterActive() ? { value: selectedValue.value } : null;
};

const setModel = (model) => {
    selectedValue.value = model?.value || '';
};

const distinctValues = computed(() => {
    if (!props.params?.rowModel?.rootNode) {
        return [];
    }
    const allData = props.params.rowModel.rootNode.allLeafChildren.map(row => row.data);
    const columnField = props.params.colDef?.field;
    if (!columnField) {
        return [];
    }
    return [...new Set(allData.map(row => row[columnField]).filter(Boolean))];
});

const toggleSelection = (value) => {
    selectedValue.value = value;
};

const clearSelection = () => {
    selectedValue.value = '';
}

watch(selectedValue, () => {
    props.params.filterChangedCallback();
});
</script>

<template>
    <div class="w-48 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white">
        <button
        v-for="value in distinctValues"
        :key="value"
        aria-current="true"
        type="button"
        :class="selectedValue === value ? styleClass.active : styleClass.regular"
        @click="selectedValue === value ? clearSelection() : toggleSelection(value)">
            {{ value }}
        </button>
    </div>
</template>
