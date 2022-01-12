import React from "react";
import { Layout_Dash } from "../components/Layout_Dash";

interface meetingsProps {}

const meetings: React.FC<meetingsProps> = ({}) => {
  return (
    <Layout_Dash>
      <div className="meeting-container">
        <div className="meeting-add">
          <textarea placeholder="Write a topic/message..."></textarea>
          <div className="meeting-content">
            <input type="date" />
            <select>
              <option>Project#1</option>
              <option>Project#2</option>
              <option>Project#3</option>
            </select>
          </div>
          <button>ADD MEETING</button>
          <hr />
        </div>
        <div className="meeting-list">
          <div className="meeting">
            <h3>Topic of the meeting</h3>
            <div className="meeting-list-content">
              <h4>Project</h4>
              <span>Date and time</span>
            </div>
          </div>
          <div className="meeting">
            <h3>Topic of the meeting</h3>
            <div className="meeting-list-content">
              <h4>Project</h4>
              <span>Date and time</span>
            </div>
          </div>
          <div className="meeting">
            <h3>Topic of the meeting</h3>
            <div className="meeting-list-content">
              <h4>Project</h4>
              <span>Date and time</span>
            </div>
          </div>
        </div>
      </div>
    </Layout_Dash>
  );
};

export default meetings;
