document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('reviewForm');
    let submittedReviews = JSON.parse((localStorage.getItem('reviews')) || '""') || [];
    const starContainers : any = document.querySelectorAll('.star-rating');
    //Helper functions
    //Function to highlight stars
    function highlightStars(container: any, value: any) : any {
        const stars: any = container.querySelectorAll('.star');
        stars.forEach((element: any) => {
            const starValue: number = parseInt(element.getAttribute('data-value'));
            if (starValue <= value){
                element.classList.add('active');
            } else {
                element.classList.remove('active');
            }
        });
    }

    //Clear error function
    function clearError(element: any) {
        element.classList.remove('error');
        const errorMsg = document.querySelector('.error-msg');
        if(errorMsg) errorMsg.innerHTML = '';
    }


    //show error logic
    function showError(id, msg){
        const errorMsg = document.getElementById(`error-${id}`) as HTMLElement;
        if(errorMsg){
            errorMsg.innerText = msg;
            errorMsg.parentElement?.classList.add('error');
        }
    }
    //star rating logic

    starContainers.forEach((container: any) => {
        const star = container.querySelectorAll('.star');

        const hiddenInput = container.parentElement.querySelector('input[type="hidden"]');

        star.forEach(star => {
            star.addEventListener('mouseover', () => {
                const value: number = parseInt(star.getAttribute('data-value'));
                highlightStars(container, value);
            });

            star.addEventListener('click', () =>{
                const value = star.getAttribute('data-value');
                hiddenInput.value = value;
                container.setAttribute('data-selected', value);
                highlightStars(container, value);

                clearError(container.parentElement);
            });
        });

        container.addEventListener('mouseleave', () => {
            const selected = container.getAttribute('data-selected') || 0;
            highlightStars(container,selected);
        });
    });

    //tags selection logic
    const tagBtns = document.querySelectorAll<HTMLElement>('.tag-btn');
    const selectedTagsInput = document.getElementById('selectedTags');
    let seelectedTags = [];

    tagBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            btn.classList.toggle('selected');
            let tagText : string | object = btn.innerText;

            if(btn.classList.contains('selected')){
                if(typeof tagText === 'object'){seelectedTags.push(tagText);}
                
            }
            else {
                seelectedTags = seelectedTags.filter(t => t !== tagText);
            }

            (selectedTagsInput as HTMLInputElement).value = JSON.stringify(seelectedTags);
        });
    });

    //form validation before submission
    form?.addEventListener('submit', (e) => {
        e.preventDefault();

        let isValid = true;

        document.querySelectorAll<HTMLElement>('error-msg').forEach(ele => ele.innerText = '');

        document.querySelectorAll('.form-group, rating-group, .checkbox-group').forEach(
        ele => ele.classList.remove('error')
        );

        //title validation
        const title = document.getElementById('reviewTitle');
        if((title as HTMLInputElement).value.length < 10 || (title as HTMLInputElement).value.length >100 ) {
            showError('reviewTitle', "Review title is required and must be between 10-100 characters.");
            isValid = false;
        }


        //details validation
        const details = document.getElementById('reviewDetails');
        if((details as HTMLInputElement).value.length < 30 || (details as HTMLInputElement).value.length >1000 ) {
            showError('reviewDetails', "Review details is required and must be between 30-1000 characters.");
            isValid = false;
        }

        //purchase date validation
        const datePurchase = document.getElementById('purchaseDate');
        if(!(datePurchase as HTMLInputElement).value) {
            showError('purchaseDate', "Purchase Date is required.");
            isValid = false;
        }

        //star rating validation
        const requiredRating = ['overallRating', 'qualityRating', 'valueRating'];
        requiredRating.forEach(name => {
            const input = document.getElementById(name);

            if(!(input as HTMLInputElement).value){

                showError(name, 'Please enter a rating.');
                isValid = false;
            }

        })

        //additional checkbox validation
        const rec = document.querySelector('input[name="recommend"]:checked');

        if(!rec){
            showError('recommend', 'Please select an option');
            isValid = false;
        }


        const makePublic = document.querySelector('input[name="makePublic"]');
        if(!(makePublic as HTMLInputElement).checked){
            showError('makePublic', 'Required');
            isValid = false;
        }


        const terms = document.querySelector('input[name="agreeTerms"]');
        if(!(terms as HTMLInputElement).checked){
            showError('agreeTerms', 'Required');
            isValid = false;
        }

        //final submission
        if(isValid){
            const formData = {
                id: Date.now(),
                date: (datePurchase as HTMLInputElement).value,
                title: (title as HTMLInputElement).value,
                details: (details as HTMLInputElement).value,
                ratings: {

                    overall: (document.getElementById('overallRating') as HTMLInputElement).value,
                    quality: (document.getElementById('qualityRating') as HTMLInputElement).value,
                    value: (document.getElementById('valueRating') as HTMLInputElement).value,
                    delivery: (document.getElementById('deliveryRating') as HTMLInputElement).value,
                    service: (document.getElementById('serviceRating') as HTMLInputElement).value,
                },
                reviewType: document.querySelector<HTMLInputElement>('input[name="reviewType"]:checked')?.value,
                tags: JSON.parse((selectedTagsInput as HTMLInputElement).value || '[]'),
                recommend: (rec as HTMLInputElement).value,
                buyAgain: document.querySelector<HTMLInputElement>('input[name="buyAgain"]')?.checked,
                makePublic: (makePublic as HTMLInputElement).checked,
                agreeterms: (terms as HTMLInputElement).checked
                
            };
            submittedReviews.push(formData);
            localStorage.setItem('reviews', JSON.stringify(submittedReviews));
            alert("Review has been submitted successfully!");
            resetData()
        } else {
            const error = document.querySelector('.error');
            if(error) {
                error.scrollIntoView();
            }
        }
    })


    //reset form function
    function resetData(){
        let resetForm:HTMLFormElement;
        resetForm= <HTMLFormElement>document.getElementById('reviewForm');
        if(resetForm){
            resetForm.reset();
        }

        (document.getElementById('overallRating') as HTMLInputElement).value = '';
        (document.getElementById('qualityRating') as HTMLInputElement).value = '';
        (document.getElementById('valueRating') as HTMLInputElement).value = '';
        (document.getElementById('deliveryRating') as HTMLInputElement).value = '';
        (document.getElementById('serviceRating') as HTMLInputElement).value = '';


        (document.getElementById('selectedTags') as HTMLInputElement).value = '[]';


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

});