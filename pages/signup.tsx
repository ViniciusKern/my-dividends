import { FormEvent, useEffect, useRef, useState } from "react";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";

import logo from "../public/logo.png";
import { signUp } from "@/services/user.service";
import { showError } from "@/utils/notification-utils";
import { Input } from "@/components/common/input";
import { Button } from "@/components/common/button";

function SignUp() {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isSigningUp, setIsSigningUp] = useState<boolean>(false);
  const nameRef = useRef<HTMLInputElement>(null);

  const router = useRouter();
  const { status } = useSession();

  useEffect(() => {
    if (status === "authenticated") {
      router.push("/");
    }
    nameRef.current?.focus();
  }, [router, status]);

  function handleChangeName(event: React.ChangeEvent<HTMLInputElement>) {
    setName(event.target.value);
  }

  function handleChangeEmail(event: React.ChangeEvent<HTMLInputElement>) {
    setEmail(event.target.value);
  }

  function handleChangePassword(event: React.ChangeEvent<HTMLInputElement>) {
    setPassword(event.target.value);
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSigningUp(true);

    try {
      await signUp({ name, email, password });
      await signIn("credentials", {
        redirect: false,
        email,
        password,
      });
    } catch (error) {
      showError(`Something went wrong: ${error}`);
    } finally {
      setIsSigningUp(false);
    }
  }

  return (
    <div className="flex inset-0 absolute">
      <div className="w-full h-screen flex flex-col justify-center items-center bg-teal-0">
        <div className="xs:w-[320px] w-[380px] sm:w-[420px]">
          <header className="flex justify-center items-center gap-4">
            <Image src={logo} alt="Logo" width={23} height={46} />
            <h1 className="text-4xl font-bold text-gray-900">My Dividends</h1>
          </header>
          <div className="bg-white p-8 mt-6 rounded-lg border border-gray-200 shadow-md shadow-gray-300">
            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
              <Input
                ref={nameRef}
                required
                name="name"
                placeholder="Name"
                value={name}
                onChange={handleChangeName}
              />
              <Input
                required
                type="email"
                name="email"
                placeholder="E-mail"
                value={email}
                onChange={handleChangeEmail}
              />
              <Input
                required
                type="password"
                name="password"
                placeholder="Password"
                value={password}
                onChange={handleChangePassword}
              />

              <Button
                type="submit"
                isLoading={isSigningUp}
                className="mt-2 w-full"
              >
                Create Account
              </Button>
            </form>
            <p className="space-x-2 mt-8 text-center">
              <span className="text-gray-700">Already have an account?</span>
              <Link className="text-teal-800 font-bold" href="/login">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
