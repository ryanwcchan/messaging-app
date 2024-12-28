import { useState, useEffect } from "react";

export type UserType = {
  fullName: string;
  username: string;
  gender: string;
  profilePic: string;
  createdAt: string;
};

const useGetAllUsers = () => {
  const [users, setUsers] = useState<UserType[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getAllUsers = async () => {
      try {
        setLoading(true);
        const response = await fetch("/api/auth/allUsers");
        const data = await response.json();
        console.log(data);
        setUsers(data);
      } catch (error) {
        console.log("Error in useGetAllUsers", error);
      } finally {
        setLoading(false);
      }
    };

    getAllUsers();
  }, []);

  return { users, loading };
};

export default useGetAllUsers;