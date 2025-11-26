export function initializeFAQ() {
    const buttons = document.querySelectorAll('[data-faq-button]');

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const content = button.parentElement.querySelector('[data-faq-content]');
            const icon = button.querySelector('i');

            if (!content) return;

            const isHidden = content.classList.contains('hidden');

            content.classList.toggle('hidden');

            icon?.setAttribute('data-feather', isHidden ? 'chevron-up' : 'chevron-down');

            if (window.feather) {
                window.feather.replace();
            }
        });
    });
}
