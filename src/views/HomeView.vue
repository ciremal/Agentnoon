<script setup>
import Papa from 'papaparse'
import { reactive, onMounted } from 'vue'
import { buildTree } from '@/util/buildTree';
import Person from '@/components/Person.vue';

const state = reactive({
    tree: {},
    isLoading: true,
})

onMounted(async () => {
    const response = await fetch('/src/GigaCorp.csv');
    const csvText = await response.text();
    Papa.parse(csvText, {
        header: true,
        complete(results) {
            const people = results.data.map(p => ({
                id: p['Employee Id'],
                name: p['Name'],
                manager: p['Manager'],
                jobTitle: p["Job Title"],
                location: p["Location"],
                salary: parseInt(p["Salary"]),
                level: p["level"],
                department: p["Department"]
            }));
            state.tree = buildTree(people);
            state.isLoading = false

        },
    });
});

</script>

<template>

    <body class="flex justify-center flex-col items-center">
        <h1 class="text-4xl mt-10">Giga Corp - Reporting Line Hierarchy</h1>
        <section class="mt-24 w-full overflow-x-auto pt-16 pb-16 mb-50">
            <div v-if="state.isLoading">
                Loading...
            </div>
            <div v-else class="min-w-fit px-10 flex justify-center" style="min-width: max-content;">
                <Person :person="state.tree.map[state.tree.root]" :tree="state.tree.map" />
            </div>
        </section>
    </body>
</template>