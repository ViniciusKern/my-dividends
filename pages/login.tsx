import Image from "next/image";
import { useRouter } from "next/router";
import Link from "next/link";
import { signIn, useSession } from "next-auth/react";

import logo from "../public/logo.png";
import { FormEvent, useEffect, useRef, useState } from "react";
import { showError } from "@/utils/notification-utils";
import { Button } from "@/components/common/button";
import { Input } from "@/components/common/input";

function Login() {
  const router = useRouter();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isSigningIn, setIsSigningIn] = useState<boolean>(false);
  const emailRef = useRef<HTMLInputElement>(null);

  const { status } = useSession();

  useEffect(() => {
    if (status === "authenticated") {
      router.push("/");
    }
    emailRef.current?.focus();
  }, [router, status]);

  function handleChangeEmail(event: React.ChangeEvent<HTMLInputElement>) {
    setEmail(event.target.value);
  }

  function handleChangePassword(event: React.ChangeEvent<HTMLInputElement>) {
    setPassword(event.target.value);
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSigningIn(true);

    try {
      const result = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });

      if (result?.error) {
        showError(`Login failed: ${result.error}`);
        setIsSigningIn(false);
      }
    } catch (error) {
      showError(`Login failed: ${error}`);
      setIsSigningIn(false);
    }
  }

  return (
    <div className="flex inset-0 absolute">
      <div className="w-full flex-1 flex flex-col justify-center items-center bg-teal-0">
        <div className="xs:w-[320px] w-[380px] sm:w-[420px]">
          <header className="flex justify-center items-center gap-4">
            <Image src={logo} alt="Logo" width={23} height={46} />
            <h1 className="text-4xl font-bold text-gray-900">My Dividends</h1>
          </header>
          <div className="bg-white p-8 mt-6 rounded-lg border border-gray-200 shadow-md shadow-gray-300">
            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
              <Input
                ref={emailRef}
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
                isLoading={isSigningIn}
                className="mt-2 w-full"
              >
                Log in
              </Button>
            </form>
            <p className="space-x-2 mt-8 text-center">
              <span className="text-gray-700">{"Don't have an account?"}</span>
              <Link className="text-teal-800 font-bold" href="/signup">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
