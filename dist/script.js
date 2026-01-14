document.addEventListener('DOMContentLoaded', () => {
    const starContainers = document.querySelectorAll('.star-rating');
    //Helper functions
    //Function to highlight stars
    function highlightStars(container, value) {
        const stars = container.querySelectorAll('.star');
        stars.forEach((element) => {
            const starValue = parseInt(element.getAttribute('data-value'));
            if (starValue <= value) {
                element.classList.add('active');
            }
            else {
                element.classList.remove('active');
            }
        });
    }
    //Clear error function
    function clearError(element) {
        element.classList.remove('error');
        const errorMsg = document.querySelector('.error-msg');
        if (errorMsg)
            errorMsg.innerHTML = '';
    }
    //star rating logic
    starContainers.forEach((container) => {
        const star = container.querySelectorAll('.star');
        const hiddenInput = container.parentElement.querySelector('input[type="hidden"]');
        star.forEach(star => {
            star.addEventListener('mouseover', () => {
                const value = parseInt(star.getAttribute('data-value'));
                highlightStars(container, value);
            });
            star.addEventListener('click', () => {
                const value = star.getAttribute('data-value');
                hiddenInput.value = value;
                container.setAttribute('data-selected', value);
                highlightStars(container, value);
                clearError(container.parentElement);
            });
        });
        container.addEventListener('mouseleave', () => {
            const selected = container.getAttribute('data-selected') || 0;
            highlightStars(container, selected);
        });
    });
});
export {};
//# sourceMappingURL=script.js.map