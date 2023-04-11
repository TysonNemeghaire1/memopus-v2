import User from "./User";

export default interface Thematic {
  id: string;
  pid: string;
  name: string;
  children?: Thematic[];
}

export const isThematic = (data: Thematic | User): data is Thematic => {
  return "id" in data;
};
