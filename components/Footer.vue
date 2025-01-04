<template>
    <footer class="footer">
        <div class="footer__container">
            <div class="footer__main">
                <div class="footer__brand">
                    <p class="footer__description">
                        Suivez vos habitudes quotidiennes et atteignez vos objectifs avec MyHabitTracker.
                    </p>
                </div>

                <div class="footer__nav">
                    <h3 class="footer__title">Navigation</h3>
                    <ul class="footer__nav-list">
                        <li><a href="/" class="footer__nav-link">Accueil</a></li>
                        <li><a href="/app/dashboard" class="footer__nav-link">Mes Habitudes</a></li>
                    </ul>
                </div>

                <div class="footer__contact">
                    <h3 class="footer__title">Contact</h3>
                    <div class="footer__contact-info">
                        <p><strong>Email:</strong> contact@myhabittracker.com</p>
                        <p><strong>Téléphone:</strong> +33 6 23 45 67 89</p>
                        <p><strong>Adresse:</strong> 123 rue des Habitudes, Paris</p>
                    </div>
                </div>

                <div class="footer__social-section">
                    <h3 class="footer__title">Suivez-nous</h3>
                    <div class="footer__social">
                        <a href="https://twitter.com" class="footer__social-link" target="_blank"
                            rel="noopener noreferrer">Twitter</a>
                        <a href="https://facebook.com" class="footer__social-link" target="_blank"
                            rel="noopener noreferrer">Facebook</a>
                        <a href="https://instagram.com" class="footer__social-link" target="_blank"
                            rel="noopener noreferrer">Instagram</a>
                    </div>
                </div>
            </div>

            <div class="footer__bottom">
                <p class="footer__copyright">© 2024 MyHabitTracker. Tous droits réservés.</p>
            </div>
        </div>
    </footer>
</template>

<style lang="scss" scoped>
.footer {
    font-family: 'Poppins', sans-serif;
    background: #fff;
    padding: 2rem 0;
    border-top: 1px solid #eee;

    &__container {
        max-width: 1200px;
        margin: 0 auto;
        padding: 0 1rem;
    }

    &__main {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 2rem;
        padding-bottom: 2rem;
        border-bottom: 1px solid #eee;

        @media (max-width: 968px) {
            grid-template-columns: repeat(2, 1fr);
        }

        @media (max-width: 568px) {
            grid-template-columns: 1fr;
        }
    }

    &__brand {
        .footer__logo {
            height: 40px;
            width: auto;
            margin-bottom: 1rem;
        }
    }

    &__description {
        color: #666;
        line-height: 1.6;
        margin-top: 1rem;
    }

    &__title {
        font-size: 1.2rem;
        color: #333;
        margin-bottom: 1rem;
    }

    &__nav-list {
        list-style: none;
        padding: 0;
        margin: 0;
    }

    &__nav-link {
        color: #666;
        text-decoration: none;
        display: block;
        padding: 0.5rem 0;
        transition: color 0.3s ease;

        &:hover {
            color: $primaryColor;
        }
    }

    &__contact-info {
        p {
            margin: 0.5rem 0;
            color: #666;
        }
    }

    &__bottom {
        padding-top: 2rem;
        text-align: center;
    }

    &__copyright {
        margin: 0;
        color: #666;
    }

    &__social {
        display: flex;
        gap: 1rem;

        &-link {
            color: #333;
            text-decoration: none;
            transition: color 0.3s ease;

            &:hover {
                color: $primaryColor;
            }
        }
    }
}
</style>
