import { ErrorBoundary } from "react-error-boundary";
import Signin from "../components/auth/Signin";
import Error from "../components/Error";

const SigninPage = () => {
  return (
    <ErrorBoundary FallbackComponent={Error}>
      <Signin />
    </ErrorBoundary>
  );
};

export default SigninPage;
