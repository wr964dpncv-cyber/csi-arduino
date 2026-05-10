export type QuizQuestion = {
  id: string;
  taller_id: string;
  sort_order: number;
  question: string;
  options: string[];
  correct_index?: number; // omit on public side
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
