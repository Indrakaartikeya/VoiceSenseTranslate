import Header from "../Header";

export default function HeaderExample() {
  const mockUser = {
    name: "John Doe",
    email: "john.doe@example.com",
  };

  return (
    <div className="min-h-screen bg-background">
      <Header user={mockUser} onLogout={() => console.log("Logout clicked")} />
      <div className="container py-8 px-4">
        <h2 className="text-2xl font-semibold">Page Content</h2>
        <p className="text-muted-foreground mt-2">
          This demonstrates the header component with user menu.
        </p>
      </div>
    </div>
  );
}
