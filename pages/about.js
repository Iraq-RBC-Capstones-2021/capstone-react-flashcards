// import Section from "../components/Section";
import UserCard from "../components/userCard";
import data from "../users.json";

export default function About() {
  const allUsers = data.users;

  const all = (allUsers) => {
    return (
      <UserCard
        key={allUsers.id}
        title={allUsers.title}
        description={allUsers.description}
        facebook={allUsers.facebook}
        twitter={allUsers.twitter}
        google={allUsers.google}
      />
    );
  };

  return (
    <div className="px-32">
      {/* <Section
        title="About Us"
        text="Body placeholder for text paragraph. A paragraph is a self-contained unit of text dealing with a particular point or idea."
        action="false"
      /> */}
      <div className="grid gap-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 border-t-2 text-gray justify-items-center">
        {allUsers.map(all)}
      </div>

      <form className="grid md:grid-cols-2 sm:grid-cols-1 border-t-2 text-gray pb-32">
        <div className="mb-3 pt-40 lg:pl-32 text-black">
          <p className="font-medium text-4xl">Get in touch</p>
          <p className="pt-4 lg:w-96">
            {/* eslint-disable-next-line react/no-unescaped-entities */}
            Want to get in touch? We'd love to hear from you. Here's how you can
            reach us...
          </p>
        </div>
        <div style={{ maxWidth: "700px" }}>
          <div className="mb-3 pt-32 text-black">
            <input
              type="text"
              placeholder="Enter your e-mail"
              className="px-2 py-1 bg-white rounded text-md border focus:outline-none focus:ring w-full"
            />
            <textarea
              className="px-2 py-1 form-textarea mt-2 w-full border rounded focus:outline-none focus:ring"
              rows="6"
              placeholder="Enter your question..."
            ></textarea>
          </div>
          <button
            type="submit"
            className="py-2 px-8 text-white font-semibold bg-primary hover:opacity-90 rounded-lg"
          >
            Send
          </button>
        </div>
      </form>
    </div>
  );
}
