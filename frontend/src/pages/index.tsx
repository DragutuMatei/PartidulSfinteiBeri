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
          <h1>NEVER STOP EXPLORING THE WORLD</h1>
          <h3>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do sunt
            in culpa qui officia deserunt mollit anim id est laborum.
          </h3>
          <button>Click me !</button>
        </div>
        <div className="slider">
          <div className="slider-cards">
            <div className="slider-card">
              <h1>ceva scris1</h1>
              <img src="/images/undraw_reminders_re_gtyb.svg" alt="" />
            </div>
            <div className="slider-card">
              <h1>ceva scris2</h1>
              <img src="/images/undraw_add_information_j2wg.svg" alt="" />
            </div>
            <div className="slider-card">
              <h1>ceva scris3</h1>
              <img src="/images/undraw_filter_re_sa16.svg" alt="" />
            </div>
            <div className="slider-card">
              <h1>ceva scris4</h1>
              <img src="/images/undraw_filter_re_sa16.svg" alt="" />
            </div>
            <div className="slider-card">
              <h1>ceva scris5</h1>
              <img src="/images/undraw_filter_re_sa16.svg" alt="" />
            </div>
            <div className="slider-card">
              <h1>ceva scris6</h1>
              <img src="/images/undraw_filter_re_sa16.svg" alt="" />
            </div>
            <div className="slider-card">
              <h1>ceva scris7</h1>
              <img src="/images/undraw_filter_re_sa16.svg" alt="" />
            </div>
            <div className="slider-card">
              <h1>ceva scris8</h1>
              <img src="/images/undraw_filter_re_sa16.svg" alt="" />
            </div>
            <div className="slider-card">
              <h1>ceva scris9</h1>
              <img src="/images/undraw_filter_re_sa16.svg" alt="" />
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
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolorem
              facilis laboriosam, ipsa sint soluta non dicta reprehenderit quos
              voluptates blanditiis. Ab cupiditate, quia voluptates aperiam
              ipsum placeat animi quas aspernatur!
            </p>
            <p>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolorem
              facilis laboriosam, ipsa sint soluta non dicta reprehenderit quos
              voluptates blanditiis. Ab cupiditate, quia voluptates aperiam
              ipsum placeat animi quas aspernatur!
            </p>
            <p>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolorem
              facilis laboriosam, ipsa sint soluta non dicta reprehenderit quos
              voluptates blanditiis. Ab cupiditate, quia voluptates aperiam
              ipsum placeat animi quas aspernatur!
            </p>
          </div>
        </div>
        <div className="section">
          <div className="left">
            <p>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolorem
              facilis laboriosam, ipsa sint soluta non dicta reprehenderit quos
              voluptates blanditiis. Ab cupiditate, quia voluptates aperiam
              ipsum placeat animi quas aspernatur!
            </p>
            <p>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolorem
              facilis laboriosam, ipsa sint soluta non dicta reprehenderit quos
              voluptates blanditiis. Ab cupiditate, quia voluptates aperiam
              ipsum placeat animi quas aspernatur!
            </p>
            <p>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolorem
              facilis laboriosam, ipsa sint soluta non dicta reprehenderit quos
              voluptates blanditiis. Ab cupiditate, quia voluptates aperiam
              ipsum placeat animi quas aspernatur!
            </p>
          </div>
          <div className="right">
            <img src="/images/undraw_pair_programming_re_or4x.svg" alt="" />
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default withUrqlClient(createUrqlClient)(Index);
