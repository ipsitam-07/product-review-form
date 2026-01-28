import { validateReviewForm } from '../services/formValidation';
import { createReviewFromForm } from '../services/submitReview';
import { initialReviewFormState } from './appState';
import type { AppState } from '../types/state';
import type { Action } from './actions';

export function appReducer(state: AppState, action: Action): AppState {
  switch (action.type) {
    case 'UPDATE_FORM_FIELD':
      return {
        ...state,
        reviewForm: {
          ...state.reviewForm,
          data: {
            ...state.reviewForm.data,
            [action.field]: action.value,
          },
        },
      };

    case 'UPDATE_RATING':
      return {
        ...state,
        reviewForm: {
          ...state.reviewForm,
          data: {
            ...state.reviewForm.data,
            rating: {
              ...state.reviewForm.data.rating,
              [action.ratingKey]: action.value,
            },
          },
        },
      };

    case 'TOGGLE_TAG': {
      const currentTags = state.reviewForm.data.tags;

      const updatedTags = currentTags.includes(action.tag)
        ? currentTags.filter((t) => t !== action.tag)
        : [...currentTags, action.tag];

      return {
        ...state,
        reviewForm: {
          ...state.reviewForm,
          data: {
            ...state.reviewForm.data,
            tags: updatedTags,
          },
        },
      };
    }

    case 'SUBMIT_REVIEW':
      {
        const errors = validateReviewForm(state.reviewForm.data);
        if (Object.keys(errors).length > 0) {
          return {
            ...state,
            reviewForm: {
              ...state.reviewForm,
              ui: {
                ...state.reviewForm.ui,
                errors,
              },
            },
          };
        }
      }

      const newReview = createReviewFromForm(state.reviewForm.data);

      return {
        ...state,
        reviews: [...state.reviews, newReview],
        reviewForm: initialReviewFormState,
      };

    case 'STORE_REVIEW': {
      return {
        ...state,
        ...action.payload,
      };
    }
    default:
      return state;
  }
}
