import { Button, Select } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { withUrqlClient } from "next-urql";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { InputField } from "../components/InputField";
import { Layout_Dash } from "../components/Layout_Dash";
import {
  useAddSedintaMutation,
  useGetAllProiecteQuery,
  useGetLoggedUserQuery,
  useGetSedinteQuery,
} from "../generated/graphql";
import { createUrqlClient } from "../utils/createUrqlClient";
import { isServer } from "../utils/isServer";

interface meetingsProps {}

const meetings: React.FC<meetingsProps> = ({}) => {
  const [{ data }] = useGetAllProiecteQuery();
  const [loggedUser] = useGetLoggedUserQuery({ pause: isServer() });
  const [, addMeeting] = useAddSedintaMutation();
  const [id, setId] = useState<string>();
  const [sedinte] = useGetSedinteQuery();
  const router = useRouter();
  if (!loggedUser.data?.getLoggedUser) {
    router.push("./login");
  }

  return (
    <Layout_Dash>
      <div className="meetings">
        <div className="meeting-add">
          <Formik
            initialValues={{ topic: "", data: "", proiectId: "", userId: 0 }}
            onSubmit={async (e) => {
              const rez = await addMeeting({
                values: {
                  userId: loggedUser.data?.getLoggedUser?.id!,
                  topic: e.topic,
                  proiectId: id!,
                  data: e.data.toString(),
                },
              });

              if (!rez.error) {
                alert("Meeting added");
              }
            }}
          >
            <Form style={{ margin: 0 }}>
              <InputField
                name="topic"
                placeholder="Write a topic of the meeting"
                textarea={true}
              />
              <InputField
                name="data"
                placeholder="Enter a date for the meeting"
                type="datetime-local"
              />
              <Select
                placeholder="enter a project"
                name="proiectId"
                onChange={(e) => {
                  setId(e.target.value);
                }}
              >
                {data?.getAllProiecte.map((pr) => {
                  return (
                    <option value={pr.numeleProiectului}>
                      {pr.numeleProiectului.slice(0, 30)}
                    </option>
                  );
                })}
              </Select>
              <Button
                style={{
                  cursor: "pointer",
                  margin: "20px 0",
                  padding: "20px 15px",
                }}
                type="submit"
              >
                ADD MEETING
              </Button>
            </Form>
          </Formik>
        </div>
        <div className="meeting-list">
          {sedinte.data?.getSedinte.map((sedinta) => {
            const month = [
              "January",
              "February",
              "March",
              "April",
              "May",
              "June",
              "July",
              "August",
              "September",
              "October",
              "November",
              "December",
            ];

            const deadline = new Date(sedinta.data);

            console.log(sedinta.data);

            return (
              <div className="meeting">
                <h3>{sedinta.topic}</h3>
                <div className="meeting-list-content">
                  <h4>{sedinta.proiectId.slice(0, 50)}</h4>
                  <span>
                    This meeting is at{" "}
                    {
                      //ziua
                      deadline.getDate()
                    }
                    {"-"}
                    {month[deadline.getMonth()]}
                    {"-"}
                    {deadline.getFullYear()}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Layout_Dash>
  );
};

export default withUrqlClient(createUrqlClient)(meetings);
