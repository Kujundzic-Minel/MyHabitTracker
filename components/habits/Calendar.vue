<script setup lang="ts">
const props = defineProps<{
    habitId: number
}>();

const currentMonth = ref(new Date());
const days = ref<{ day: number; completed: boolean }[]>([]);

// Fonction simplifiée pour vérifier le statut
const refreshDays = () => {
    const daysArray = [];
    const year = currentMonth.value.getFullYear();
    const month = currentMonth.value.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    for (let i = 1; i <= daysInMonth; i++) {
        const date = new Date(year, month, i);
        // Format the date in local timezone
        const formattedDate = date.toLocaleDateString('fr-CA'); // Format YYYY-MM-DD
        const isCompleted = localStorage.getItem(`habit_${props.habitId}_${formattedDate}`) === 'completed';
        console.log(`Checking day ${i} (${formattedDate}): ${isCompleted}`); // Debug log amélioré
        daysArray.push({ day: i, completed: isCompleted });
    }
    days.value = daysArray;
};

const previousMonth = () => {
    const newMonth = new Date(currentMonth.value);
    newMonth.setMonth(newMonth.getMonth() - 1);
    currentMonth.value = newMonth;
    refreshDays();
};

const nextMonth = () => {
    const newMonth = new Date(currentMonth.value);
    newMonth.setMonth(newMonth.getMonth() + 1);
    currentMonth.value = newMonth;
    refreshDays();
};

// Initialisation et watches
onMounted(() => refreshDays());
watch(() => props.habitId, refreshDays);
watch(() => currentMonth.value, refreshDays);

// Expose days array and refreshDays function
defineExpose({ refreshDays, days });
</script>

<template>
    <div class="habit-calendar">
        <div class="habit-calendar__header">
            <button class="habit-calendar__nav" @click="previousMonth">&lt;</button>
            <h3 class="habit-calendar__title">
                {{ currentMonth.toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' }) }}
            </h3>
            <button class="habit-calendar__nav" @click="nextMonth">&gt;</button>
        </div>
        <div class="habit-calendar__grid">
            <div v-for="day in days" :key="day.day" class="habit-calendar__day">
                <span class="habit-calendar__date">{{ day.day }}</span>
                <div class="habit-calendar__indicator"
                    :class="{ 'habit-calendar__indicator--completed': day.completed }"></div>
            </div>
        </div>
        <div class="habit-calendar__legend">
            <div class="habit-calendar__legend-item">
                <span class="habit-calendar__legend-dot habit-calendar__legend-dot--completed"></span>
                <span class="habit-calendar__legend-text">Complété</span>
            </div>
            <div class="habit-calendar__legend-item">
                <span class="habit-calendar__legend-dot"></span>
                <span class="habit-calendar__legend-text">Non complété</span>
            </div>
        </div>
    </div>
</template>

<style lang="scss">
.habit-calendar {
    margin: 20px 0;
    padding: 15px;
    border-radius: 8px;
    background-color: white;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

    &__header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 1rem;
    }

    &__title {
        font-family: $font-family-primary;
        font-size: 1.2rem;
        font-weight: $font-weight-semibold;
        color: $textPrimary;
    }

    &__nav {
        padding: 0.5rem 1rem;
        background-color: transparent;
        border: 1px solid $borderColor;
        border-radius: 4px;
        cursor: pointer;
        color: $textPrimary;

        &:hover {
            background-color: $backgroundColor;
        }
    }

    &__grid {
        display: grid;
        grid-template-columns: repeat(7, 1fr);
        gap: 5px;
        margin-top: 10px;
    }

    &__day {
        padding: 10px;
        text-align: center;
        position: relative;
    }

    &__date {
        font-size: 0.9rem;
        font-family: $font-family-primary;
        color: $textPrimary;
    }

    &__indicator {
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background-color: #ff4444;
        position: absolute;
        bottom: 2px;
        left: 50%;
        transform: translateX(-50%);

        &--completed {
            background-color: #4CAF50;
        }
    }

    &__legend {
        margin-top: 1.5rem;
        display: flex;
        justify-content: center;
        gap: 2rem;
    }

    &__legend-item {
        display: flex;
        align-items: center;
        gap: 0.5rem;
    }

    &__legend-dot {
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background-color: #ff4444;

        &--completed {
            background-color: #4CAF50;
        }
    }

    &__legend-text {
        font-family: $font-family-primary;
        font-size: 0.9rem;
        color: $textSecondary;
    }
}
</style>