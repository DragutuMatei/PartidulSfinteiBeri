import { withUrqlClient } from "next-urql";
import { useRouter } from "next/router";
import React from "react";
import { Layout_Dash } from "../components/Layout_Dash";
import { useGetLoggedUserQuery, useGetTasksQuery } from "../generated/graphql";
import { createUrqlClient } from "../utils/createUrqlClient";
import { isServer } from "../utils/isServer";

interface deadlineProps {}

const deadline: React.FC<deadlineProps> = ({}) => {
  const [{ data }] = useGetTasksQuery();

  const router = useRouter();
  const [userLogged] = useGetLoggedUserQuery({
    pause: isServer(),
  });

  if (!userLogged.data?.getLoggedUser) {
    router.push("./login");
  }
  return (
    <Layout_Dash>
      <div className="deadlines">
        {data?.getTasks.map((task) => {
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

          const deadline = new Date(task.deadline);
          console.log(task.deadline);

          return (
            <div className="deadline">
              <h1>{task.finish ? "finished" : "in progress"}</h1>
              <h1>{task.userName}</h1>
              <h2>due to {" "}
                {
                  //ziua
                  deadline.getDate()
                }
                {"-"}
                {month[deadline.getMonth()]}
                {"-"}
                {deadline.getFullYear()}
              </h2>
              <h2>{task.points ? "Rate: " + task.points : "Not rated"}</h2>
              <p>{task.task}</p>
            </div>
          );
        })}
        {/* <div className="project-displayed">
          <h3>
            descrierea proiectuluidescrierea proiectuluidescrierea
            proiectuluidescrierea proiectuluidescrierea proiectuluidescrierea
            proiectuluidescrierea proiectuluidescrierea proiectuluidescrierea
            proiectuluidescrierea proiectuluidescrierea proiectuluidescrierea
            proiectuluidescrierea proiectuluidescrierea proiectuluidescrierea
            proiectuluidescrierea proiectuluidescrierea proiectuluidescrierea
            proiectuluidescrierea proiectuluidescrierea proiectuluidescrierea
            proiectuluidescrierea proiectuluidescrierea proiectuluidescrierea
            proiectuluidescrierea proiectuluidescrierea proiectuluidescrierea
            proiectuluidescrierea proiectului
          </h3>
          <div className="taskk">
            <h5>
              descrierea taskuluidescrierea taskuluidescrierea
              taskuluidescrierea taskuluidescrierea taskuluidescrierea
              taskuluidescrierea taskuluidescrierea taskuluidescrierea
              taskuluidescrierea taskuluidescrierea taskuluidescrierea
              taskuluidescrierea taskuluidescrierea taskului
            </h5>
            <span>finished/in progress</span>
          </div>
          <button>Deadline pe 25august</button>
        </div>
        <div className="project-displayed">
          <h3>
            descrierea proiectuluidescrierea proiectuluidescrierea
            proiectuluidescrierea proiectuluidescrierea proiectuluidescrierea
            proiectuluidescrierea proiectuluidescrierea proiectuluidescrierea
            proiectuluidescrierea proiectuluidescrierea proiectuluidescrierea
            proiectuluidescrierea proiectuluidescrierea proiectuluidescrierea
            proiectuluidescrierea proiectuluidescrierea proiectuluidescrierea
            proiectuluidescrierea proiectuluidescrierea proiectuluidescrierea
            proiectuluidescrierea proiectuluidescrierea proiectuluidescrierea
            proiectuluidescrierea proiectuluidescrierea proiectuluidescrierea
            proiectuluidescrierea proiectului
          </h3>
          <div className="taskk">
            <h5>
              descrierea taskuluidescrierea taskuluidescrierea
              taskuluidescrierea taskuluidescrierea taskuluidescrierea
              taskuluidescrierea taskuluidescrierea taskuluidescrierea
              taskuluidescrierea taskuluidescrierea taskuluidescrierea
              taskuluidescrierea taskuluidescrierea taskului
            </h5>
            <span>finished/in progress</span>
          </div>
          <button>Deadline pe 25august</button>
        </div>
        <div className="project-displayed">
          <h3>
            descrierea proiectuluidescrierea proiectuluidescrierea
            proiectuluidescrierea proiectuluidescrierea proiectuluidescrierea
            proiectuluidescrierea proiectuluidescrierea proiectuluidescrierea
            proiectuluidescrierea proiectuluidescrierea proiectuluidescrierea
            proiectuluidescrierea proiectuluidescrierea proiectuluidescrierea
            proiectuluidescrierea proiectuluidescrierea proiectuluidescrierea
            proiectuluidescrierea proiectuluidescrierea proiectuluidescrierea
            proiectuluidescrierea proiectuluidescrierea proiectuluidescrierea
            proiectuluidescrierea proiectuluidescrierea proiectuluidescrierea
            proiectuluidescrierea proiectului
          </h3>
          <div className="taskk">
            <h5>
              descrierea taskuluidescrierea taskuluidescrierea
              taskuluidescrierea taskuluidescrierea taskuluidescrierea
              taskuluidescrierea taskuluidescrierea taskuluidescrierea
              taskuluidescrierea taskuluidescrierea taskuluidescrierea
              taskuluidescrierea taskuluidescrierea taskului
            </h5>
            <span>finished/in progress</span>
          </div>
          <button>Deadline pe 25august</button>
        </div>
        <div className="project-displayed">
          <h3>
            descrierea proiectuluidescrierea proiectuluidescrierea
            proiectuluidescrierea proiectuluidescrierea proiectuluidescrierea
            proiectuluidescrierea proiectuluidescrierea proiectuluidescrierea
            proiectuluidescrierea proiectuluidescrierea proiectuluidescrierea
            proiectuluidescrierea proiectuluidescrierea proiectuluidescrierea
            proiectuluidescrierea proiectuluidescrierea proiectuluidescrierea
            proiectuluidescrierea proiectuluidescrierea proiectuluidescrierea
            proiectuluidescrierea proiectuluidescrierea proiectuluidescrierea
            proiectuluidescrierea proiectuluidescrierea proiectuluidescrierea
            proiectuluidescrierea proiectului
          </h3>
          <div className="taskk">
            <h5>
              descrierea taskuluidescrierea taskuluidescrierea
              taskuluidescrierea taskuluidescrierea taskuluidescrierea
              taskuluidescrierea taskuluidescrierea taskuluidescrierea
              taskuluidescrierea taskuluidescrierea taskuluidescrierea
              taskuluidescrierea taskuluidescrierea taskului
            </h5>
            <span>finished/in progress</span>
          </div>
          <button>Deadline pe 25august</button>
        </div> */}
      </div>
    </Layout_Dash>
  );
};

export default withUrqlClient(createUrqlClient)(deadline);
