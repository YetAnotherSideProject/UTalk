import { Question } from "./Question";

export interface Category {
    name: string;
    questions?: Question[];
}