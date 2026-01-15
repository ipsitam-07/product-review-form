import { type Ratings } from "./rating";

export type Review = {
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