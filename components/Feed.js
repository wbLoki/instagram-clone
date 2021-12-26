import Posts from "./Posts";
import Stories from "./Stories";
import MiniProfile from "./MiniProfile";
import Suggestions from "./Suggestions";
import { useSession } from "next-auth/react";

function Feed() {
  const { data: session } = useSession();
  console.log(session);
  return (
    <main
      className={`grid grid-cols-1 md:grid-cols-2 md:max-w-3xl
    xl:grid-cols-3 xl:max-w-6xl mx-auto ${
      !session && "!grid-cols-1 !max-w-3xl"
    }`}
    >
      <section className="col-span-2">
        <Stories />
        <Posts />
      </section>
      {/* Right Section */}
      {session && (
        <section className="hidden xl:inline-grid md:col-span-1">
          <div>
            <MiniProfile session={session} />
            <Suggestions />
          </div>
        </section>
      )}
    </main>
  );
}

export default Feed;
