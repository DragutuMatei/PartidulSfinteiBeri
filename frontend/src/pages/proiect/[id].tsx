import { Select } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { NextPage } from "next";
import { withUrqlClient } from "next-urql";
import { useState } from "react";
import { InputField } from "../../components/InputField";
import { Layout_Dash } from "../../components/Layout_Dash";
import {
  useGetTaskByProiectQuery,
  useAddTaskMutation,
  useReturnUserEmailMutation,
  useAddUserMutation,
  useGetAProiectByIdQuery,
  useGetLoggedUserQuery,
  useGetSomeUsersQuery,
  useAddPointsMutation,
} from "../../generated/graphql";
import { createUrqlClient } from "../../utils/createUrqlClient";
import { isServer } from "../../utils/isServer";
const style = {
  width: "20px",
  height: "20px",
  background: "#ccc",
  borderRadius: "50%",
  cursor: "pointer",
  display: "flex",
};
const Proiect: NextPage<{ id: string }> = ({ id }) => {
  const [{ data }] = useGetAProiectByIdQuery({
    variables: { id: parseInt(id) },
  });

  const [userId, setId] = useState("");

  const [tasks] = useGetTaskByProiectQuery({
    variables: {
      proiectId: parseInt(id),
    },
  });

  const [userLogged] = useGetLoggedUserQuery({
    pause: isServer(),
  });

  const [, addUser] = useAddUserMutation();
  const [, addTask] = useAddTaskMutation();

  const [, userEmail] = useReturnUserEmailMutation();

  const [datas] = useGetSomeUsersQuery({
    variables: { ids: data?.getAProiectById.userId! },
  });

  const [, addPoints] = useAddPointsMutation();

  const addPunctaj = async (punctaj: number, taskId: number) => {
    await addPoints({
      points: punctaj,
      taskId: taskId,
    });
  };

  return (
    <>
      <Layout_Dash>
        <div className="project-containerr">
          <div className="project-descriptionn">
            <p>{data?.getAProiectById.numeleProiectului}</p>
          </div>

          <h1>add task</h1>
          <Formik
            initialValues={{ deadline: "", userId: "", task: "" }}
            onSubmit={async (e, { setErrors }) => {
              console.log({
                proiectId: data?.getAProiectById.id!,
                task: e.task,
                sefId: userLogged.data?.getLoggedUser?.id!,
                deadline: e.deadline.toString(),
                userId: e.userId,
                alty: userId,
              });

              const rez = await addTask({
                values: {
                  proiectId: data?.getAProiectById.id!,
                  task: e.task,
                  sefId: userLogged.data?.getLoggedUser?.id!,
                  deadline: e.deadline.toString(),
                  userId: parseInt(userId),
                },
              });
              console.log(rez);
            }}
          >
            <Form>
              <div className="task-descriptionn">
                <InputField
                  name="deadline"
                  placeholder="asd"
                  type="datetime-local"
                />
                <InputField textarea={true} name="task" placeholder="task" />
              </div>

              {/* <InputField
                select={true}
                name="userId"
                placeholder="select"
                arr={datas.data?.getSomeUsers}
              /> */}
              <Select
                name="userId"
                placeholder="select"
                onChange={(e) => {
                  console.log(e.target.value);
                  setId(e.target.value);
                }}
              >
                {datas.data?.getSomeUsers.map((a) => {
                  return <option value={a.id}>{a.email}</option>;
                })}
              </Select>
              <button type="submit" id="checkk">
                Add task
              </button>
            </Form>
          </Formik>

          <hr />
          <Formik
            initialValues={{ email: "" }}
            onSubmit={async (e, { setErrors }) => {
              console.log(e);
              const rez = await userEmail({ email: e.email });

              console.log(rez);

              const rezs = await addUser({
                idUserAdd: rez.data?.getUserByEmail.id!,
                proiectId: data?.getAProiectById.id!,
              });

              if (rezs.error) {
                setErrors({ email: "nu exista emailul acesta" });
              }
            }}
          >
            <Form>
              <InputField name="email" placeholder="email" type="email" />
              <button type="submit" id="checkk">
                add user
              </button>
            </Form>
          </Formik>

          <div className="task-container">
            {tasks.data?.getTaskByProiect.map((task) => {
              return (
                <div className="task">
                  <div className="taskk">
                    <img src="/images/img1.png" alt="task logo" />
                    <h3 className="task-descriptionn">{}</h3>
                    <span>{task.finish ? "finished" : "in progress"}</span>
                  </div>
                  <p>{task.task}</p>
                  <div className="rating">
                    {task.points ? (
                      <>{task.points}</>
                    ) : (
                      <>
                        <div
                          onClick={() => {
                            addPunctaj(1, task.id);
                          }}
                          className="nota"
                          style={style}
                        >
                          1
                        </div>
                        <div
                          onClick={() => {
                            addPunctaj(2, task.id);
                          }}
                          className="nota"
                          style={style}
                        >
                          2
                        </div>
                        <div
                          onClick={() => {
                            addPunctaj(3, task.id);
                          }}
                          className="nota"
                          style={style}
                        >
                          3
                        </div>
                        <div
                          onClick={() => {
                            addPunctaj(4, task.id);
                          }}
                          className="nota"
                          style={style}
                        >
                          4
                        </div>
                        <div
                          onClick={() => {
                            addPunctaj(5, task.id);
                          }}
                          className="nota"
                          style={style}
                        >
                          5
                        </div>
                      </>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </Layout_Dash>
    </>
  );
};

Proiect.getInitialProps = ({ query }) => {
  return {
    id: query.id as string,
  };
};

export default withUrqlClient(createUrqlClient)(Proiect);
