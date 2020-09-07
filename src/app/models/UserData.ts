export interface UserData {
  user: string;
  lastInterviews: string[];
  lastQuestions: CategoryAndQuestion[];
  lastActiveInterview: string | undefined;
}

interface CategoryAndQuestion {
  categoryId: string;
  questionId: string;
}
