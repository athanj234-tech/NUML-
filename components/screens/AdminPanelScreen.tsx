
import React, { useState, useEffect, useCallback } from 'react';
import { getApprovedUsers, addApprovedUser, removeApprovedUser } from '../../services/firestoreService';
import type { ApprovedUser } from '../../types';
import Header from '../layout/Header';
import { Trash } from '../icons';
import Spinner from '../ui/Spinner';

interface AdminPanelScreenProps {
  onBack: () => void;
}

const AdminPanelScreen: React.FC<AdminPanelScreenProps> = ({ onBack }) => {
  const [users, setUsers] = useState<ApprovedUser[]>([]);
  const [newUid, setNewUid] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<string | null>(null);

  const fetchUsers = useCallback(async () => {
    setIsLoading(true);
    try {
      const userList = await getApprovedUsers();
      setUsers(userList.sort((a, b) => a.uid.localeCompare(b.uid)));
    } catch (err) {
      setError("Failed to load users.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const handleAddUser = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUid.trim()) return;
    try {
      await addApprovedUser(newUid.trim());
      setNewUid('');
      setFeedback(`User ${newUid.trim()} added successfully.`);
      fetchUsers();
    } catch (err) {
      setError("Failed to add user. Please check the UID and try again.");
    }
    setTimeout(() => {
        setFeedback(null);
        setError(null);
    }, 3000);
  };

  const handleRemoveUser = async (uid: string) => {
    if (window.confirm(`Are you sure you want to remove user ${uid}?`)) {
      try {
        await removeApprovedUser(uid);
        setFeedback(`User ${uid} removed successfully.`);
        fetchUsers();
      } catch (err) {
        setError("Failed to remove user.");
      }
      setTimeout(() => {
        setFeedback(null);
        setError(null);
    }, 3000);
    }
  };

  return (
    <div className="min-h-screen bg-brand-primary">
      <Header title="Admin Panel" showBackButton onBackClick={onBack} />
      <main className="container mx-auto p-4 md:p-8">
        <div className="bg-brand-secondary rounded-lg shadow-xl p-6">
          <h2 className="text-2xl font-bold mb-4">Add New User</h2>
          <form onSubmit={handleAddUser} className="flex flex-col sm:flex-row gap-2 mb-8">
            <input
              type="text"
              value={newUid}
              onChange={(e) => setNewUid(e.target.value)}
              placeholder="Enter new User ID (UID)"
              className="flex-grow bg-brand-primary text-brand-text p-2 rounded-md border border-brand-accent focus:outline-none focus:ring-2 focus:ring-brand-teal"
            />
            <button type="submit" className="bg-brand-teal text-white font-semibold py-2 px-4 rounded-md hover:bg-opacity-80 transition-colors">
              Add User
            </button>
          </form>

           {error && <p className="text-red-400 mb-4">{error}</p>}
           {feedback && <p className="text-green-400 mb-4">{feedback}</p>}

          <h2 className="text-2xl font-bold mb-4">Approved Users</h2>
          {isLoading ? (
            <div className="flex justify-center p-8"><Spinner /></div>
          ) : (
            <div className="max-h-96 overflow-y-auto bg-brand-primary rounded-md">
              <ul className="divide-y divide-brand-accent">
                {users.map((user) => (
                  <li key={user.uid} className="flex justify-between items-center p-3">
                    <span className="text-brand-light text-sm font-mono break-all pr-4">{user.uid}</span>
                    <button
                      onClick={() => handleRemoveUser(user.uid)}
                      className="text-red-500 hover:text-red-400 p-2 rounded-full hover:bg-red-500/10 transition-colors"
                    >
                      <Trash className="w-5 h-5" />
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default AdminPanelScreen;
