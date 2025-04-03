import { defineStore } from "pinia";
import { ref } from "vue";

export const useDarkModeStore = defineStore("darkMode", () => {
    const isDark = ref(localStorage.getItem("color-theme") === "dark" ||
                        (!localStorage.getItem("color-theme") &&
                        window.matchMedia("(prefers-color-scheme: dark)").matches)); // Get from localStorage

    function setDarkMode(enabled) {
        isDark.value = enabled !== undefined ? enabled : false;
        localStorage.setItem("color-theme", enabled ? "dark" : "light"); // Save preference

        if (enabled) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }

    /**
     * Run it only once from AppLayout
     */
    function initiliaze() {
        if (isDark.value) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }

    return { isDark, setDarkMode, initiliaze };
});
