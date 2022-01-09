import faker from "faker";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import Story from "./Story";

function Stories() {
  const [suggestions, setSuggestions] = useState([]);
  const { data: session } = useSession();

  useEffect(() => {
    const suggestions = [...Array(20)].map((_, i) => ({
      ...faker.helpers.contextualCard(),
      id: i,
    }));
    setSuggestions(suggestions);
  }, []);
  return (
    <div
      id="stories"
      className="flex space-x-2 p-4 bg-white mt-8
      border-gray-200 border rounded-sm overflow-x-scroll
      scrollbar-thin scrollbar-thumb-gray-700
      scrollbar-thumb-rounded-full overflow-y-hidden"
    >
      {session && (
        <Story img={session.user.image} username={session.user.username} />
      )}
      {suggestions.map((profile) => (
        <Story
          key={profile.id}
          img={`https://i.pravatar.cc/150?img=${profile.id}`}
          username={profile.username}
        />
      ))}
    </div>
  );
}

export default Stories;
