import type { ReviewFormData } from '../types/state';

export function validateReviewForm(data: ReviewFormData): Record<string, string> {
  return {
    ...validateDate(data),
    ...validateTitle(data),
    ...validateDetails(data),
    ...validateRatings(data),
    ...validateRecommend(data),
    ...validateAgreements(data),
  };
}

function validateDate(data: ReviewFormData): Record<string, string> {
  const errors: Record<string, string> = {};

  if (!data.date) {
    errors.date = 'Purchase date is required';
    return errors;
  }

  const selected = new Date(data.date);
  const today = new Date();

  selected.setHours(0, 0, 0, 0);
  today.setHours(0, 0, 0, 0);

  if (selected > today) {
    errors.date = 'Purchase date cannot be in the future';
  }

  return errors;
}

function validateTitle(data: ReviewFormData): Record<string, string> {
  const errors: Record<string, string> = {};

  if (!data.title.trim()) {
    errors.title = 'Review title is required';
  } else if (data.title.length < 10) {
    errors.title = 'Title must be at least 10 characters';
  } else if (data.title.length > 100) {
    errors.title = 'Title cannot be longer than 100 characters';
  }

  return errors;
}

function validateDetails(data: ReviewFormData): Record<string, string> {
  const errors: Record<string, string> = {};

  if (!data.details.trim()) {
    errors.details = 'Detailed review is required';
  } else if (data.details.length < 30) {
    errors.details = 'Details must be at least 30 characters';
  } else if (data.details.length > 1000) {
    errors.details = 'Details cannot be longer than 1000 characters';
  }

  return errors;
}

function validateRatings(data: ReviewFormData): Record<string, string> {
  const errors: Record<string, string> = {};

  if (!data.rating.overall) {
    errors.overall = 'Overall rating is required';
  }

  if (!data.rating.quality) {
    errors.quality = 'Quality rating is required';
  }

  if (!data.rating.value) {
    errors.value = 'Value rating is required';
  }

  return errors;
}

function validateRecommend(data: ReviewFormData): Record<string, string> {
  const errors: Record<string, string> = {};

  if (!data.recommend) {
    errors.recommend = 'Please select a recommendation';
  }

  return errors;
}

function validateAgreements(data: ReviewFormData): Record<string, string> {
  const errors: Record<string, string> = {};

  if (!data.makePublic) {
    errors.makePublic = 'The review needs to be public';
  }

  if (!data.agreeTerms) {
    errors.agreeTerms = 'You must agree to the terms';
  }

  return errors;
}
