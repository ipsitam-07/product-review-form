import type { Review } from '../types/review';
import type { ReviewFormData } from '../types/state';
import { generateId } from '../utils/generateID';

export function createReviewFromForm(data: ReviewFormData): Review {
  return {
    id: generateId(),
    date: data.date,
    title: data.title,
    details: data.details,
    rating: data.rating,
    reviewType: data.reviewType,
    tags: data.tags,
    recommend: data.recommend,
    buyAgain: data.buyAgain,
    makePublic: data.makePublic,
    agreeTerms: data.agreeTerms,
  };
}
