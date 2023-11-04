import Image from "next/image";
import { useSession, signOut } from "next-auth/react";

import logo from "../../public/logo.png";
import { Button } from "../common/button";

function AppHeader() {
  const { data: session } = useSession();

  async function handleLogout() {
    await signOut();
  }

  return (
    <header className="px-2 flex flex-col gap-2 my-2 items-center sm:px-6 sm:h-20 sm:flex-row sm:justify-between">
      <div className="flex gap-3">
        <Image src={logo} alt="Logo" width={23} height={46} />
        <h1 className="text-4xl font-bold text-gray-900">My Dividends</h1>
      </div>

      <div className="flex items-center justify-between sm:justify-center gap-4 w-full sm:w-auto px-4 sm:px-0">
        <div>
          <p className="text-sm font-bold">{session?.user?.name}</p>
          <p className="text-sm text-gray-600">{session?.user?.email}</p>
        </div>

        <Button variant="ghost" size="sm" onClick={handleLogout}>
          Logout
        </Button>
      </div>
    </header>
  );
}

export default AppHeader;
