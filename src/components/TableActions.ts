import { state } from '../state/app.state';
import { saveToLocalStorage } from '../storage/app.storage';
import { renderApp } from './App';

export function actionsCell(reviewId: string): HTMLTableCellElement {
  const td = document.createElement('td');

  const container = document.createElement('div');
  container.className = 'table-actions';

  //Edit
  const editBtn = document.createElement('button');
  editBtn.className = 'edit-icon-btn';
  editBtn.innerHTML = '<i class="fa-solid fa-pen"></i>';

  editBtn.addEventListener('click', () => {
    const review = state.reviews.find((r) => r.id === reviewId);

    if (!review) {
      return;
    }

    state.reviewForm = {
      data: {
        date: review.date,
        title: review.title,
        details: review.details,
        rating: {
          overall: review.rating.overall ?? '',
          quality: review.rating.quality ?? '',
          value: review.rating.value ?? '',
          delivery: review.rating.delivery ?? '',
          service: review.rating.service ?? '',
        },
        reviewType: review.reviewType,
        tags: review.tags ?? [],
        recommend: review.recommend,
        buyAgain: review.buyAgain ?? false,
        makePublic: review.makePublic,
        agreeTerms: review.agreeTerms,
      },
      ui: {
        editId: review.id,
        errors: {},
      },
    };

    renderApp();
  });

  //Delete
  const deleteBtn = document.createElement('button');
  deleteBtn.className = 'dlt-icon-btn';
  deleteBtn.innerHTML = '<i class="fa-solid fa-trash"></i>';

  deleteBtn.addEventListener('click', () => {
    state.reviews = state.reviews.filter((r) => r.id !== reviewId);
    saveToLocalStorage();

    alert('Review Deleted!');
    renderApp();
  });

  container.appendChild(editBtn);
  container.appendChild(deleteBtn);

  td.appendChild(container);
  return td;
}
