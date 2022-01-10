import React, { useState } from "react";
import { NextPage } from "next";
import { Wrapper } from "../../components/Wrapper";
import { Form, Formik } from "formik";
import { InputField } from "../../components/InputField";
import { Button } from "@chakra-ui/button";
import { useChangePasswordMutation } from "../../generated/graphql";
import router, { useRouter } from "next/dist/client/router";
import { toErrorMap } from "../../utils/toErrorMap";
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../../utils/createUrqlClient";
import { Link } from "@chakra-ui/layout";
import NextLink from "next/link";

const ChangePassword: NextPage<{ token: string }> = ({ token }) => {
  const [, changePassword] = useChangePasswordMutation();
  const router = useRouter();
  const [tokenError, setTokenError] = useState("");

  return (
    <>
      <Wrapper>
        <Formik
          initialValues={{ newPassword: "" }}
          onSubmit={async (values, { setErrors }) => {
            const resp = await changePassword({
              token,
              newPassword: values.newPassword,
            });

            if (resp.data?.changePassword.errors) {
              const errorMap = toErrorMap(resp.data.changePassword.errors);

              if ("token" in errorMap) {
                setTokenError(errorMap.token);
              }
              setErrors(errorMap);
            } else if (resp.data?.changePassword.user) {
              router.push("/");
            }
          }}
        >
          {({ isSubmitting }) => {
            return (
              <Form>
                <InputField
                  name="newPassword"
                  placeholder="newPassword"
                  label="newPassword"
                  type="password"
                />
                {tokenError && (
                  <>
                    {tokenError}
                    <br />
                    <br />
                    <NextLink href="/forget-password">
                      <Link>forgot password</Link>
                    </NextLink>
                    <br />
                    <br />
                    <br />
                  </>
                )}
                <Button type="submit" isLoading={isSubmitting}>
                  Change password
                </Button>
              </Form>
            );
          }}
        </Formik>
      </Wrapper>
    </>
  );
};

ChangePassword.getInitialProps = ({ query }) => {
  return {
    token: query.token as string,
  };
};

export default withUrqlClient(createUrqlClient)(ChangePassword);

// import React, { useState } from "react";
// import { NextPage } from "next";
// import { Wrapper } from "../../components/Wrapper";
// import { Form, Formik } from "formik";
// import { InputField } from "../../components/InputField";
// import { Button } from "@chakra-ui/button";
// import { useChangePasswordMutation } from "../../generated/graphql";
// import router, { useRouter } from "next/dist/client/router";
// import { toErrorMap } from "../../utils/toErrorMap";
// import { withUrqlClient } from "next-urql";
// import { createUrqlClient } from "../../utils/createUrqlClient";
// import { Link } from "@chakra-ui/layout";
// import NextLink from "next/link";

// // const ChangePassword: NextPage<{ token: string }> = ({ token }) => {
// const ChangePassword: NextPage<{ token: string }> = ({}) => {
//   const [, changePassword] = useChangePasswordMutation();
//   const router = useRouter();
//   const [tokenError, setTokenError] = useState("");

//   return (
//     <>
//       <Wrapper>
//         <Formik
//           initialValues={{ newPassword: "" }}
//           onSubmit={async (values, { setErrors }) => {
//             const resp = await changePassword({
//               newPassword: values.newPassword,
//               token: router.query.token === "string " ? router.query.token : "",
//             });

//             if (resp.data?.changePassword.errors) {
//               console.log(resp.data?.changePassword.errors);
//               const errorMap = toErrorMap(resp.data.changePassword.errors);

//               if ("token" in errorMap) {
//                 setTokenError(errorMap.token);
//               }
//               setErrors(errorMap);
//             } else if (resp.data?.changePassword.user) {
//               router.push("/");
//             }
//           }}
//         >
//           {({ isSubmitting }) => {
//             return (
//               <Form>
//                 <InputField
//                   name="newPassword"
//                   placeholder="newPassword"
//                   label="newPassword"
//                   type="password"
//                 />
//                 {tokenError && (
//                   <>
//                     {tokenError}
//                     <br />
//                     <br />
//                     <NextLink href="/forget-password">
//                       <Link>forgot password</Link>
//                     </NextLink>
//                     <br />
//                     <br />
//                     <br />
//                   </>
//                 )}
//                 <Button type="submit" isLoading={isSubmitting}>
//                   Change password
//                 </Button>
//               </Form>
//             );
//           }}
//         </Formik>
//       </Wrapper>
//     </>
//   );
// };

// // ChangePassword.getInitialProps = ({ query }) => {
// //   return {
// //     token: query.token as string,
// //   };
// // };

// export default withUrqlClient(createUrqlClient)(ChangePassword);
