import { Box, Button, Link } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { withUrqlClient } from "next-urql";
import { useRouter } from "next/dist/client/router";
import React, { useEffect } from "react";
import { InputField } from "../components/InputField";
import { Navbar } from "../components/Navbar";
import { Wrapper } from "../components/Wrapper";
import { useGetLoggedUserQuery, useLoginMutation } from "../generated/graphql";
import { createUrqlClient } from "../utils/createUrqlClient";
import { toErrorMap } from "../utils/toErrorMap";
import NextLink from "next/link";
import { Layout } from "../components/Layout";
import { route } from "next/dist/server/router";

const Login: React.FC<{}> = ({}) => {
  const router = useRouter();
  const [, login] = useLoginMutation();

  return (
    <Layout>
      <div style={{ top: 100, position: "relative" }}>
        <Formik
          initialValues={{ usernameOrEmail: "", password: "" }}
          onSubmit={async (values, { setErrors }) => {
            const resp = await login(values);
            if (resp.data?.login.errors) {
              setErrors(toErrorMap(resp.data.login.errors));
            } else if (resp.data?.login.user) {
              if (typeof router.query.next === "string") {
                router.push(router.query.next);
                console.log(1);
              } else {
                router.back();
              }
            } else {
              console.log(3);
              router.push("/");
            }
          }}
        >
          {({ isSubmitting }) => {
            return (
              <Form>
                <InputField
                  name="usernameOrEmail"
                  placeholder=""
                  label="username / email"
                  class="user-input"
                />
                <InputField
                  name="password"
                  placeholder=""
                  label="password"
                  type="password"
                  class="pass-input"
                /> 
                <br />
                <Button type="submit" isLoading={isSubmitting} id="login">
                  Login
                </Button>
              </Form>
            );
          }}
        </Formik>
      </div>
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient)(Login);
