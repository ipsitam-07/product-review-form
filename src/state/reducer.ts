import { validateReviewForm } from '../services/formValidation';
import { createReviewFromForm } from '../services/submitReview';
import { initialReviewFormState } from './appState';
import type { AppState } from '../types/state';
import type { Action } from './actions';

export function appReducer(state: AppState, action: Action): AppState {
  const newReview = createReviewFromForm(state.reviewForm.data);
  switch (action.type) {
    case 'UPDATE_FORM_FIELD' : {
      const { field, value } = action;
      const { [field]: _, ...remainingErrors } = state.reviewForm.ui.errors;
      return {
        ...state,
        reviewForm: {
          ...state.reviewForm,
          data: {
            ...state.reviewForm.data,
            [field]: value,
          },
          ui: {
            ...state.reviewForm.ui,
            errors: remainingErrors,
          },
        },
      };
    }

    case 'UPDATE_RATING': {
      const { ratingKey } = action;

      const { [ratingKey]: ratingErr, ...remainingRatingErrors } = state.reviewForm.ui.errors;
      return {
        ...state,
        reviewForm: {
          ...state.reviewForm,
          data: {
            ...state.reviewForm.data,
            rating: {
              ...state.reviewForm.data.rating,
              [ratingKey]: action.value,
            },
          },
          ui: {
            ...state.reviewForm.ui,
            errors: remainingRatingErrors,
          },
        },
      };
    }

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
