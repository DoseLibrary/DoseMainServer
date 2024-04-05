import { Link } from "react-router-dom";
import { Card } from "../../core";
import { LoginForm } from "../../features/auth/LoginForm";

export const LoginView = () => {
  return (
    <div className={`
    h-screen
    w-screen
    flex
    justify-center
    items-center
    `}>
      <div className="bg-login h-screen w-screen fixed z-0 opacity-60" />
      <Card
        title="Login"
        subtitle="Enter your credentials"
        className="flex flex-col z-10"
      >
        <LoginForm />
        <div className="text-right text-sm mt-2">
          Don't have an account? <Link to="/register" className="text-blue-500">Register</Link>
        </div>
      </Card>
    </div>
  );
}