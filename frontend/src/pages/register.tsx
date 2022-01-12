import { Button } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { withUrqlClient } from "next-urql";
import { useRouter } from "next/dist/client/router";
import React from "react";
import { InputField } from "../components/InputField";
import { Layout } from "../components/Layout";
import { Wrapper } from "../components/Wrapper";
import { useRegisterMutation } from "../generated/graphql";
import { createUrqlClient } from "../utils/createUrqlClient";
import { toErrorMap } from "../utils/toErrorMap";

interface registerProps {}

const Register: React.FC<registerProps> = ({}) => {
  const router = useRouter();
  const [, register] = useRegisterMutation();
  return (
    <Layout>
      <Wrapper>
        <Formik
          initialValues={{ username: "", email: "", password: "" }}
          onSubmit={async (values, { setErrors }) => {
            const resp = await register({ optiuni: values });
            if (resp.data?.register.errors) {
              setErrors(toErrorMap(resp.data.register.errors));
            } else if (resp.data?.register.user) {
              router.push("/");
            }
          }}
        >
          {({ isSubmitting }) => {
            return (
              <Form>
                <InputField
                  name="username"
                  placeholder=""
                  label="username"
                  class="user-input"
                />
                <InputField
                  name="email"
                  placeholder=""
                  label="email"
                  class="email-input"
                />
                <InputField
                  name="password"
                  placeholder=""
                  label="password"
                  type="password"
                  class="pass-input"
                />
                <Button type="submit" isLoading={isSubmitting} id="register">
                  Register
                </Button>
              </Form>
            );
          }}
        </Formik>
      </Wrapper>
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient)(Register);
