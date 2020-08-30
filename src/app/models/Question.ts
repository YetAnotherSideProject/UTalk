export interface Question {
  firebaseId?: string;
  text: string;
  categoryId?: string;
}

export interface Category {
  firebaseId?: string;
  name: string;
  status: "Favorite" | "Neutral";
  questions?: Question[];
}
