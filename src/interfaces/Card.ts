export default interface Card {
  id: string;
  uuid: string;
  answer: string;
  column: string;
  explanation: string;
  explanation_picture: { url: string | null; id: string | null };
  question: string;
  question_picture: { url: string | null; id: string | null };
}
