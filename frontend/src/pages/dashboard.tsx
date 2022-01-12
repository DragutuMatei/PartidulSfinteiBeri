import { Form, Formik } from "formik";
import { withUrqlClient } from "next-urql";
import React, { useState } from "react";
import { InputField } from "../components/InputField";
import { Layout_Dash } from "../components/Layout_Dash";
import { Proiect } from "../components/Proiect";
import {
  useCreacteProiectMutation,
  useGetAllProiecteQuery,
  useGetUserByEmailQuery,
  useGetUserByIdQuery,
} from "../generated/graphql";
import { createUrqlClient } from "../utils/createUrqlClient";

interface dashboardProps {}

const dashboard: React.FC<dashboardProps> = ({}) => {
  const [, createProiect] = useCreacteProiectMutation();
  const [{ data }] = useGetAllProiecteQuery();
  const [] = useState("");
  return (
    <Layout_Dash>
      <div className="projects-container">
        <div className="add-project">
          <Formik
            onSubmit={async (e, { setErrors }) => {
              const [user] = useGetUserByEmailQuery({
                variables: {
                  email: e.email,
                },
              });
              if (user) {
                
              } else {
                
              }

              console.log(e);
            }}
            initialValues={{
              userId: "",
              numeleProiectului: "",
              sefId: "",
              email: "",
            }}
          >
            <Form>
              <div className="description">
                <InputField
                  name="numeleProiectului"
                  placeholder="numele proiectului"
                  textarea={true}
                  class="numeleProiectului"
                />
              </div>
              <div className="user">
                <div className="email-check">
                  <InputField name="email" placeholder="email" />
                </div>
                <button type="submit" className="add">
                  Add project
                </button>
              </div>
            </Form>
          </Formik>
        </div>
        <hr className="between" />
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
