import { Box, Button, Link } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { initUrqlClient, withUrqlClient } from "next-urql";
import router, { useRouter } from "next/dist/client/router";
import React, { useState } from "react";
import { InputField } from "../components/InputField";
import { Wrapper } from "../components/Wrapper";
import { createUrqlClient } from "../utils/createUrqlClient";
import { toErrorMap } from "../utils/toErrorMap";
import NextLink from "next/link";
import { useForgotPasswordMutation } from "../generated/graphql";
import { Layout } from "../components/Layout";

const forgetPassword: React.FC<{}> = ({}) => {
  const [, forgotPassword] = useForgotPasswordMutation();
  const [complete, setComplete] = useState(false);

  return (
    <Layout>
      <Wrapper>
        <Formik
          initialValues={{ email: "" }}
          onSubmit={async (values) => {
            const resp = await forgotPassword(values);
            setComplete(true);
          }}
        >
          {({ isSubmitting }) =>
            complete ? (
              <Box>plm nush ce trb sa scriu </Box>
            ) : (
              <Form>
                <InputField name="email" placeholder="email" label="email" />
                <br />
                <br />
                <Button type="submit" isLoading={isSubmitting}>
                  send email
                </Button>
              </Form>
            )
          }
        </Formik>
      </Wrapper>
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient)(forgetPassword);
