import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { useForm } from "react-hook-form";

import lock from "../public/assets/svg/Lock.svg";
import user from "../public/assets/svg/User.svg";

const Signup = () => {
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
        <title>Sign Up</title>
        <meta name="description" content="sign Up page" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className=" xl:w-1/3 lg:w-2/5 md:w-3/5 sm:1/2 w-full ">
        <div className="text-center p-16">
          <h1 className="font-medium text-3xl mb-7">Sign Up</h1>

          {/** sing-up form */}
          <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
            <div className="relative">
              <span className="absolute right-1 top-3 pr-2">
                <Image src={user} alt="user icon" height={20} width={20} />
              </span>
              <input
                type="text"
                className=" w-full border-2 border-black outline-none rounded-md  p-2 focus:border-primary"
                name="name"
                id="name"
                placeholder="Username"
                {...register("name", { required: true, maxLength: 30 })}
              />
              <br />
              {errors.name && errors.name.type === "required" && (
                <span className="text-primary">username is required</span>
              )}
              {errors.name && errors.name.type === "maxLength" && (
                <span className="text-primary">the name is too long</span>
              )}
            </div>
            <div className="relative">
              <span className="absolute right-1 top-3 pr-2">
                <Image src={user} alt="user icon" height={20} width={20} />
              </span>
              <input
                type="email"
                className=" w-full border-2 border-black outline-none rounded-md  p-2 focus:border-primary"
                name="email"
                id="email"
                placeholder="john@example.com"
                {...register("email", {
                  pattern: /^[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
                  required: true,
                })}
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
                {...register("password", {
                  required: true,
                  pattern:
                    /^(?=.*[\d])(?=.*[!@#$%^&*])(?=.*[a-zA-Z])[a-zA-Z0-9!@#$%^&*]{8,16}$/,
                })}
                placeholder="Password"
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
              Sign Up
            </button>
          </form>

          {/** link to sign up page */}
          <Link href="/signin">
            <a className="inline-block text-grey hover:underline mt-5 w-full sm:mb-3">
              {" "}
              Already Have an Account? Sign In
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
};
export default Signup;
