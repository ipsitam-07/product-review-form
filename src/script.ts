document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('reviewForm');
    let submittedReviews : Review[] = JSON.parse((localStorage.getItem('reviews')) || '""') || [];
    const starContainers : any = document.querySelectorAll('.star-rating');
    const tbody = document.querySelector('#reviewsTable tbody');
    let selectedRow: HTMLTableRowElement | null = null;
    let editing = false;

    renderTable()

    //date validation
    const dateInput = document.getElementById("purchaseDate") as HTMLInputElement;

    const today = new Date().toISOString().split("T")[0];

    dateInput.max = today;



    //types
    type Ratings = {
    overall: string;
    quality: string;
    value: string;
    delivery: string;
    service: string;
    };


    type Review = {
    id: number;
    date: string;
    title: string;
    details: string;
    ratings: Ratings;
    reviewType: string;
    tags: string[];
    recommend: string;
    buyAgain: boolean;
    makePublic: boolean;
    agreeTerms: boolean;
    };

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
    function showError(id: string, msg: string){
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

        star.forEach((star: HTMLElement) => {
            star.addEventListener('mouseover', () => {
                const value: number = parseInt(star.getAttribute('data-value') || '0');
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

    (selectedTagsInput as HTMLInputElement).value = '[]';

    let selectedTags: string[] = [];

    tagBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            btn.classList.toggle('selected');
            let tagText : string  = btn.innerText;

            if(btn.classList.contains('selected')){
                selectedTags.push(tagText);
                
            }
            else {
                selectedTags = selectedTags.filter(t => t !== tagText);
            }

            (selectedTagsInput as HTMLInputElement).value = JSON.stringify(selectedTags);
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
        } else {
            let dateSelect = new Date((datePurchase as HTMLInputElement).value);
            let today = new Date();
            today.setHours(0,0,0,0);

            if(dateSelect > today){
                showError('purchaseDate', 'A future date cannot be selected');
                isValid = false;
            }

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
            const formData: Review = {
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
                reviewType: document.querySelector<HTMLInputElement>('input[name="reviewType"]:checked')?.value || '',
                tags: JSON.parse((selectedTagsInput as HTMLInputElement).value || '[]'),
                recommend: (rec as HTMLInputElement).value,
                buyAgain: document.querySelector<HTMLInputElement>('input[name="buyAgain"]')?.checked || false,
                makePublic: (makePublic as HTMLInputElement)?.checked || false,
                agreeTerms: (terms as HTMLInputElement)?.checked || false
                
            };
            //if editing check
            if(editing === false){
                submittedReviews.push(formData);
                alert("Review has been submitted successfully!");

            }

            else {

                let rowIndex = (selectedRow as HTMLTableRowElement).rowIndex - 1;

                submittedReviews[rowIndex] = formData;
                if(selectedRow){
                    selectedRow.cells[0].innerText = formData.title;

                    selectedRow.cells[1].innerText = formData.details;

                    selectedRow.cells[2].innerText = formData.date;
                    
   
                }
                editing = false;
                selectedRow = null;
                alert("Your review has been updated successfully!");
            }
            localStorage.setItem('reviews', JSON.stringify(submittedReviews));
            renderTable()
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
        resetForm= document.getElementById('reviewForm') as HTMLFormElement;
        if(resetForm){
            resetForm.reset();
        }

        (document.getElementById('overallRating') as HTMLInputElement).value = '';
        (document.getElementById('qualityRating') as HTMLInputElement).value = '';
        (document.getElementById('valueRating') as HTMLInputElement).value = '';
        (document.getElementById('deliveryRating') as HTMLInputElement).value = '';
        (document.getElementById('serviceRating') as HTMLInputElement).value = '';

        selectedTags = [];

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


    //render table 

    function renderTable(){
        if(tbody){
            tbody.innerHTML = '';
        }

        submittedReviews.forEach((review : Review) => {
            const row = document.createElement('tr');

            //ratings parsing
            const ratings = (obj : Ratings) => {
                const labels = {

                    overall: "Overall",
                    quality: "Quality",
                    value: "Value",
                    delivery: "Delivery",
                    service: "Service"

                };

                let labelStyle = '<div style="display:flex; flex-direction:column; gap:4px;">';


                for(const[key, value] of Object.entries(obj)){

                    if(value){
                        const label = labels[key as keyof Ratings] || key;

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

            //tags parsing
            const tags = (tagsArray : string[]) => {      
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

            tbody?.appendChild(row);


        });

        
    }


    //edit & delete via icon tag
    tbody?.addEventListener("click", function (e) {

        let btn = e.target as HTMLElement;
    
        if (btn.tagName === "I") {

            btn = btn.parentElement as HTMLElement;
        }
        
        //editing
        if (btn.classList.contains("edit-action-btn")) {
            const td = btn.parentElement;
            const tr = td?.parentElement;
    
            if (!tr) return;
    
            selectedRow = tr as HTMLTableRowElement;

            editing = true;
    
            const tds = selectedRow.getElementsByTagName("td");
            
            //review section editing
            (document.getElementById("reviewTitle") as HTMLInputElement).value = tds[0].innerText;
            (document.getElementById("reviewDetails") as HTMLInputElement).value = tds[1].innerText;
            (document.getElementById("purchaseDate") as HTMLInputElement).value = tds[2].innerText;


            //star editing
            let allStars = document.querySelectorAll<HTMLElement>(".star");
            if(allStars) {
                for(let i =0; i<allStars.length; i++){
                    allStars[i].classList.remove("active");
            }
            }

            let ratingStar = selectedRow?.cells[3];
            let ratingTxt = ratingStar.innerText.split("\n");

            for (let i = 0; i< ratingTxt.length; i++){
                if(ratingTxt[i].indexOf("Overall") !== -1){
                    let num = ratingTxt[i].split(":")[1].trim().charAt(0);
                    (document.getElementById("overallRating")as HTMLInputElement).value = num;
                    highlightStars(
                        document.querySelector('[data-name="overallRating"]'),
                        num
                    );
                }


                if(ratingTxt[i].indexOf("Quality") !== -1){
                    let num = ratingTxt[i].split(":")[1].trim().charAt(0);
                    (document.getElementById("qualityRating") as HTMLInputElement).value = num;
                    highlightStars(
                        document.querySelector('[data-name="qualityRating"]'),
                        num
                    ) ;     
                }


                if(ratingTxt[i].indexOf("Value") !== -1){
                    let num = ratingTxt[i].split(":")[1].trim().charAt(0);
                    (document.getElementById("valueRating") as HTMLInputElement).value = num;
                    highlightStars(
                        document.querySelector('[data-name="valueRating"]'),
                        num
                    ) ;     
                }


                if(ratingTxt[i].indexOf("Delivery") !== -1){
                    let num = ratingTxt[i].split(":")[1].trim().charAt(0);
                    (document.getElementById("deliveryRating") as HTMLInputElement).value = num;
                    highlightStars(
                        document.querySelector('[data-name="deliveryRating"]'),
                        num
                    ) ;     
                }


                if(ratingTxt[i].indexOf("Service") !== -1){
                    let num = ratingTxt[i].split(":")[1].trim().charAt(0);
                    (document.getElementById("serviceRating") as HTMLInputElement).value = num;
                    highlightStars(
                        document.querySelector('[data-name="serviceRating"]'),
                        num
                    ) ;     
                }

            }
            //tag btns editing
            let tagBtns = document.getElementsByClassName("tag-btn");

            for(let i=0;i<tagBtns.length;i++){
                tagBtns[i].classList.remove("selected");
            }

            let tag = selectedRow?.cells[5];

            let tagText = tag.innerText.split("\n");

            let selectedTags : string[] = [];

            for(let i=0;i<tagBtns.length;i++){
                for(let j=0;j<tagText.length;j++){
                    if((tagBtns[i] as HTMLInputElement).innerText === tagText[j]){
                        tagBtns[i].classList.add("selected");
                        selectedTags.push(tagText[j]);
                    }
                }
            }

            (document.getElementById("selectedTags") as HTMLInputElement).value = JSON.stringify(selectedTags);


            //recommend products
            let recommend = document.getElementsByName("recommend");

            for(let i=0;i<recommend.length; i++){
                if((recommend[i] as HTMLInputElement).value === tds[6].innerText){
                    (recommend[i] as HTMLInputElement).checked = true;
                }
            }            
    
            (document.querySelector(".submit-btn") as HTMLButtonElement).innerText = "Save Review";
            document.querySelector(".container")?.scrollIntoView();
        }


        //delete fiunctionality
        if(btn.className==="delete-action-btn"){

            let deleteRow = btn.parentElement?.parentElement;

            let index = (deleteRow as HTMLTableRowElement).rowIndex;

            let confirm = window.confirm("Are you sure you want to delete the record?");

            if(confirm){
                submittedReviews?.splice(index, 1);

                localStorage.setItem("reviews", JSON.stringify(submittedReviews));

                deleteRow?.remove();
                alert("Review Deleted!");
            } else {
                alert("You cancelled the delete operation.")
            }

            //deleting while editing handle

            if(selectedRow === deleteRow){
                resetData();
                editing = false;

                (document.querySelector(".submit-btn") as HTMLInputElement).innerText = "Submit Review";

                selectedRow = null;
            }

            
        }
    });
 



});