<script setup lang="ts">
import { ref } from 'vue';

const paymentInfo = ref({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    name: ''
});

const basicPlan = {
    title: 'Basic Plan',
    price: '$9.99/month',
    description: 'Perfect for getting started with habit tracking',
    features: [
        'Up to 5 habits tracking',
        'Basic statistics',
        'Daily reminders',
        'Progress charts',
        'Mobile access'
    ]
};

const processing = ref(false);

const handlePayment = async () => {
    processing.value = true;
    await new Promise(resolve => setTimeout(resolve, 2000));
    alert('Payment processed successfully!');
    processing.value = false;
};
</script>

<template>
    <div class="payment">
        <section class="payment__plan">
            <h1 class="payment__plan-title">{{ basicPlan.title }}</h1>
            <div class="payment__plan-price">{{ basicPlan.price }}</div>
            <p class="payment__plan-description">{{ basicPlan.description }}</p>
            <ul class="payment__plan-features">
                <li class="payment__plan-feature" v-for="feature in basicPlan.features" :key="feature">
                    {{ feature }}
                </li>
            </ul>
        </section>

        <section class="payment__form">
            <h2 class="payment__form-title">Payment Details</h2>
            <form class="payment__form-container" @submit.prevent="handlePayment">
                <div class="payment__form-group">
                    <label class="payment__form-label">Card Holder Name</label>
                    <input class="payment__form-input" v-model="paymentInfo.name" type="text" placeholder="John Doe"
                        required>
                </div>

                <div class="payment__form-group">
                    <label class="payment__form-label">Card Number</label>
                    <input class="payment__form-input" v-model="paymentInfo.cardNumber" type="text"
                        placeholder="1234 5678 9012 3456" maxlength="19" required>
                </div>

                <div class="payment__form-row">
                    <div class="payment__form-group">
                        <label class="payment__form-label">Expiry Date</label>
                        <input class="payment__form-input" v-model="paymentInfo.expiryDate" type="text"
                            placeholder="MM/YY" maxlength="5" required>
                    </div>

                    <div class="payment__form-group">
                        <label class="payment__form-label">CVV</label>
                        <input class="payment__form-input" v-model="paymentInfo.cvv" type="text" placeholder="123"
                            maxlength="3" required>
                    </div>
                </div>

                <button type="submit" class="payment__form-button"
                    :class="{ 'payment__form-button--processing': processing }" :disabled="processing">
                    {{ processing ? 'Processing...' : 'Pay Now' }}
                </button>
            </form>
        </section>
    </div>
</template>

<style scoped lang="scss">
@mixin card {
    background: $backgroundColor;
    padding: 2rem;
    border-radius: 16px;
    box-shadow: 0 4px 15px $shadowColor;
}

.payment {
    max-width: 1200px;
    margin: 0 auto;
    padding: 2rem;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 3rem;
    font-family: $font-family-primary;

    @media (max-width: 768px) {
        grid-template-columns: 1fr;
    }

    &__plan {
        @include card;

        &-title {
            font-size: 2rem;
            color: $textPrimary;
            margin-bottom: 1rem;
            font-weight: $font-weight-semibold;
        }

        &-price {
            font-size: 3rem;
            font-weight: $font-weight-bold;
            color: $primaryColor;
            margin: 1.5rem 0;
        }

        &-description {
            color: $textSecondary;
            margin-bottom: 2rem;
        }

        &-features {
            list-style: none;
            padding: 0;
        }

        &-feature {
            padding: 0.5rem 0;
            color: $textSecondary;

            &::before {
                content: "✓";
                color: $primaryColor;
                margin-right: 8px;
            }
        }
    }

    &__form {
        @include card;

        &-title {
            color: $textPrimary;
            margin-bottom: 2rem;
            font-weight: $font-weight-semibold;
        }

        &-group {
            margin-bottom: 1.5rem;
        }

        &-label {
            display: block;
            margin-bottom: 0.5rem;
            color: $textSecondary;
            font-weight: $font-weight-medium;
        }

        &-input {
            width: 100%;
            padding: 0.8rem;
            border: 1px solid $borderColor;
            border-radius: 8px;
            font-size: 1rem;
            font-family: $font-family-primary;
            transition: border-color 0.3s ease;

            &:focus {
                outline: none;
                border-color: $primaryColor;
            }
        }

        &-row {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 1rem;
        }

        &-button {
            width: 100%;
            padding: 1rem;
            background: $primaryColor;
            color: $backgroundColor;
            border: none;
            border-radius: 8px;
            font-size: 1.1rem;
            font-weight: $font-weight-semibold;
            cursor: pointer;
            transition: background 0.3s ease;

            &:hover {
                background: $primaryDark;
            }

            &--processing {
                background: $darkLight;
                cursor: not-allowed;
            }
        }
    }
}
</style>
