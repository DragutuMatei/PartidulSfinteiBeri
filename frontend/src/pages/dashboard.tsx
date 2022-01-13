import { Form, Formik } from "formik";
import { withUrqlClient } from "next-urql";
import React, { useEffect, useState } from "react";
import { InputField } from "../components/InputField";
import { Layout_Dash } from "../components/Layout_Dash";
import { Proiect } from "../components/Proiect";
import {
  useCreacteProiectMutation,
  useGetAllProiecteQuery,
  useGetLoggedUserQuery,
  useGetUserByIdQuery,
} from "../generated/graphql";
import { createUrqlClient } from "../utils/createUrqlClient";
import { isServer } from "../utils/isServer";

interface dashboardProps {}

const dashboard: React.FC<dashboardProps> = ({}) => {
  const [, createProiect] = useCreacteProiectMutation();
  const [{ data }] = useGetAllProiecteQuery();
  const [loggedUser] = useGetLoggedUserQuery({
    pause: isServer(),
  });
  const [sef] = useGetUserByIdQuery({
    variables: {
      id: loggedUser.data?.getLoggedUser?.id!,
    },
  });

  return (
    <Layout_Dash>
      <div className="projects-container">
        <div className="add-project">
          <Formik
            initialValues={{
              userId: "",
              numeleProiectului: "",
              sefId: "",
              email: "",
            }}
            onSubmit={async (e, { setErrors }) => {
              if (sef.data?.getUserByIdQ.id) {
                const ok = await createProiect({
                  values: {
                    numeleProiectului: e.numeleProiectului,
                    sefId: sef.data?.getUserByIdQ.id!,
                    userId: "",
                  },
                });

                if (!ok.error) {
                  alert("Project created");
                }
              } else {
                console.log("aia e");
              }
            }}
          >
            <Form>
              <div className="description">
                <h2>Add Project</h2>
                <InputField
                  name="numeleProiectului"
                  placeholder="Enter a description of the project"
                  textarea={true}
                />
              </div>
              <div className="user">
                <div className="email-check">
                  {/* <InputField name="email" placeholder="email" /> */}
                </div>
                <button type="submit" className="add">
                  Add project
                </button>
              </div>
            </Form>
          </Formik>
        </div>
        <div className="projects-list">
          {data?.getAllProiecte.map((pr) => (
            <Proiect pr={pr} />
          ))}
        </div>
      </div>
    </Layout_Dash>
  );
};

export default withUrqlClient(createUrqlClient)(dashboard);
