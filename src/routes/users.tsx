import Coopernet from "../services/Coopernet";

export async function loader() {
  return await Coopernet.getUsers();
}
