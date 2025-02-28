<template>
    <div class="custom-select" @click="toggleDropdown">
        <div class="selected">{{ selectedLabel }}</div>
        <div v-if="isOpen" class="options">
            <div v-for="option in optionsControl" :key="option.value" class="option" @click.stop="selectOption(option)">
                {{ option.label }}
            </div>
        </div>
        <div :class="['overlayOrdine', { 'view': isOpen }]"></div>
    </div>
</template>

<script>
import { ref, computed, watch, onMounted } from 'vue';
import dataStore from '../data/data';
import data from '../lingua.json';

export default {
    name: 'CustomSelect',
    setup() {
        const isOpen = ref(false);
        const lingua = computed(() => dataStore.lingua === "it-IT" ? data.languages[1] : data.languages[0]);
        const selectedLabel = ref(lingua.value.filtro);
        const options = ref([
            { value: 'default', label: lingua.value.predefinito },
            { value: 'ascVote', label: lingua.value.piuPopolari },
            { value: 'descVote', label: lingua.value.menoPopolari },
            { value: 'popularityAsc', label: lingua.value.meglioVotati },
            { value: 'popularityDesc', label: lingua.value.peggioVotati }
        ]);

        const toggleDropdown = () => {
            isOpen.value = !isOpen.value;
        };

        const optionsControl = computed(() => {
            return options.value.filter(element => element.label !== selectedLabel.value);
        });

        const selectOption = (option) => {
            selectedLabel.value = option.label;
            isOpen.value = false;
            dataStore.ordinamento = transform(option.label);
        };

        const transform = (ordinamento) => {
            switch (ordinamento) {
                case lingua.value.filtro: return -1;
                case lingua.value.predefinito: return 0;
                case lingua.value.piuPopolari: return 1;
                case lingua.value.menoPopolari: return 2;
                case lingua.value.meglioVotati: return 3;
                case lingua.value.peggioVotati: return 4;
            }
        };

        watch(lingua, () => {
            selectedLabel.value = options.value.find(opt => transform(opt.label) === dataStore.ordinamento)?.label || lingua.value.predefinito;
        });

        onMounted(() => {
            selectedLabel.value = options.value.find(opt => transform(opt.label) === dataStore.ordinamento)?.label || lingua.value.predefinito;
        });

        return {
            isOpen,
            selectedLabel,
            optionsControl,
            toggleDropdown,
            selectOption,
        };
    }
};
</script>

<style scoped>
.custom-select {
    position: fixed;
    top: 2%;
    left: 17%;
    width: 200px;
    background-color: #000000;
    color: #ffffff;
    padding: 10px;
    border-radius: 7px;
    cursor: pointer;
    text-align: left;
    z-index: 1000;
}

.selected {

    background: #000;
    border-radius: 7px;
}

.options {
    position: absolute;
    top: 100%;
    left: 0;
    width: 100%;
    background: #000;
    border-radius: 7px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    z-index: 10;
}

.option {
    padding: 5px;
    color: white;
    cursor: pointer;
}

.option:hover {
    background: #06182b;
}
.overlayOrdine {
    display: none;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: transparent;
    /* Colore e trasparenza per vedere l'overlay ma non bloccare completamente le opzioni */
    z-index: 9;
    /* Overlay sopra la pagina, ma sotto le opzioni */
}
.view {
    display: block;
}
@media (max-width: 768px) {
    .custom-select{
        display:none;
    }
}
</style>
