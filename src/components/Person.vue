<script setup>
import { ref, defineProps } from 'vue';
import MetricTag from './MetricTag.vue';
import { formatNumbers } from '@/util/helpers';
const expanded = ref(false);
const toggle = () => (expanded.value = !expanded.value);

defineProps({
    person: {
        type: Object,
        default: () => ({})
    },
    tree: {
        type: Object,
    }
})

const getInitials = (name) => {
    const nameSplit = name.split(" ")
    return nameSplit[0][0] + nameSplit[1][0]
}

</script>


<template>
    <div class="border-gray-400 flex flex-col items-center gap-20">
        <div class="cursor-pointer bg-gray-100 w-84 px-4 text-center rounded-xl flex flex-col items-center pb-10 relative shadow-[0px_8px_6px_-2px_rgba(0,_0,_0,_0.2)]"
            @click="toggle">
            <section
                :class="`bg-[#E14848] h-30 w-[60%] flex flex-col items-center justify-center rounded-xl absolute text-4xl font-semibold text-white shadow-[0px_4px_8px_4px_rgba(0,_0,_0,_0.2)]`"
                style="top: -40px;">
                {{ getInitials(person.name) }}
            </section>
            <section class="mt-25 flex flex-col">
                <section>
                    <div class="text-2xl">
                        {{ person.name }}
                    </div>
                    <div class="text-xl text-gray-500 mt-1">
                        {{ person.jobTitle }}
                    </div>
                    <div class="text-[18px] italic">
                        {{ person.department }}
                    </div>
                </section>

                <div :class="`w-full h-0.5 bg-[#E14848] my-1.5`"></div>
                <section class="mb-3">
                    <div>
                        {{ person.location }}
                    </div>
                    <div>
                        Salary: ${{ formatNumbers(person.salary) }}/year
                    </div>
                    <div v-if="person.manager.trim()">
                        Reports to <span class="italic"> {{ tree[person.manager]["name"] }}</span>
                    </div>
                </section>
                <section class="flex flex-col gap-2">
                    <div class="text-xl">Reporting Line Metrics</div>
                    <div class="grid grid-cols-2 gap-4">
                        <MetricTag v-for="[key, value] of Object.entries(person.metrics)" :key="key + value"
                            :title="key" :metric="value" :level="person.level" />
                    </div>
                </section>
                <div
                    :class="`absolute bottom-[-20px] left-1/2 transform -translate-x-1/2 bg-[#E14848] text-white w-12 h-12 rounded-full flex items-center justify-center shadow-md cursor-pointer`">
                    <i :class="expanded ? `pi pi-arrow-up` : `pi pi-arrow-down`"></i>
                </div>
            </section>
        </div>
        <div v-if="expanded" class="flex justify-center gap-4 mx-5">
            <Person v-for="child in person.children" :key="child" :person="tree[child]" :tree="tree" />
        </div>
    </div>
</template>
