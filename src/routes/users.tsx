import Coopernet from "../services/Coopernet";

export async function loader() {
  return (await Coopernet.getUsers()).sort(
    (a, b) => +(a.uname.toUpperCase() > b.uname.toUpperCase())
  );
}
