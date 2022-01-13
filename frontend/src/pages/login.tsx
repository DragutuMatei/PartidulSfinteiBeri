import { Form, Formik } from "formik";
import { withUrqlClient } from "next-urql";
import { useRouter } from "next/dist/client/router";
import React, { useEffect } from "react";
import { InputField } from "../components/InputField";
import { Layout } from "../components/Layout";
import { useGetLoggedUserQuery, useLoginMutation } from "../generated/graphql";
import { createUrqlClient } from "../utils/createUrqlClient";
import { isServer } from "../utils/isServer";
import { toErrorMap } from "../utils/toErrorMap";

const Login: React.FC<{}> = ({}) => {
  const router = useRouter();
  const [, login] = useLoginMutation();

  const [userLogged] = useGetLoggedUserQuery({
    pause: isServer(),
  });

  if (userLogged.data?.getLoggedUser) {
    router.push("./");
  }

  return (
    <Layout>
      <div className="register">
        <div className="user">
          <Formik
            initialValues={{ usernameOrEmail: "", password: "" }}
            onSubmit={async (values, { setErrors }) => {
              const resp = await login(values);
              if (resp.data?.login.errors) {
                setErrors(toErrorMap(resp.data.login.errors));
              } else if (resp.data?.login.user) {
                router.push("/dashboard");
              } else {
                router.push("/");
              }
            }}
          >
            <Form className="form">
              <header className="user__header">
                <img
                  src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/3219/logo.svg"
                  alt=""
                />
                <h1 className="user__title">Login</h1>
              </header>
              <div className="form__group">
                <InputField
                  name="usernameOrEmail"
                  placeholder="username / email"
                  className="form__input"
                />
              </div>
              <div className="form__group">
                <InputField
                  name="password"
                  placeholder="password"
                  type="password"
                  className="form__input"
                />
              </div>
              <button type="submit" className="btn">
                Login
              </button>
            </Form>
          </Formik>
        </div>
      </div>

      {/* <div style={{ top: 100, position: "relative" }}>
    
          {({ isSubmitting }) => {
            return (
              <Form className="login">
                <div className="user-field">
                  <FontAwesomeIcon icon={faUser} id="user-icon" />
                  <InputField
                    name="usernameOrEmail"
                    placeholder="username / email"
                    className="user-input"
                  />
                </div>
                <div className="password-field">
                  <FontAwesomeIcon icon={faKey} id="pass-icon" />
                  <InputField
                    name="password"
                    placeholder="password"
                    type="password"
                    className="pass-input"
                  />
                </div>
                <br />
                <Button type="submit" isLoading={isSubmitting} id="login">
                  Login
                </Button>
              </Form>
            );
          }}
        </Formik>
      </div> */}
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient)(Login);
