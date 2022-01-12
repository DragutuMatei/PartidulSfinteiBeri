import { Box, Flex, Heading, Link, Stack, Text } from "@chakra-ui/layout";
import { withUrqlClient } from "next-urql";
import React, { useEffect, useState } from "react";
import { Layout } from "../components/Layout";
import { createUrqlClient } from "../utils/createUrqlClient";
import NextLink from "next/link";
import { ChevronDownIcon, ChevronUpIcon } from "@chakra-ui/icons";
import { IconButton } from "@chakra-ui/react";
var i = 0;
function Index() {
  const prev = () => {
    const elem = document.querySelector(".slider-cards") as HTMLAnchorElement;
    i--;
    elem.style.left = 255 * -i + "px";
  };

  const next = () => {
    const elem = document.querySelector(".slider-cards") as HTMLAnchorElement;
    i++;
    let l = i == 1 ? 270 : 260;
    elem.style.left = l * -i + "px";
  };

  return (
    <Layout>
      <div className="components">
        <div className="container">
          <h1><cite><q>The key is not to spend time, but to invest it.</q></cite></h1>
          <h3>
          – Stephen R. Covey.
          </h3>
          <button>Click me !</button>
        </div>
        <div className="slider">
          <div className="slider-cards">
            <div className="slider-card">
              <h3>Stay organised and connected.We have the tools!</h3>
              <img src="/images/svg_1.svg" alt="" />
            </div>
            <div className="slider-card">
              <h3>You can track in real time the tasks that are uploaded</h3>
              <img src="/images/svg_2.svg" alt="" />
            </div>
            <div className="slider-card">
              <h3>Time now can be by your side even more by adding a deadline to a task you added!</h3>
              <img src="/images/svg_3.svg" alt="" />
            </div>
            <div className="slider-card">
              <h3>Monitor individual progress and overall progress.</h3>
              <img src="/images/svg_4.svg" alt="" />
            </div>
            <div className="slider-card">
              <h3>Have meetings with your coolegues.</h3>
              <img src="/images/svg_5.svg" alt="" />
            </div>
            <div className="slider-card">
              <h3>With our modern but simple layout you can use our features with ease.</h3>
              <img src="/images/svg_6.svg" alt="" />
            </div>
          </div>
          <div className="buttons">
            <button
              className="slider-btn-left"
              onClick={() => {
                prev();
              }}
            >
              Prev
            </button>
            <button
              className="slider-btn-right"
              onClick={() => {
                next();
              }}
            >
              Next
            </button>
          </div>
        </div>
      </div>
      <div className="texte">
        <div className="section">
          <div className="left">
            <img src="/images/undraw_pair_programming_re_or4x.svg" alt="" />
          </div>
          <div className="right">
            <p>
            Unlike other apps like it,our web application is not going as in depth to be unique. Instead of adding thing after thing it goes the other way around and is unique in its simplicity. We aim for everyone to be able to easily make a team and start working right away.
Monitor individual progress and overall progress. An archive with every file you've sent. Anouncments page for everyone in the team.
            </p>
          </div>
        </div>
        <div className="section">
          <div className="left">
            <p>
            StateDate is a very simple time and resource managment web application. It aims to help people who want a straight forward and simple place to organize a project find a way to materialize their plans.
            </p>
          </div>
          <div className="right">
            <img src="/images/undraw_knowledge_re_leit.svg" alt="" />
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default withUrqlClient(createUrqlClient)(Index);
