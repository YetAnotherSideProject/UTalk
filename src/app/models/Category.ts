import { Question } from "./Question";

export interface Category {
  firebaseId?: string;
  name: string;
  questions?: Question[];
}
