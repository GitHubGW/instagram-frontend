import { isLoggedInVar } from "../apollo";

const Login = () => {
  console.log("bb");

  return (
    <div>
      <h1>Login</h1>
      <button onClick={() => isLoggedInVar(true)}>Login now...</button>
    </div>
  );
};

export default Login;
