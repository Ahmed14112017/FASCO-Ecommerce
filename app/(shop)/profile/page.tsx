"use client";
import { useEffect, useState } from "react";
import {
  getProfile,
  updateProfile,
  changePassword,
  addAddress,
  deleteAddress,
} from "@/features/user/services/user";
import { toast } from "react-toastify";
import Image from "next/image";

interface Address {
  _id: string;
  label: string;
  street: string;
  city: string;
  country: string;
  phone: string;
}

interface Profile {
  name: string;
  email: string;
  phone: string;
  avatar: string;
  addresses: Address[];
}

export default function ProfilePage() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"info" | "password" | "addresses">(
    "info",
  );

  // Profile form
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [avatar, setAvatar] = useState<File | null>(null);

  // Password form
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  // Address form
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [addressForm, setAddressForm] = useState({
    label: "Home",
    street: "",
    city: "",
    country: "",
    phone: "",
  });

  useEffect(() => {
    async function fetchProfile() {
      try {
        const data = await getProfile();
        setProfile(data);
        setName(data.name);
        setPhone(data.phone || "");
      } catch (err) {
        toast.error("Error fetching profile");
      } finally {
        setLoading(false);
      }
    }
    fetchProfile();
  }, []);

  async function handleUpdateProfile() {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("phone", phone);
    if (avatar) formData.append("avatar", avatar);
    try {
      const data = await updateProfile(formData);
      setProfile(data);
      toast.success("Profile updated!");
    } catch {
      toast.error("Error updating profile");
    }
  }

  async function handleChangePassword() {
    try {
      await changePassword({ currentPassword, newPassword });
      toast.success("Password changed!");
      setCurrentPassword("");
      setNewPassword("");
    } catch {
      toast.error("Current password is incorrect");
    }
  }

  async function handleAddAddress() {
    try {
      const addresses = await addAddress(addressForm);
      setProfile((prev) => (prev ? { ...prev, addresses } : prev));
      setShowAddressForm(false);
      setAddressForm({
        label: "Home",
        street: "",
        city: "",
        country: "",
        phone: "",
      });
      toast.success("Address added!");
    } catch {
      toast.error("Error adding address");
    }
  }

  async function handleDeleteAddress(id: string) {
    try {
      const addresses = await deleteAddress(id);
      setProfile((prev) => (prev ? { ...prev, addresses } : prev));
      toast.success("Address deleted!");
    } catch {
      toast.error("Error deleting address");
    }
  }

  if (loading)
    return (
      <div className="flex items-center justify-center h-60 text-gray-400">
        Loading...
      </div>
    );

  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      <h1 className="text-2xl font-bold mb-8">My Profile</h1>

      {/* Avatar */}
      <div className="flex items-center gap-4 mb-8">
        <div className="relative w-20 h-20 rounded-full overflow-hidden bg-gray-100">
          <Image
            src={profile?.avatar || "/images/image-avatar.png"}
            alt="avatar"
            fill
            className="object-cover"
          />
        </div>
        <div>
          <p className="font-medium">{profile?.name}</p>
          <p className="text-sm text-gray-400">{profile?.email}</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-4 border-b mb-6">
        {(["info", "password", "addresses"] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`pb-2 text-sm capitalize transition-colors ${
              activeTab === tab
                ? "border-b-2 border-black font-medium"
                : "text-gray-400"
            }`}
          >
            {tab === "info"
              ? "Personal Info"
              : tab === "password"
                ? "Change Password"
                : "Addresses"}
          </button>
        ))}
      </div>

      {/* Personal Info */}
      {activeTab === "info" && (
        <div className="flex flex-col gap-4">
          <div>
            <label className="text-sm text-gray-500 mb-1 block">Name</label>
            <input
              className="w-full border rounded-lg p-2 text-sm"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <label className="text-sm text-gray-500 mb-1 block">Phone</label>
            <input
              className="w-full border rounded-lg p-2 text-sm"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          <div>
            <label className="text-sm text-gray-500 mb-1 block">
              Profile Picture
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setAvatar(e.target.files?.[0] || null)}
              className="text-sm"
            />
          </div>
          <button
            onClick={handleUpdateProfile}
            className="w-full py-2.5 bg-black text-white rounded-lg text-sm hover:opacity-80"
          >
            Save Changes
          </button>
        </div>
      )}

      {/* Change Password */}
      {activeTab === "password" && (
        <div className="flex flex-col gap-4">
          <div>
            <label className="text-sm text-gray-500 mb-1 block">
              Current Password
            </label>
            <input
              type="password"
              className="w-full border rounded-lg p-2 text-sm"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
            />
          </div>
          <div>
            <label className="text-sm text-gray-500 mb-1 block">
              New Password
            </label>
            <input
              type="password"
              className="w-full border rounded-lg p-2 text-sm"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>
          <button
            onClick={handleChangePassword}
            className="w-full py-2.5 bg-black text-white rounded-lg text-sm hover:opacity-80"
          >
            Change Password
          </button>
        </div>
      )}

      {/* Addresses */}
      {activeTab === "addresses" && (
        <div className="flex flex-col gap-4">
          {profile?.addresses.length === 0 && (
            <p className="text-sm text-gray-400">No addresses yet</p>
          )}
          {profile?.addresses.map((addr) => (
            <div
              key={addr._id}
              className="border rounded-xl p-4 flex justify-between items-start"
            >
              <div>
                <p className="font-medium text-sm">{addr.label}</p>
                <p className="text-sm text-gray-500">
                  {addr.street}, {addr.city}, {addr.country}
                </p>
                <p className="text-sm text-gray-400">{addr.phone}</p>
              </div>
              <button
                onClick={() => handleDeleteAddress(addr._id)}
                className="text-red-400 text-sm hover:text-red-600"
              >
                Delete
              </button>
            </div>
          ))}

          {!showAddressForm ? (
            <button
              onClick={() => setShowAddressForm(true)}
              className="w-full py-2.5 border border-dashed border-gray-300 rounded-lg text-sm text-gray-500 hover:border-black hover:text-black transition-colors"
            >
              + Add New Address
            </button>
          ) : (
            <div className="border rounded-xl p-4 flex flex-col gap-3">
              {["label", "street", "city", "country", "phone"].map((field) => (
                <input
                  key={field}
                  className="w-full border rounded-lg p-2 text-sm"
                  placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                  value={addressForm[field as keyof typeof addressForm]}
                  onChange={(e) =>
                    setAddressForm({ ...addressForm, [field]: e.target.value })
                  }
                />
              ))}
              <div className="flex gap-2">
                <button
                  onClick={handleAddAddress}
                  className="flex-1 py-2 bg-black text-white rounded-lg text-sm"
                >
                  Save
                </button>
                <button
                  onClick={() => setShowAddressForm(false)}
                  className="flex-1 py-2 border rounded-lg text-sm"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
