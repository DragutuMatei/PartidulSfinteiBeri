import React from 'react'
import { Layout } from '../components/Layout';

interface dashboardProps {

}

const dashboard: React.FC<dashboardProps> = ({}) => {
    return (
        <Layout>
            <div className="dashboard-container">
                <div className="project">
                    <div className="project-text">
                    <h4>Project Name</h4>
                    <h5>Company Name</h5>
                    </div>
                    <div className="progress">
                        <span>In progress</span>
                    </div>
                    <div className="priority">
                        <span>Medium Priority</span>
                    </div>
                    <div className="members-list">
                        <div className="member">
                            <img src={require("../assets/images/img1.png").default} />
                        </div>
                        <div className="member">
                            <img src={require("../assets/images/img1.png").default} />
                        </div>
                        <div className="member">
                            <img src={require("../assets/images/img1.png").default} />
                        </div>
                        <div className="member">
                            <img src={require("../assets/images/img1.png").default} />
                        </div>
                    </div>
                    <div className="due-date">
                        <h4>Due to : August 23</h4>
                    </div>
                </div>
                <div className="project">
                    
                </div>
                <div className="tasks">
                    
                </div>
                <div className="timeline">
                    
                </div>
                <div className="calendar">
                    
                </div>
                <div className="messages">
                    
                </div>
            </div>
        </Layout>
        );
}

export default dashboard;