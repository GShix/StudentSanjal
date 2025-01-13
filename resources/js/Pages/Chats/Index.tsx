import React, { useState, useMemo } from 'react';
import { Head, usePage, router } from '@inertiajs/react';
import ChatsLayout from './ChatsLayout';
import { Input } from '@headlessui/react';

const Index = () => {
//   const { otherUsers } = usePage().props;
//   const { user } = usePage().props.auth;
//   const [searchQuery, setSearchQuery] = useState('');

//   // Filter users based on the search query
//   const filteredUsers = useMemo(() => {
//     if (!searchQuery) return [];
//     return otherUsers.filter(otherUser =>
//       otherUser.first_name.toLowerCase().includes(searchQuery.toLowerCase())
//     );
//   }, [searchQuery, otherUsers]);

//   // Handle starting a chat
//   const handleStartChat = (receiverId) => {
//     router.get(`/chats/${receiverId}`);
//   };

  return (
    <ChatsLayout>
      <Head title="Chats" />
      <div className="flex justify-center flex-col items-center h-full">
        <h1>Start Messaging</h1>
        {/* <Input
          placeholder="Search other Students"
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
        />
        <div className="mt-4 w-full">
          {searchQuery && filteredUsers.length > 0 ? (
            <ul className="list-none">
              {filteredUsers.map(otherUser => (
                <li
                  key={otherUser.id}
                  className="p-2 border-b border-gray-300 hover:bg-gray-100 cursor-pointer"
                  onClick={() => handleStartChat(otherUser.id)}
                >
                  {otherUser.first_name}
                </li>
              ))}
            </ul>
          ) : searchQuery ? (
            <p className="text-gray-500 mt-4">No users found</p>
          ) : null}
        </div> */}
      </div>
    </ChatsLayout>
  );
};

export default Index;
