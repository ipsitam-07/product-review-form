document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('reviewForm');

    const starContainers = document.querySelectorAll('.star-rating');

    //Helper functions
    function clearError(element){
        element.classList.remove('error');
        const errorMsg = document.querySelector('.error-msg');
        if(errorMsg) errorMsg.innerHTML = '';
    }

    function showError(id, message) {
        const errorMsg = document.getElementById(`error-${id}`);
        if (errorMsg) {
            errorMsg.innerText = message;
            errorMsg.parentElement.classList.add('error');
        }
    }

    function highlightStars(container, value) {
        const stars = container.querySelectorAll('.star');
        stars.forEach(s => {
            const starValue = parseInt(s.getAttribute('data-value'));
            if (starValue <= value) {
                s.classList.add('active');
            } else {
                s.classList.remove('active');
            }
        });
    }
    
    //Star rating logic
    starContainers.forEach(container => {
        const stars = container.querySelectorAll('.star');
        const hiddenInput = container.parentElement.querySelector('input[type="hidden"]');

        stars.forEach(star => {
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

    //Tags Logic
    const tagButtons = document.querySelectorAll('.tag-btn');
    const selectedTagsInput = document.getElementById('selectedTags');
    let selectedTags = [];

    tagButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            btn.classList.toggle('selected');
            const tagText = btn.innerText;

            if (btn.classList.contains('selected')) {
                selectedTags.push(tagText);
            } else {
                selectedTags = selectedTags.filter(t => t !== tagText);
            }
            selectedTagsInput.value = JSON.stringify(selectedTags);
        });
    });



});
