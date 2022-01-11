import { Box, Flex, Link } from "@chakra-ui/layout";
import React from "react";
import NextLink from "next/link";
import { useGetLoggedUserQuery, useLogoutMutation } from "../generated/graphql";
import { Button } from "@chakra-ui/button";
import { isServer } from "../utils/isServer";
interface Navbar_DashProps {}

export const Navbar_Dash: React.FC<Navbar_DashProps> = ({}) => {
  const [{ fetching: logoutfetching }, logout] = useLogoutMutation();

  return (
    <div className="navbar-dash-container">
      <ul>
        <li className="profile">
          <img src="/images/img1.png" alt="user-img" />
          <div className="user-email">
            <h3 className="username">marian</h3>
            <h5 className="email">marian01@gmail.com</h5>
          </div>
        </li>
        <NextLink href="/">
          <li>Home</li>
        </NextLink>
        <NextLink href="dashboard">
          <li>Projects</li>
        </NextLink>
        <NextLink href="deadline">
          <li>Deadline</li>
        </NextLink>
        <NextLink href="meetings">
          <li>Meetings</li>
        </NextLink>
      </ul>
    </div>
  );
};
