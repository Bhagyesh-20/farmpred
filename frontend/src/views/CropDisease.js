import React, { useState, useContext } from 'react';
import axios from 'axios';
import AuthContext from '../context/AuthContext';
import './CropDisease.css'
import remedies from './Remedies.json'

const baseURL = 'http://127.0.0.1:8000/prediction';

const CropDisease = () => {
    const { authTokens } = useContext(AuthContext);
    const [selectedFile, setSelectedFile] = useState(null);
    const [prediction, setPrediction] = useState(null);
    const [error, setError] = useState(null);
    const [remedy, setRemedy] = useState(null);

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append('file', selectedFile);

        try {
            const response = await axios.post(`${baseURL}/predict/`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${authTokens.access}`, // Include authorization token
                },
            });
            const predictedClass = response.data.prediction;
            setPrediction(predictedClass);
            setError(null);

            if (remedies[predictedClass]) {
                setRemedy(remedies[predictedClass]);
            } else {
                setRemedy({ remedy: "No remedy found", details: "" });
            }
        } catch (error) {
            console.error('Error uploading file:', error);
            setError('Error uploading file. Please try again.');
            setPrediction(null);
            setRemedy(null);
        }
    };

    return (
        <div>
            <div className="container rounded-container col-xxl-8 px-4 py-5 my-4">
                <h1 id="meh">Crop Disease Prediction</h1>
                <p>Please Upload your image to Predict the disease of the crop</p>
                <div className="container col-xxl-8 px-4 py-5 my-4">
                    <form onSubmit={handleSubmit}>
                        <input type="file" onChange={handleFileChange} required />
                        <button type="submit" className="btn btn-info mx-2 btn-sm">Upload</button>
                    </form>
                </div>
                </div>
                <div>
                {prediction && (
                    <div className="container rounded-container col-xxl-8 px-4 py-5 my-4">
                        <h2 id="meh">Prediction Result</h2>
                        <p >{prediction}</p>
                        {remedy && (
                            <div>
                                <h2 id="meh">Remedy</h2>
                                <p>{remedy.remedy}</p>
                                <p>{remedy.details}</p>
                            </div>
                        )}
                    </div>
                )}
                </div>
                {error && (
                    <div>
                        <h2>Error</h2>
                        <p>{error}</p>
                    </div>
                )}
            </div>
    );
};

export default CropDisease;