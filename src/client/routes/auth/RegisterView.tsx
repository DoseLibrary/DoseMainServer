import { Link } from "react-router-dom";
import { Card } from "../../core";
import { RegisterForm } from "../../features/auth/RegisterForm";

export const RegisterView = () => {
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
        title="Register"
        subtitle="Create an account"
        className="flex flex-col z-10"
      >
        <RegisterForm />
        <div className="text-right text-sm mt-2">
          Already have an account? <Link to="/login" className="text-blue-500">Login</Link>
        </div>
      </Card>
    </div >
  );
}