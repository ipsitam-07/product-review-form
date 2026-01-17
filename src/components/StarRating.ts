import { renderApp } from './App';
import type { AppState, Ratings } from '../types/review';

export function StarRatings(state: AppState): HTMLElement {
  const section = document.createElement('section');

  section.className = 'form-section';

  const title = document.createElement('h3');
  title.textContent = 'Rate this Product';
  section.appendChild(title);

  section.appendChild(createRatingRow('Overall Rating', 'overall', state));
  section.appendChild(createRatingRow('Quality Rating', 'quality', state));
  section.appendChild(createRatingRow('Value for Money', 'value', state));
  section.appendChild(createRatingRow('Delivery Experience', 'delivery', state));
  section.appendChild(createRatingRow('Customer Service', 'service', state));

  return section;
}

function createRatingRow(
  labelText: string,
  ratingKey: keyof Ratings,
  state: AppState,
): HTMLDivElement {
  const row = document.createElement('div');
  row.className = 'rating-row';

  const label = document.createElement('label');
  label.textContent = labelText;
  row.appendChild(label);

  const starsContainer = document.createElement('div');
  starsContainer.className = 'star-rating';

  const selectedRating = state.reviewForm.data.rating[ratingKey];
  const activeRating = selectedRating ? Number(selectedRating) : 0;

  for (let starNumber = 1; starNumber <= 5; starNumber += 1) {
    const star = document.createElement('span');
    star.className = 'star';
    star.textContent = '★';

    if (starNumber <= activeRating) {
      star.classList.add('star-active');
    }

    star.addEventListener('mouseover', () => {
      const stars = starsContainer.querySelectorAll('.star');

      stars.forEach((s, index) => {
        if (index < starNumber) {
          s.classList.add('star-hover');
        } else {
          s.classList.remove('star-hover');
        }
      });
    });

    star.addEventListener('mouseleave', () => {
      const stars = starsContainer.querySelectorAll('.star');

      stars.forEach((s, index) => {
        s.classList.remove('star-hover');

        if (index < activeRating) {
          s.classList.add('star-active');
        } else {
          s.classList.remove('star-active');
        }
      });
    });

    star.addEventListener('click', () => {
      state.reviewForm.data.rating[ratingKey] = String(starNumber);
      renderApp();
    });

    starsContainer.appendChild(star);
  }

  row.appendChild(starsContainer);

  return row;
}
