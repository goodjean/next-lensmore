import React, { useEffect, useState } from "react";
import { signOut, useSession } from "next-auth/react";
import styled from "styled-components";
import Link from "next/link";

const NavbarStyle = styled.nav``;

function Navbar() {
  const [menuToggle, setMenuToggle] = useState(false);
  const { data: session, status } = useSession();

  // useEffect(() => {
  //   (async () => {
  //     const res = await fetch("/api/auth");
  //     const [a] = await res.json();
  //     console.log("aaaaa", a);
  //   })();
  // }, []);

  if (status === "authenticated") console.log("session", session);

  return (
    <NavbarStyle>
      {status === "authenticated" ? (
        <div>
          <span onClick={() => signOut()}>Log Out</span>
        </div>
      ) : (
        <div>
          <Link href="/auth/signin">Login</Link> <Link href="/auth/signup">Signup</Link>
        </div>
      )}
    </NavbarStyle>
  );
}

export default Navbar;
