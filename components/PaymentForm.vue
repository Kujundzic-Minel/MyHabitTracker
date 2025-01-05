<script setup lang="ts">
import { ref } from 'vue';

const paymentInfo = ref({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    name: ''
});

const processing = ref(false);

const handlePayment = async () => {
    processing.value = true;
    await new Promise(resolve => setTimeout(resolve, 2000));
    alert('Payment processed successfully!');
    processing.value = false;
};
</script>

<template>
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
                    <input class="payment__form-input" v-model="paymentInfo.expiryDate" type="text" placeholder="MM/YY"
                        maxlength="5" required>
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
</template>

<style scoped lang="scss">
.payment__form {
    background: $backgroundColor;
    padding: 2rem;
    border-radius: 16px;
    box-shadow: 0 4px 15px $shadowColor;

    &-title {
        color: $textPrimary;
        margin-bottom: 2rem;
        font-weight: $font-weight-semibold;
    }

    // ...existing form styles...
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
</style>
