export interface Interview {
  firebaseId: string;
  title: string;
  interviewParts: InterviewPart[];
}

interface InterviewPart {
  title: string;
  interviewQuestions?: InterviewQuestion[];
}

interface InterviewQuestion {
  question: string;
  answer?: string;
}
