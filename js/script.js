document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('reviewForm');
    let submittedReviews = JSON.parse(localStorage.getItem('reviews')) || [];

    const starContainers = document.querySelectorAll('.star-rating');
    renderTable();
    //Render table function
    function renderTable(){
        const tbody = document.querySelector('#reviewsTable tbody');

        tbody.innerHTML = '';

        submittedReviews.forEach(review => {
            const row = document.createElement('tr');

            row.innerHTML = `
                <td>${review.title}</td>
                <td>${review.details}</td>
                <td>${review.date}</td>
                <td>${JSON.stringify(review.ratings)}</td>
                <td>${review.reviewType}</td>
                <td>${JSON.stringify(review.tags)}</td>
                <td>${review.recommend}</td>
                <td>Edit
                    Delete
                </td>
            `;
            tbody.appendChild(row);
        })
    }
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

    //Form Validation with window alert
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        let isValid = true;

        document.querySelectorAll('.error-msg').forEach(ele => ele.innerText = '');
        document.querySelectorAll('.form-group, .rating-group, .checkbox-group').forEach(ele => ele.classList.remove('error'));
        //Review details and purchase date validation
        const title = document.getElementById('reviewTitle');
        if(title.value.length < 10 || title.value.length > 100){
            showError('reviewTitle', 'Review title is required and must between 10-100 characters.');
            isValid = false;
        }

        const details = document.getElementById('reviewDetails');
        if(details.value.length < 30 || details.value.length > 1000){
            showError('reviewDetails', 'Review Description is required and must be between 30-1000 characters.');
            isValid = false;
        }

        const purchaseDate = document.getElementById('purchaseDate');
        if(!purchaseDate.value){
            showError('purchaseDate', 'Please select a purchase date.');
            isValid = false;
        }

        //Rating validation
        const requiredRatings = ['overallRating', 'qualityRating', 'valueRating'];
        requiredRatings.forEach(name => {
            const input = document.getElementById(name);
            if(!input.value){
                showError(name, 'Please enter a rating.');
                isValid = false;
            }
        });

        //Additional checkboxes validation
        const recommend = document.querySelector('input[name="recommend"]:checked');
        if(!recommend){
            showError('recommend', 'Please select an option');
            isValid = false;
        }

        const makePublic = document.querySelector('input[name="makePublic"]');
        if(!makePublic.checked){
            showError('makePublic', 'Required');
            isValid = false;
        }

        const termsCondtions = document.querySelector('input[name="agreeTerms"]');
        if(!termsCondtions.checked){
            showError('agreeTerms', 'Required');
            isValid = false;
        }

        if(isValid){
            const formData = {
                id: Date.now(),
                date: purchaseDate.value,
                title: title.value,
                details: details.value,
                ratings: {
                    overall: document.getElementById('overallRating').value,
                    quality: document.getElementById('qualityRating').value,
                    value: document.getElementById('valueRating').value,
                    delivery: document.getElementById('deliveryRating').value,
                    service: document.getElementById('serviceRating').value,
                },
                reviewType: document.querySelector('input[name="reviewType"]:checked').value,
                tags: JSON.parse(selectedTagsInput.value ||'[]'),
                recommend: recommend.value,
                buyAgain: document.querySelector('input[name="buyAgain"]').checked,
                makePublic: makePublic.checked,
                agreeTerms: termsCondtions.checked
            };
            submittedReviews.push(formData);
            localStorage.setItem('reviews', JSON.stringify(submittedReviews));
            console.log("data saved to local storage.");
            console.log(submittedReviews);
            renderTable();
            alert("Thank You! Your review has been submitted successfully.");
        } else {
            const firstError = document.querySelector('.error');
            if (firstError){
                firstError.scrollIntoView();
            }
        }

    });
    
    const textInputs = ['reviewTitle', 'reviewDetails'];
    textInputs.forEach(id => {
    const input = document.getElementById(id);
    input.addEventListener('input', () => {
        clearError(input.parentElement);
    });
    });

    const dateInput = document.getElementById('purchaseDate');
    dateInput.addEventListener('change', () => {
    if(dateInput.value) clearError(dateInput.parentElement);
    });

    const checkboxes = ['makePublic', 'agreeTerms'];
    checkboxes.forEach(name => {
    const input = document.querySelector(`input[name="${name}"]`);
    input.addEventListener('change', () => {
        if(input.checked) clearError(input.closest('.checkbox-group'));
    });
    });

    const radioNames = ['recommend']; 
    radioNames.forEach(name => {
    const radios = document.querySelectorAll(`input[name="${name}"]`);
    radios.forEach(radio => {
        radio.addEventListener('change', () => {
            const container = radio.closest('.form-group');
            clearError(container);
        });
    });
    });

});
