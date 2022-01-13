import { Form, Formik } from "formik";
import { withUrqlClient } from "next-urql";
import { useRouter } from "next/dist/client/router";
import React from "react";
import { InputField } from "../components/InputField";
import { Layout } from "../components/Layout";
import {
  useGetLoggedUserQuery,
  useRegisterMutation,
} from "../generated/graphql";
import { createUrqlClient } from "../utils/createUrqlClient";
import { isServer } from "../utils/isServer";
import { toErrorMap } from "../utils/toErrorMap";

interface registerProps {}

const Register: React.FC<registerProps> = ({}) => {
  const router = useRouter();

  const [userLogged] = useGetLoggedUserQuery({
    pause: isServer(),
  });

  if (userLogged.data?.getLoggedUser) {
    router.push("./");
  }

  const [, register] = useRegisterMutation();
  return (
    <Layout>
      <div className="register">
        <div className="user">
          <Formik
            initialValues={{ username: "", email: "", password: "" }}
            onSubmit={async (values, { setErrors }) => {
              console.log(values)
              const resp = await register({ optiuni: values });
              if (resp.data?.register.errors) {
                setErrors(toErrorMap(resp.data.register.errors));
              } else if (resp.data?.register.user) {
                router.push("/dashboard");
              }
            }}
          >
            <Form className="form">
              <header className="user__header">
                <img
                  src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/3219/logo.svg"
                  alt=""
                />
                <h1 className="user__title">Register</h1>
              </header>
              <div className="form__group">
                <InputField
                  name="username"
                  placeholder="username"
                  class="user-input"
                />
              </div>
              <div className="form__group">
                <InputField
                  name="email"
                  placeholder="email"
                  class="email-input"
                />
              </div>
              <div className="form__group">
                <InputField
                  name="password"
                  placeholder="password"
                  type="password"
                  class="pass-input"
                />
              </div>
              <button type="submit" className="btn">
                Register
              </button>
            </Form>
          </Formik>
        </div>
      </div>
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient)(Register);
