import type { Ratings } from '../types/review';

export function ratingsParser(ratings: Ratings): string[] {
  const result: string[] = [];
  if (ratings.overall) {
    result.push(`Overall: ${ratings.overall}/5`);
  }

  if (ratings.quality) {
    result.push(`Quality: ${ratings.quality}/5`);
  }

  if (ratings.value) {
    result.push(`Value: ${ratings.value}/5`);
  }

  if (ratings.delivery) {
    result.push(`Delivery: ${ratings.delivery}/5`);
  }

  if (ratings.service) {
    result.push(`Service: ${ratings.service}/5`);
  }

  return result;
}
