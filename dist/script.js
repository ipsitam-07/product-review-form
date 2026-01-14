document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('reviewForm');
    let submittedReviews = JSON.parse((localStorage.getItem('reviews')) || '""') || [];
    const starContainers = document.querySelectorAll('.star-rating');
    const tbody = document.querySelector('#reviewsTable tbody');
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
    //show error logic
    function showError(id, msg) {
        const errorMsg = document.getElementById(`error-${id}`);
        if (errorMsg) {
            errorMsg.innerText = msg;
            errorMsg.parentElement?.classList.add('error');
        }
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
    //tags selection logic
    const tagBtns = document.querySelectorAll('.tag-btn');
    const selectedTagsInput = document.getElementById('selectedTags');
    let seelectedTags = [];
    tagBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            btn.classList.toggle('selected');
            let tagText = btn.innerText;
            if (btn.classList.contains('selected')) {
                if (typeof tagText === 'object') {
                    seelectedTags.push(tagText);
                }
            }
            else {
                seelectedTags = seelectedTags.filter(t => t !== tagText);
            }
            selectedTagsInput.value = JSON.stringify(seelectedTags);
        });
    });
    //form validation before submission
    form?.addEventListener('submit', (e) => {
        e.preventDefault();
        let isValid = true;
        document.querySelectorAll('error-msg').forEach(ele => ele.innerText = '');
        document.querySelectorAll('.form-group, rating-group, .checkbox-group').forEach(ele => ele.classList.remove('error'));
        //title validation
        const title = document.getElementById('reviewTitle');
        if (title.value.length < 10 || title.value.length > 100) {
            showError('reviewTitle', "Review title is required and must be between 10-100 characters.");
            isValid = false;
        }
        //details validation
        const details = document.getElementById('reviewDetails');
        if (details.value.length < 30 || details.value.length > 1000) {
            showError('reviewDetails', "Review details is required and must be between 30-1000 characters.");
            isValid = false;
        }
        //purchase date validation
        const datePurchase = document.getElementById('purchaseDate');
        if (!datePurchase.value) {
            showError('purchaseDate', "Purchase Date is required.");
            isValid = false;
        }
        //star rating validation
        const requiredRating = ['overallRating', 'qualityRating', 'valueRating'];
        requiredRating.forEach(name => {
            const input = document.getElementById(name);
            if (!input.value) {
                showError(name, 'Please enter a rating.');
                isValid = false;
            }
        });
        //additional checkbox validation
        const rec = document.querySelector('input[name="recommend"]:checked');
        if (!rec) {
            showError('recommend', 'Please select an option');
            isValid = false;
        }
        const makePublic = document.querySelector('input[name="makePublic"]');
        if (!makePublic.checked) {
            showError('makePublic', 'Required');
            isValid = false;
        }
        const terms = document.querySelector('input[name="agreeTerms"]');
        if (!terms.checked) {
            showError('agreeTerms', 'Required');
            isValid = false;
        }
        //final submission
        if (isValid) {
            const formData = {
                id: Date.now(),
                date: datePurchase.value,
                title: title.value,
                details: details.value,
                ratings: {
                    overall: document.getElementById('overallRating').value,
                    quality: document.getElementById('qualityRating').value,
                    value: document.getElementById('valueRating').value,
                    delivery: document.getElementById('deliveryRating').value,
                    service: document.getElementById('serviceRating').value,
                },
                reviewType: document.querySelector('input[name="reviewType"]:checked')?.value,
                tags: JSON.parse(selectedTagsInput.value || '[]'),
                recommend: rec.value,
                buyAgain: document.querySelector('input[name="buyAgain"]')?.checked,
                makePublic: makePublic.checked,
                agreeterms: terms.checked
            };
            submittedReviews.push(formData);
            localStorage.setItem('reviews', JSON.stringify(submittedReviews));
            alert("Review has been submitted successfully!");
            renderTable();
            resetData();
        }
        else {
            const error = document.querySelector('.error');
            if (error) {
                error.scrollIntoView();
            }
        }
    });
    //reset form function
    function resetData() {
        let resetForm;
        resetForm = document.getElementById('reviewForm');
        if (resetForm) {
            resetForm.reset();
        }
        document.getElementById('overallRating').value = '';
        document.getElementById('qualityRating').value = '';
        document.getElementById('valueRating').value = '';
        document.getElementById('deliveryRating').value = '';
        document.getElementById('serviceRating').value = '';
        document.getElementById('selectedTags').value = '[]';
        document.querySelectorAll('.star').forEach(star => {
            star.classList.remove('active');
        });
        document.querySelectorAll('.star-rating').forEach(star => {
            star.removeAttribute('data-selected');
        });
        document.querySelectorAll('.tag-btn').forEach(btn => {
            btn.classList.remove('selected');
        });
    }
    //render table 
    function renderTable() {
        if (tbody) {
            tbody.innerHTML = '';
        }
        submittedReviews.forEach(review => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${review.title}</td>
                <td>${review.details}</td>
                <td>${review.date}</td>
                <td>${review.ratings}</td>
                <td>${review.reviewType}</td>
                <td style="max-width=150px">${review.tags}</td>
                <td>${review.recommend}</td>
                <td>
                <button class="edit-action-btn">
                <i class="fa-solid fa-pen-to-square"></i>
                </button>
                <button class="delete-action-btn">
                <i class="fa-solid fa-trash"></i>
                </button>
                </td>
            `;
            tbody?.appendChild(row);
        });
    }
});
export {};
//# sourceMappingURL=script.js.map