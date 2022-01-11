import React from 'react'
import { Layout_Dash } from '../components/Layout_Dash';

interface meetingsProps {

}

const meetings: React.FC<meetingsProps> = ({}) => {
    return (
        <Layout_Dash>
            <div className="meeting">
                <input type="text" />
                <input type="date" />
                <select></select>
                <button>ADD</button>
            </div>
        </Layout_Dash>
        );
}

export default meetings;