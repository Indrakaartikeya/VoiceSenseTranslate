import AuthCard from "@/components/AuthCard";

export default function Auth() {
  return <AuthCard onLogin={(email, password) => console.log("Login:", email, password)} />;
}
