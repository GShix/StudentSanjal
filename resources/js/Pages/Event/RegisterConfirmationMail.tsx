import React, { useState } from "react";
import axios from "axios";

function RegisterConfirmationMail({ eventId, meetingLink }) {
    const [formData, setFormData] = useState({
        event_id: eventId,
        description: "",
    });
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(
                `/api/events/register/${eventId}`, // Assuming this is your route
                formData
            );

            if (response.data.success) {
                setSuccessMessage(response.data.message);
            }
        } catch (error) {
            setErrorMessage(
                error.response?.data?.message || "Something went wrong!"
            );
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <textarea
                    name="description"
                    placeholder="Enter event description"
                    value={formData.description}
                    onChange={handleChange}
                ></textarea>
                <button type="submit">Register for Event</button>
            </form>
            {successMessage && <p className="success">{successMessage}</p>}
            {errorMessage && <p className="error">{errorMessage}</p>}
        </div>
    );
}

export default RegisterConfirmationMail;
