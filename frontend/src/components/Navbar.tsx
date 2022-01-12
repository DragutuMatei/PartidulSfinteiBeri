import { Box, Flex, Link } from "@chakra-ui/layout";
import React, { useEffect, useRef } from "react";
import NextLink from "next/link";
import { useGetLoggedUserQuery, useLogoutMutation } from "../generated/graphql";
import { Button } from "@chakra-ui/button";
import { isServer } from "../utils/isServer";
import Lottie from "lottie-web";
import { defineLordIconIllustration } from "lord-icon-illustration";

interface NavbarProps {}

export const Navbar: React.FC<NavbarProps> = ({}) => {
  const [{ fetching: logoutfetching }, logout] = useLogoutMutation();
  const [{ data, fetching }] = useGetLoggedUserQuery({
    pause: isServer(),
  });

  useEffect(() => {
    window.addEventListener("scroll", scrl);
    window.addEventListener("load", scrl);
  }, []);

  const scrl = () => {
    const navbar = document.querySelector(".navbar") as HTMLAnchorElement;

    if (navbar.getBoundingClientRect().top == 0 ) {
      navbar.style.width = "100vw";
      navbar.style.borderRadius = "0px";
    } else if (navbar.getBoundingClientRect().top != 0) {
      navbar.style.width = "65%";
      navbar.style.borderRadius = "30px";
    }
  };

  return (
    // <div className="navbar_container">
    <div className="navbar">
      <ul>
        <div className="logo">
          <img src="/images/logo.svg" style={{ width: 50 }} alt="" />
        </div>
        <NextLink href="/">
          <li>Home</li>
        </NextLink>
        <NextLink href="about">
          <li>
            <Link>About</Link>
          </li>
        </NextLink>
        {data?.getLoggedUser ? (
          <>
            <NextLink href="dashboard">
              <li>
                <Link>Dashboard</Link>
              </li>
            </NextLink>
            <Link
              isLoading={logoutfetching}
              onClick={() => {
                logout();
              }}
              style={{
                cursor: "pointer",
                padding: "10px 20px",
                background: "#edb183ff",
                borderRadius: 20,
                marginLeft: 30,
              }}
              variant="link"
            >
              Logout
            </Link>
          </>
        ) : (
          <>
            <NextLink href="login">
              <li>Login</li>
            </NextLink>
            <NextLink href="register">
              <li>Register</li>
            </NextLink>
          </>
        )}
      </ul>
    </div>
    // </div>
  );
};
