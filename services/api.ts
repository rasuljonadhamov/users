import { User } from "@/types/user";


export const fetchUsers = async (): Promise<User> => {
  const response = await fetch('https://jsonplaceholder.typicode.com/users');
  
  if (!response.ok) {
    throw new Error('Failed to fetch users');
  }
  
  return response.json();
};