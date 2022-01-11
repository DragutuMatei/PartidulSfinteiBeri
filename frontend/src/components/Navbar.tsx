import { Box, Flex, Link } from "@chakra-ui/layout";
import React from "react";
import NextLink from "next/link";
import { useGetLoggedUserQuery, useLogoutMutation } from "../generated/graphql";
import { Button } from "@chakra-ui/button";
import { isServer } from "../utils/isServer";
interface NavbarProps {}

export const Navbar: React.FC<NavbarProps> = ({}) => {
  const [{ fetching: logoutfetching }, logout] = useLogoutMutation();
  const [{ data, fetching }] = useGetLoggedUserQuery({
    pause: isServer(),
  });

  let body = null;
  if (fetching) {
    body = (
      <>
        <h1>Loading</h1>
      </>
    );
  } else if (!data?.getLoggedUser) {
    body = (
      <>
        <NextLink href="login">
          <Link color="white" mr={4}>
            Login
          </Link>
        </NextLink>
        <NextLink href="register">
          <Link color="white" mr={4}>
            Register
          </Link>
        </NextLink>
      </>
    );
  } else {
    body = (
      <Box>
        <NextLink href="/">
          <Link color="white" mr={4}>
            {data.getLoggedUser.username}
          </Link>
        </NextLink>
        <Button
          isLoading={logoutfetching}
          onClick={() => {
            logout();
          }}
          variant="link"
        >
          Logout
        </Button>
      </Box>
    );
  }

  return (
    <div className="navbar_container">
    <div className="navbar">
      <ul>
        <span>INSERT LOGO HERE</span>
        <NextLink href="/">
        <li>Home</li>
        </NextLink>
        <NextLink href="about">
        <li>
          <Link>
            About
          </Link>
        </li>
        </NextLink>
        <NextLink href="login">
        <li>Login</li>
        </NextLink>
        <NextLink href="register">
        <li>Register</li>
        </NextLink>
        <NextLink href="dashboard">
          <li>
            <Link>
              Dashboard
            </Link>
          </li>
        </NextLink>
      </ul>
    </div>
    </div>
  );
};


