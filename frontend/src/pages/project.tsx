import React from "react";
import { Layout_Dash } from "../components/Layout_Dash";

interface projectProps {}

const project: React.FC<projectProps> = ({}) => {
  return (
    <Layout_Dash>
      <div className="project-containerr">
        <div className="project-descriptionn">
          <h3>descrierea unui proiect</h3>
        </div>


        <div className="task-descriptionn">
          <h4>descrierea unui task</h4>
        </div>


        <div className="user-checkk">
          
          <div className="email-btn">
            <input type="email" />
            <button id="checkk">Check user</button>
          </div>
          <h6>User is available.</h6>
          <button id="addd">Add project</button>

        </div>

        <hr />

        <div className="email-btn">
            <input type="email" />
            <button id="checkk">Check user</button>
            <button id="addd-user">Add user</button>
        </div>
        <h6>User is available.</h6>

        <div className="taskk">
          <img src="/images/img1.png" alt="task logo"/>
          <h3 className="task-descriptionn">descrierea taskului efectiv</h3>
          <span>finished/in progress</span>
        </div>
          <input type="radio" />
      </div>
    </Layout_Dash>
  );
};

export default project;
