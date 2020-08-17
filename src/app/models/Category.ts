import { Question } from "./Question";

export interface Category {
  firebaseId?: string;
  name: string;
  status: "Favorite" | "Neutral";
  questions?: Question[];
}
