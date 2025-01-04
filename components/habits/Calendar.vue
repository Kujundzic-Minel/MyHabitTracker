<script setup lang="ts">
const props = defineProps<{
    habitId: number
}>();

const currentMonth = ref(new Date());
const daysInMonth = computed(() => {
    const date = new Date(currentMonth.value);
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
});

const days = computed(() => {
    const days = [];
    for (let i = 1; i <= daysInMonth.value; i++) {
        const date = new Date(currentMonth.value.getFullYear(), currentMonth.value.getMonth(), i);
        const dateString = date.toISOString().split('T')[0];
        const isCompleted = localStorage.getItem(`habit_${props.habitId}_${dateString}`) === 'completed';
        days.push({ day: i, completed: isCompleted });
    }
    return days;
});
</script>

<template>
    <div class="calendar">
        <h3 class="calendar__title">{{ currentMonth.toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' }) }}
        </h3>
        <div class="calendar__grid">
            <div v-for="day in days" :key="day.day" class="calendar__day">
                <span class="calendar__date">{{ day.day }}</span>
                <div class="calendar__status" :class="{ 'calendar__status--completed': day.completed }"></div>
            </div>
        </div>
        <div class="calendar__legend">
            <div class="calendar__legend-item">
                <span class="calendar__legend-dot calendar__legend-dot--completed"></span>
                <span class="calendar__legend-text">Habitude complétée</span>
            </div>
            <div class="calendar__legend-item">
                <span class="calendar__legend-dot"></span>
                <span class="calendar__legend-text">Habitude non complétée</span>
            </div>
        </div>
    </div>
</template>

<style lang="scss">
.calendar {
    margin: 20px 0;
    padding: 15px;
    border-radius: 8px;
    background-color: white;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

    &__title {
        font-family: $font-family-primary;
        font-size: 1.2rem;
        margin-bottom: 1rem;
        font-weight: $font-weight-semibold;
        color: $textPrimary;
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

    &__status {
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