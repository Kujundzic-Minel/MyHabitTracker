<template>
    <div class="contact">
        <h1 class="contact__title">Contact</h1>
        <div class="contact__content">
            <p class="contact__description">
                MyHabitTracker est une application qui vous aide à développer et maintenir de bonnes habitudes au
                quotidien.
                Que ce soit des habitudes globales partagées par la communauté ou vos objectifs personnels,
                notre plateforme vous accompagne dans votre développement personnel.
            </p>
            <div class="contact__info">
                <h2 class="contact__subtitle">Une question ? Une suggestion ?</h2>
                <a href="mailto:minel.kujundzic@edu.univ-fcomte.fr" class="contact__link">
                    minel.kujundzic@edu.univ-fcomte.fr
                </a>
            </div>
        </div>
    </div>
</template>

<style lang="scss">
.contact {
    padding: 2rem;
    max-width: 800px;
    margin: 0 auto;

    &__title {
        font-family: $font-family-primary;
        font-size: 2rem;
        font-weight: $font-weight-bold;
        color: $textPrimary;
        margin-bottom: 2rem;
    }

    &__content {
        background: $backgroundColor;
        border-radius: 12px;
        box-shadow: 0 4px 12px $shadowColor;
        padding: 2rem;
    }

    &__description {
        font-family: $font-family-primary;
        color: $textSecondary;
        line-height: 1.6;
        margin-bottom: 2rem;
    }

    &__info {
        text-align: center;
    }

    &__subtitle {
        font-family: $font-family-primary;
        font-size: 1.25rem;
        font-weight: $font-weight-semibold;
        color: $textPrimary;
        margin-bottom: 1rem;
    }

    &__link {
        display: inline-block;
        color: $primaryColor;
        text-decoration: none;
        font-family: $font-family-primary;
        font-weight: $font-weight-medium;
        transition: color 0.3s;

        &:hover {
            color: $primaryDark;
        }
    }

    @media (max-width: 768px) {
        padding: 1rem;

        &__title {
            font-size: 1.5rem;
        }

        &__content {
            padding: 1.5rem;
        }
    }
}
</style>
