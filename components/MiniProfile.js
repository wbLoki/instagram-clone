import { signOut, useSession } from "next-auth/react";

function MiniProfile({ session }) {
  const { username, name, image } = session?.user;
  return (
    <div className="flex items-center justify-between mt-14 ml-10">
      <div className="flex items-center space-x-4">
        <img
          className="w-16 h-16 rounded-full border p-[2px]"
          src={image}
          alt="profile pic"
        />
        <div>
          <p className="font-semibold text-sm">{username}</p>
          <p className="font-light">{name}</p>
        </div>
      </div>

      <button onClick={signOut} className="actionBtn text-sm">
        Sign Out
      </button>
    </div>
  );
}

export default MiniProfile;
