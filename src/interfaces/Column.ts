import Card from "./Card";

export default interface Column {
  id: string;
  name: string;
  cards: Card[];
}
