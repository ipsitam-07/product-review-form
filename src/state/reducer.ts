import { validateReviewForm } from '../services/formValidation';
import { createReviewFromForm } from '../services/submitReview';
import { initialReviewFormState } from './appState';
import type { AppState } from '../types/state';
import type { Action } from './actions';

export function appReducer(state: AppState, action: Action): AppState {
  switch (action.type) {
    case 'UPDATE_FORM_FIELD': {
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

    case 'SUBMIT_REVIEW': {
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

      if (state.reviewForm.ui.editId) {
        const updatedReviews = state.reviews.map((review) =>
          review.id === state.reviewForm.ui.editId
            ? { ...review, ...state.reviewForm.data }
            : review,
        );

        return {
          ...state,
          reviews: updatedReviews,
          reviewForm: initialReviewFormState,
        };
      }

      const newReview = createReviewFromForm(state.reviewForm.data);
      return {
        ...state,
        reviews: [...state.reviews, newReview],
        reviewForm: initialReviewFormState,
      };
    }

    case 'STORE_REVIEW': {
      return {
        ...state,
        ...action.payload,
      };
    }

    case 'EDIT_REVIEW': {
      const reviewToEdit = state.reviews.find((review) => review.id === action.reviewId);

      if (!reviewToEdit) return state;

      return {
        ...state,
        reviewForm: {
          data: {
            date: reviewToEdit.date,
            title: reviewToEdit.title,
            details: reviewToEdit.details,
            rating: reviewToEdit.rating,
            reviewType: reviewToEdit.reviewType,
            tags: reviewToEdit.tags,
            recommend: reviewToEdit.recommend,
            buyAgain: reviewToEdit.buyAgain ?? false,
            makePublic: reviewToEdit.makePublic,
            agreeTerms: reviewToEdit.agreeTerms,
          },
          ui: {
            editId: reviewToEdit.id,
            errors: {},
          },
        },
      };
    }

    case 'DELETE_REVIEW': {
      const updatedReviews = state.reviews.filter((review) => review.id !== action.reviewId);

      const isDeletingEditedReview = state.reviewForm.ui.editId === action.reviewId;

      return {
        ...state,
        reviews: updatedReviews,
        reviewForm: isDeletingEditedReview ? initialReviewFormState : state.reviewForm,
      };
    }

    default:
      return state;
  }
}
