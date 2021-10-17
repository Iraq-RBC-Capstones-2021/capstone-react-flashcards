import Image from "next/image";
import Avatar from "../../../public/assets/Avatar.png";
import Card from "../../../components/Card";

const Profile = ({ userInfo }) => {
  //we can add the user obeject into an array and map it to display card
  //and we can use img and name for user name  and profile image
  return (
    <div className="mx-2">
      <div className="text-center  m-16">
        <Image
          src={Avatar}
          alt="avater"
          height={230}
          width={230}
          className="rounded-full"
        />
        <h1 className="text-4xl	 font-bold mt-4">User Name</h1>
      </div>
      <h3 className="font-bold text-2xl  mb-10">&#62; Users’s sets</h3>
      <div className="flex flex-wrap justify-between self-center lg:mx-11 md:justify-center">
        {/* 
           {userInfo.map(data=>{
        <Card />
      }}
    */}
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
      </div>
      <div className="flex justify-end mb-2">
        <button className="btn-primary w-28 h-10">View all</button>
      </div>
    </div>
  );
};
// fetching data per request using getServerSideProps

export const getServerSideProps = async (context) => {
  const res = await fetch(
    //this is just for testing
    `http://jsonplaceholder.typicode.com/posts/${context.query.userid}`
  );
  const userInfo = await res.json();

  return {
    props: {
      userInfo,
    },
  };
};

export default Profile;
