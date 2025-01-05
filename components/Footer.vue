<script setup lang="ts">
const navigationLinks = [
    { label: 'Home', url: '/' },
    { label: 'Contact', url: '/contact' }
];

const currentYear = new Date().getFullYear();
</script>

<template>
    <footer class="footer">
        <div class="footer__container">
            <div class="footer__content">
                <div class="footer__brand">
                    <h3 class="footer__brand-title">HabitTracker</h3>
                    <p class="footer__brand-description">
                        Track your habits, achieve your goals, and become your best self.
                    </p>
                </div>

                <nav class="footer__nav">
                    <h4 class="footer__nav-title">Quick Links</h4>
                    <ul class="footer__nav-list">
                        <li v-for="link in navigationLinks" :key="link.label" class="footer__nav-item">
                            <a :href="link.url" class="footer__nav-link">{{ link.label }}</a>
                        </li>
                    </ul>
                </nav>

                <div class="footer__social">
                    <h4 class="footer__social-title">Follow Us</h4>
                    <div class="footer__social-links">
                        <a href="#" class="footer__social-link">Twitter</a>
                        <a href="#" class="footer__social-link">LinkedIn</a>
                        <a href="#" class="footer__social-link">Instagram</a>
                    </div>
                </div>
            </div>

            <div class="footer__bottom">
                <p class="footer__copyright">
                    © {{ currentYear }} HabitTracker. All rights reserved.
                </p>
            </div>
        </div>
    </footer>
</template>

<style scoped lang="scss">
.footer {
    background-color: $backgroundColor;
    border-top: 1px solid $borderColor;
    padding: 4rem 0 2rem;
    font-family: $font-family-primary;

    &__container {
        max-width: 1200px;
        margin: 0 auto;
        padding: 0 2rem;
    }

    &__content {
        display: grid;
        grid-template-columns: 2fr 1fr 1fr;
        gap: 4rem;
        margin-bottom: 3rem;

        @media (max-width: 768px) {
            grid-template-columns: 1fr;
            gap: 2rem;
        }
    }

    &__brand {
        &-title {
            font-size: 1.5rem;
            color: $textPrimary;
            margin-bottom: 1rem;
            font-weight: $font-weight-semibold;
        }

        &-description {
            color: $textSecondary;
            line-height: 1.6;
        }
    }

    &__nav {
        &-title {
            font-size: 1.1rem;
            color: $textPrimary;
            margin-bottom: 1.5rem;
            font-weight: $font-weight-semibold;
        }

        &-list {
            list-style: none;
            padding: 0;
            margin: 0;
        }

        &-item {
            margin-bottom: 0.8rem;
        }

        &-link {
            color: $textSecondary;
            text-decoration: none;
            transition: color 0.3s ease;

            &:hover {
                color: $primaryColor;
            }
        }
    }

    &__social {
        &-title {
            font-size: 1.1rem;
            color: $textPrimary;
            margin-bottom: 1.5rem;
            font-weight: $font-weight-semibold;
        }

        &-links {
            display: flex;
            flex-direction: column;
            gap: 0.8rem;
        }

        &-link {
            color: $textSecondary;
            text-decoration: none;
            transition: color 0.3s ease;

            &:hover {
                color: $primaryColor;
            }
        }
    }

    &__bottom {
        padding-top: 2rem;
        border-top: 1px solid $borderColor;
        text-align: center;
    }

    &__copyright {
        color: $textSecondary;
        font-size: 0.9rem;
    }
}
</style>
