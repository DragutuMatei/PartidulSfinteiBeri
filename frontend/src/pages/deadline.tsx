import React from "react";
import { Layout_Dash } from "../components/Layout_Dash";

interface deadlineProps {}

const deadline: React.FC<deadlineProps> = ({}) => {
  return (
    <Layout_Dash>
      <div className="tasks-list-deadline">
        <div className="project-displayed">
          <h3>descrierea proiectului</h3>
          <div className="taskk">
            <h4>descrierea taskurilor</h4>
            <span>finished/in progress</span>
          </div>
          <button>
              Deadline pe 25august
          </button>
        </div>
      </div>
    </Layout_Dash>
  );
};

export default deadline;
