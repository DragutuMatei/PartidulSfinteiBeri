import React from 'react'
import { Layout_Dash } from '../components/Layout_Dash';

interface meetingsProps {

}

const meetings: React.FC<meetingsProps> = ({}) => {
    return (
        <Layout_Dash>
            <div className="meeting-add">
                <textarea placeholder="Write a topic/message..."></textarea>
                <div className="meeting-content">
                <input type="date" />
                <select>
                    <option>
                        Dragutu Matei
                    </option>
                    <option>
                        Dragutu Matei
                    </option>
                    <option>
                        Dragutu Matei
                    </option>
                </select>
                </div>
                <button>ADD MEETING</button>
                <hr />
            </div>
        </Layout_Dash>
        );
}

export default meetings;