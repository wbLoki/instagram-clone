import Head from "next/head";
import Header from "../components/Header";
import Feed from "../components/Feed";
import Modal from "../components/Modal";

export default function Home() {
  return (
    <div
      className="bg-gray-50 h-screen overflow-y-scroll
    scrollbar-hide"
    >
      <Head>
        <title>Outagram</title>
        <link rel="icon" href="https://i.ibb.co/tDfqgzC/logo-square.png" />
      </Head>
      <Header />
      <Feed />
      <Modal />
    </div>
  );
}
