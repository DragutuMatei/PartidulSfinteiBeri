import React from 'react'
import { Layout } from '../components/Layout';

interface sliderProps {

}

const Slider: React.FC<sliderProps> = ({}) => {
    return (
        <Layout>
            <div className="slider">
                <div className="slider-card">
                    <h3 className="slider-card-title">
                        Task #1
                    </h3>
                    <h5 className="slider-card-subtitle">
                        Something should be here
                    </h5>
                    <p className="slider-card-description">
                        nush ce sa zic aici dar trb sa fie
                    </p>
                </div>
                <button className="slider-btn-left">
                    Prev
                </button>
                <button className="slider-btn-right">
                    Next
                </button>
                <span>0/1</span>
            </div>
        </Layout>
        );
}

export default Slider;