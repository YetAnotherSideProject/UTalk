export interface UserData {
  user: string;
  lastInterviews: string[];
  lastQuestions: CategoryAndQuestion[];
}

interface CategoryAndQuestion {
  categoryId: string;
  questionId: string;
}
