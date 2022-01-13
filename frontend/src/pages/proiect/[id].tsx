import { Select } from "@chakra-ui/react";
import {
  faTimesCircle,
  faCheckCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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
  useDeleteTaskMutation,
  useFinishTaskMutation,
} from "../../generated/graphql";
import { createUrqlClient } from "../../utils/createUrqlClient";
import { isServer } from "../../utils/isServer";
const style = {
  borderRadius: "50%",
  cursor: "pointer",
};
const Proiect: NextPage<{ id: string }> = ({ id }) => {
  const [{ data }] = useGetAProiectByIdQuery({
    variables: { id: parseInt(id) },
  });

  const [userId, setId] = useState("");

  const [, finish] = useFinishTaskMutation();

  const [tasks] = useGetTaskByProiectQuery({
    variables: {
      proiectId: parseInt(id),
    },
  });

  const [userLogged] = useGetLoggedUserQuery({
    pause: isServer(),
  });

  const [, deleteTask] = useDeleteTaskMutation();

  const [, addUser] = useAddUserMutation();
  const [, addTask] = useAddTaskMutation();

  const [, userEmail] = useReturnUserEmailMutation();

  const [datas] = useGetSomeUsersQuery({
    variables: { ids: data?.getAProiectById.userId! },
  });

  const [, addPoints] = useAddPointsMutation();

  const addPunctaj = async (punctaj: number, taskId: number) => {
    const rez = await addPoints({
      points: punctaj,
      taskId: taskId,
    });

    if (rez.error) {
      alert("Error occurred");
    } else {
      alert("Task rated");
    }
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
                alty: userId.split(",")[0],
              });

              const rez = await addTask({
                values: {
                  proiectId: data?.getAProiectById.id!,
                  task: e.task,
                  sefId: userLogged.data?.getLoggedUser?.id!,
                  deadline: e.deadline.toString(),
                  userId: parseInt(userId.split(",")[0]),
                  userName: userId.split(",")[1],
                },
              });
              if (rez.error) {
                alert("Error occurred");
              } else {
                alert("Task added");
              }
            }}
          >
            <Form
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-around",
                alignItems: "flex-start",
              }}
            >
              <div className="task-descriptionn">
                <InputField
                  name="deadline"
                  placeholder="asd"
                  type="datetime-local"
                />
                <InputField
                  textarea={true}
                  name="task"
                  placeholder="Write the desription of the task"
                />

                <Select
                  name="userId"
                  placeholder="select an user to do this task"
                  onChange={(e) => {
                    console.log(e.target.value);
                    setId(e.target.value);
                  }}
                >
                  {datas.data?.getSomeUsers.map((a) => {
                    return (
                      <option value={a.id + "," + a.username}>{a.email}</option>
                    );
                  })}
                </Select>
              </div>

              <button type="submit" id="checkk">
                Add task
              </button>
            </Form>
          </Formik>

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
              } else {
                alert("User aded");
              }
            }}
          >
            <Form
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-around",
                alignItems: "flex-start",
                marginTop: "10px",
              }}
            >
              <h2 className="h2">Add user to this project</h2>
              <InputField name="email" placeholder="email" type="email" />
              <button type="submit" id="checkk">
                add user
              </button>
            </Form>
          </Formik>

          <div className="task-container">
            {tasks.data?.getTaskByProiect.map((task) => {
              console.log(task.id);
              return (
                <div className="task">
                  <div className="taskk">
                    <div className="top">
                      <img src="/images/img1.png" alt="task logo" />
                      <h3>{task.userName}</h3>
                    </div>
                    <div className="down">
                      <FontAwesomeIcon
                        icon={faTimesCircle}
                        onClick={async () => {
                          const rez = await deleteTask({ taskId: task.id });
                          if (rez.data?.deleteTask) {
                            alert("Task deleted");
                          } else {
                            alert("Task deleted fail");
                          }
                        }}
                        style={{ padding: "5px", fontSize: "40px" }}
                      />
                      <h3>{task.finish ? "finished" : "in progress"}</h3>
                      <FontAwesomeIcon
                        icon={faCheckCircle}
                        onClick={async () => {
                          const rez = await finish({ taskId: task.id });
                          if (!rez.error) {
                            alert("Task finished");
                          } else {
                            alert("Error occured");
                          }
                        }}
                        style={{ padding: "5px", fontSize: "40px" }}
                      />
                    </div>
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
