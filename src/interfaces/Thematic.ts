import User from "./User";
import Card from "./Card";

export default interface Thematic {
  id: string;
  pid: string;
  name: string;
  children?: Thematic[];
}

export const isThematic = (data: Thematic | User | Card): data is Thematic => {
  return "pid" in data;
};
