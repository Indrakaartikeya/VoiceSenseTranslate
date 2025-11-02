import AuthCard from "../AuthCard";

export default function AuthCardExample() {
  return (
    <AuthCard onLogin={(email, password) => console.log("Login:", email, password)} />
  );
}
