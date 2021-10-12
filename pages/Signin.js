import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import lock from "../public/assets/svg/Lock.svg";
import user from "../public/assets/svg/User.svg";
import { useForm } from "react-hook-form";
// Logo
import googleLogo from "../public/assets/Google.svg";

const Signin = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    console.log(data);
  };
  return (
    <div className="h-70v flex flex-col  items-center justify-center">
      <Head>
        <title>Sign In</title>
        <meta name="description" content="sign in page" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="text-center p-16 lg:w-1/3 md:1/2 ">
        <h1 className="font-medium text-3xl mb-7">Log in</h1>

        {/** login form */}
        <form className="space-y-4 " onSubmit={handleSubmit(onSubmit)}>
          <div className="relative">
            <span className="absolute right-1 top-3 pr-2">
              <Image src={user} alt="user icon" height={20} width={20} />
            </span>
            <input
              type="email"
              className=" w-full border-2 border-black outline-none rounded-md  p-2 focus:border-primary"
              name="email"
              id="email"
              {...register("email", {
                pattern: /^[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
                required: true,
              })}
              placeholder="use@flashcard.com"
            />
            <br />
            {errors.email && errors.email.type === "pattern" && (
              <span className="text-primary">This email is not valid </span>
            )}
            {errors.email && errors.email.type === "required" && (
              <span className="text-primary">email is required</span>
            )}
          </div>

          <div className="relative">
            {" "}
            <span className="absolute right-1 top-3 pr-2">
              <Image src={lock} alt="lock icon" height={20} width={20} />
            </span>
            <input
              className=" w-full border-2 border-black outline-none rounded-md p-2 focus:border-primary"
              type="password"
              name="password"
              id="password"
              placeholder="Password"
              {...register("password", {
                required: true,
                pattern:
                  /^(?=.*[\d])(?=.*[!@#$%^&*])(?=.*[a-zA-Z])[a-zA-Z0-9!@#$%^&*]{8,16}$/,
              })}
            />
            <br />
            {errors.password && errors.password.type === "pattern" && (
              <span className="text-primary">
                the password must be between 8-16 containing alphanumeric and
                symbols
              </span>
            )}
            {errors.password && errors.password.type === "required" && (
              <span className="text-primary">password is required</span>
            )}
          </div>
          <button className="btn-primary w-full block text-center">
            Login In
          </button>
        </form>
        {/** link to sign up page */}
        <Link href="/Signup">
          <a className="inline-block text-gray hover:underline mt-2 mb-4 w-full sm:mb-3">
            {" "}
            Don`t Have an Account ? Sign up
          </a>
        </Link>

        {/** log in with google */}
        <button className="relative btn-secondary lg:w-64 text-center w-full">
          <div className="transform translate-x-5 ">
            <span className="w-7 inline-block absolute left-3/6 transform -translate-y-0.5 -translate-x-9">
              <Image src={googleLogo} alt="Google" height={38} width={38} />
            </span>
            Log in with <span className="font-bold ">Google</span>
          </div>
        </button>
      </div>
    </div>
  );
};

export default Signin;
