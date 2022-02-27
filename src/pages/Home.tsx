import { isLoggedInVar } from "../apollo";

const Home = () => {
  console.log("cc");
  return (
    <div>
      <h1>Home</h1>
      <button onClick={() => isLoggedInVar(false)}>Logout now...</button>
    </div>
  );
};

export default Home;
