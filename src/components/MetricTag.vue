<script setup>
import { formatNumbers } from '@/util/helpers';
import { defineProps } from 'vue';

defineProps({
    title: {
        type: String,
        default: ""
    },
    metric: {
        type: Number,
    },
    level: {
        type: String,
    }
})

const formatTitle = (title) => {
    switch (title) {
        case "reportingLayers":
            return "Reporting Layers"
        case "totalCost":
            return "Total Cost"
        case "managerCount":
            return "Manager Count"
        case "managementCost":
            return "Management Cost"
        case "ICCount":
            return "IC Count"
        case "ICCost":
            return "ICCosts"
        case "managerCostRatio":
            return "Manager Cost Ratio"
        case "managerICRatio":
            return "Manager IC Ratio"
        default:
            break;
    }
}
</script>

<template>
    <div
        :class="`flex flex-col items-center justify-center bg-red-200 rounded-xl py-1 px-2 text-[14px] border border-[#E14848]`">
        {{ formatTitle(title) }}: {{ formatNumbers(metric) }}
    </div>
</template>