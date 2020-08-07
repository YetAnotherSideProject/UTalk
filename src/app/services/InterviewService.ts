import { Interview } from "../models/Interview";
import { InterviewDao } from "../dao/InterviewDao";

export class InterviewService {
  static async getAllInterviews() {
    return InterviewDao.getAllInterviews();
  }

  static async addInterview(interviewTitle: string) {
    if (interviewTitle !== undefined && interviewTitle !== "") {
      await InterviewDao.addInterview(interviewTitle);
    }
  }

  static async renameInterview(interview: Interview, newTitle: string) {
    if (newTitle !== interview.title) {
      interview.title = newTitle;
      await InterviewDao.updateInterview(interview);
    }
  }

  static async deleteInterview(interview: Interview) {
    await InterviewDao.deleteInterview(interview);
  }
}
