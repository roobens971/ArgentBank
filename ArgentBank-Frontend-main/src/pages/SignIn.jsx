// src/pages/SignIn.jsx
import SignInForm from '../components/SignInForm';

function SignIn({ setIsLoggedIn }) {
  return (
    <div className="bg-dark">
      <SignInForm setIsLoggedIn={setIsLoggedIn} />
    </div>
  );
}

export default SignIn;
