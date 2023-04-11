import Coopernet from "../services/Coopernet";

export async function loader() {
  return (await Coopernet.getUsers()).filter((user) => user.uid !== "0").sort(
    (a, b) => +(a.uname.toUpperCase() > b.uname.toUpperCase())
  );
}
