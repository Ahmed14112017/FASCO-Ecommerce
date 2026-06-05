"use client";
import { useEffect, useState } from "react";
import { getAllUsers } from "@/features/admin-users/services/users";
import { toast } from "react-toastify";
import Image from "next/image";

interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
  avatar: string;
  isVerified: boolean;
  createdAt: string;
}

export default function AdminUsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUsers() {
      try {
        const data = await getAllUsers();
        setUsers(data);
      } catch {
        toast.error("Error fetching users");
      } finally {
        setLoading(false);
      }
    }
    fetchUsers();
  }, []);

  if (loading)
    return (
      <div className="flex items-center justify-center h-60 text-gray-400">
        Loading...
      </div>
    );

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Users</h1>

      <div className="border rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="text-left p-4 font-medium text-gray-500">User</th>
              <th className="text-left p-4 font-medium text-gray-500">Email</th>
              <th className="text-left p-4 font-medium text-gray-500">Role</th>
              <th className="text-left p-4 font-medium text-gray-500">
                Verified
              </th>
              <th className="text-left p-4 font-medium text-gray-500">
                Joined
              </th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id} className="border-b hover:bg-gray-50">
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="relative w-8 h-8 rounded-full overflow-hidden bg-gray-100 shrink-0">
                      <Image
                        src={user.avatar || "/images/image-avatar.png"}
                        alt={user.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <p className="font-medium">{user.name}</p>
                  </div>
                </td>
                <td className="p-4 text-gray-500">{user.email}</td>
                <td className="p-4">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      user.role === "admin"
                        ? "bg-purple-100 text-purple-600"
                        : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {user.role}
                  </span>
                </td>
                <td className="p-4">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      user.isVerified
                        ? "bg-green-100 text-green-600"
                        : "bg-yellow-100 text-yellow-600"
                    }`}
                  >
                    {user.isVerified ? "Verified" : "Pending"}
                  </span>
                </td>
                <td className="p-4 text-gray-400 text-xs">
                  {new Date(user.createdAt).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
