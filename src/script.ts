document.addEventListener('DOMContentLoaded', () => {
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



});