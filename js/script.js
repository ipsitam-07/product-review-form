document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('reviewForm');
    let submittedReviews = JSON.parse(localStorage.getItem('reviews')) || [];
    const starContainers = document.querySelectorAll('.star-rating');
    let selectedRow = null;
    let editing = false;
    const tbody = document.querySelector('#reviewsTable tbody');
    renderTable();

    //Render table function
    function renderTable(){
        
        tbody.innerHTML = '';

        const ratings = (obj) => {

        const labels = {
            overall: "Overall",
            quality: "Quality",
            value: "Value",
            delivery: "Delivery",
            service: "Service"
        };
 
        let labelStyle = '<div style="display:flex; flex-direction:column; gap:4px;">';
        
        for (const [key, value] of Object.entries(obj)) {
            if (value) {
                const label = labels[key] || key; 
                labelStyle += `
                    <div style="font-size: 0.85rem;">
                        ${label}: ${value}/5
                    </div>
                `;
            }
        }
        labelStyle += '</div>';
        return labelStyle;
    }

    //edit
    tbody.addEventListener("click", function(e){

        let clickedBtn = e.target;

        if(clickedBtn.tagName === "I"){
            clickedBtn = clickedBtn.parentElement;
        }
        //editing
        if(clickedBtn.className === "edit-action-btn"){

            selectedRow = clickedBtn.parentElement.parentElement;
            editing = true;

            let tds = selectedRow.getElementsByTagName("td");
            //first review section editing

            document.getElementById("reviewTitle").value = tds[0].innerText;
            document.getElementById("reviewDetails").value = tds[1].innerText;
            document.getElementById("purchaseDate").value = tds[2].innerText;

            //star editing
            let allStars = document.querySelectorAll(".star");

            for(let i=0;i<allStars.length;i++){

            allStars[i].classList.remove("active");
            }

        let ratingStar = selectedRow.cells[3];
        let ratingText = ratingStar.innerText.split("\n");

        for (let i =0; i<ratingText.length; i++){

            if(ratingText[i].indexOf("Overall") !== -1){
                let num = ratingText[i].split(":")[1].trim().charAt(0);
                document.getElementById("overallRating").value = num;
                highlightStars(
                    document.querySelector('[data-name="overallRating"]'),
                    num
                );
    
            }

            if(ratingText[i].indexOf("Quality") !== -1){
                let num = ratingText[i].split(":")[1].trim().charAt(0);
                document.getElementById("qualityRating").value = num;
                highlightStars(
                    document.querySelector('[data-name="qualityRating"]'),
                    num
                ) ;     
            }
            

            if(ratingText[i].indexOf("Value") !== -1){
                let num = ratingText[i].split(":")[1].trim().charAt(0);
                document.getElementById("valueRating").value = num;
                highlightStars(
                    document.querySelector('[data-name="valueRating"]'),
                    num
                ) ;

            }


            if(ratingText[i].indexOf("Delivery") !== -1){
                let num = ratingText[i].split(":")[1].trim().charAt(0);
                document.getElementById("deliveryRating").value = num;
                highlightStars(
                    document.querySelector('[data-name="deliveryRating"]'),
                    num
                );      
            }

            if(ratingText[i].indexOf("Service") !== -1){
                let num = ratingText[i].split(":")[1].trim().charAt(0);
                document.getElementById("serviceRating").value = num;
                highlightStars(
                    document.querySelector('[data-name="serviceRating"]'),
                    num
                );      
            }
    }

        //Tags section edit
        let tagBtns = document.getElementsByClassName("tag-btn");

        for(let i=0;i<tagBtns.length;i++){
            tagBtns[i].classList.remove("selected");
        }

        let tag = selectedRow.cells[5];

        let tagText = tag.innerText.split("\n");

        let selectedTags = [];

        for(let i=0;i<tagBtns.length;i++){
            for(let j=0;j<tagText.length;j++){
                if(tagBtns[i].innerText === tagText[j]){
                    tagBtns[i].classList.add("selected");
                    selectedTags.push(tagText[j]);
                }
            }
        }

        document.getElementById("selectedTags").value = JSON.stringify(selectedTags);

            //recommend product? edit
        let recommend = document.getElementsByName("recommend");


            for(let i=0;i<recommend.length; i++){
                if(recommend[i].value === tds[6].innerText){
                    recommend[i].checked = true;
                }
            }


            document.querySelector(".submit-btn").innerText = "Save Review";
            document.querySelector(".container").scrollIntoView();
        }


        //delete

        if(clickedBtn.className==="delete-action-btn"){

            let deleteRow = clickedBtn.parentElement.parentElement;
            let index = deleteRow.rowIndex- 1;

            let confirm = window.confirm("Are you sure you want to delete the row?");


                if(confirm){
                    submittedReviews.splice(index, 1);
                    localStorage.setItem("reviews", JSON.stringify(submittedReviews));

                    deleteRow.remove();
                }


                //deleting while editing handling
                if(selectedRow === deleteRow){
                    resetData();
                    editing = false;

                    document.querySelector('.submit-btn').innerText= "Submit Review";

                    selectedRow = null;
                }

                alert("Review deleted!");
        }
    });



    const tags = (tagsArray) => {      
        return tagsArray.map(tag => 
            `<span style="
                display:block;
                max-width=100%; 
                background:#e0e7ff; 
                color:#4f46e5; 
                padding:2px 8px; 
                border-radius:12px; 
                font-size:0.75rem; 
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis; 
                margin:2px;">
                ${tag}
            </span>`
        ).join('');
    }
 
        submittedReviews.forEach(review => {
            const row = document.createElement('tr');

            row.innerHTML = `
                <td>${review.title}</td>
                <td>${review.details}</td>
                <td>${review.date}</td>
                <td>${ratings(review.ratings)}</td>
                <td>${review.reviewType}</td>
                <td style="max-width=150px">${tags(review.tags)}</td>
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
    
    function resetData(){
        document.getElementById('reviewForm').reset();

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
        })
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
            if (editing===false){
                submittedReviews.push(formData);
                alert("Thank You! Your review has been submitted successfully.");
            }
            else {

                let rowIndex = selectedRow.rowIndex - 1;


                submittedReviews[rowIndex] = formData;

                selectedRow.cells[0].innerText = formData.title;

                selectedRow.cells[1].innerText = formData.details;

                selectedRow.cells[2].innerText = formData.date;
                selectedRow.cells[3].innerText = formData.recommend;


                alert("Your review has been updated successfully!");


                editing = false;

                document.querySelector('.submit-btn').innerText= "Submit Review";

                selectedRow = null;
            }


            localStorage.setItem('reviews', JSON.stringify(submittedReviews));
            renderTable();
            
            resetData();
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
