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
        </div>
        <div className="nu_mai_pot_matei">
        <h6>User is available.</h6>
        <button id="addd-user">Add user</button>
        </div>

        <div className="task-container">
          <div className="taskk">
            <img src="/images/img1.png" alt="task logo" />
            <h3 className="task-descriptionn">marian01@gmail.com</h3>
            <span>finished/in progress</span>
          </div>
          <p>descrierea taskuluidescrierea taskuluidescrierea taskului</p>
          <div className="rating">
          <input type="radio" />
          <input type="radio" />
          <input type="radio" />
          <input type="radio" />
          <input type="radio" />
          </div>
        </div>
      </div>
    </Layout_Dash>
  );
};

export default project;
