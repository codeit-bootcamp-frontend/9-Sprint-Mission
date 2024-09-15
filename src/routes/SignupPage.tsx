import { ErrorBoundary } from "react-error-boundary";
import Signup from "../components/auth/Signup";
import Error from "../components/Error";

const SignupPage = () => {
  return (
    <ErrorBoundary FallbackComponent={Error}>
      <Signup />
    </ErrorBoundary>
  );
}

export default SignupPage;