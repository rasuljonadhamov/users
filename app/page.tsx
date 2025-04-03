import UserList from "@/components/user-list";


export default function Home() {
  return (
    <main className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6">User Directory</h1>
      <UserList />
    </main>
  );
}
