import { Question } from "../models/Question";
import { Category } from "../models/Category";
import { InterviewQuestion } from "../models/InterviewQuestion";
import { Interview } from "../models/Interview";

export class SampleDataService {

    static sampleInterview1(): Interview {
        return {
            title: "Interview 1",
            interviewQuestions: [SampleDataService.sampleInterviewQuestion1()]
        }
    }

    static sampleInterview2(): Interview {
        return {
            title: "Interview 2",
            interviewQuestions: [SampleDataService.sampleInterviewQuestion2()]
        }
    }

    static sampleInterviewQuestion1(): InterviewQuestion {
        return {
            question: SampleDataService.sampleQuestion1(),
            answer: "Antwort 1"
        }
    }

    static sampleInterviewQuestion2(): InterviewQuestion {
        return {
            question: SampleDataService.sampleQuestion2(),
            answer: "Antwort 2"
        }
    }

    static sampleCategory(): Category {
        return {
            name: "Kategorie 1",
            questions: [SampleDataService.sampleQuestion1(), SampleDataService.sampleQuestion2(), SampleDataService.sampleQuestion3()]
        }
    }

    static sampleQuestion1(): Question {
        return {
            text: "Frage 1"
        }
    }

    static sampleQuestion2(): Question {
        return {
            text: "Frage 2"
        }
    }

    static sampleQuestion3(): Question {
        return {
            text: "Frage 3"
        }
    }
}