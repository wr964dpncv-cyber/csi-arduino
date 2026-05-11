export type QuestionType = "multiple_choice" | "file_upload" | "text_long";

export type QuizQuestion = {
  id: string;
  taller_id: string;
  sort_order: number;
  question: string;
  options: string[];
  correct_index?: number;
  question_type?: QuestionType;
  image_url?: string | null;
};

export type QuizAnswer = {
  question_id: string;
  selected_index: number;
};

export type QuizResponse = {
  id: string;
  taller_id: string;
  taller_n: number;
  taller_title: string;
  student_name: string;
  student_email: string;
  student_school: string | null;
  answers: Array<QuizAnswer & { correct: boolean }>;
  score: number;
  total: number;
  created_at: string;
};
