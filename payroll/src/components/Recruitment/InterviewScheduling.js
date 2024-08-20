import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import './InterviewScheduling.css';

const InterviewScheduling = () => {
    const [interviews, setInterviews] = useState([
        { id: 1, applicant: 'Alice', date: '2024-08-20', time: '10:00 AM', email: 'sharathachar55@gmail.com', link: 'https://meet.google.com/your-meet-link' },
        { id: 2, applicant: 'Bob', date: '2024-08-21', time: '11:00 AM', email: 'sharathachar88@gmail.com', link: 'https://meet.google.com/your-meet-link' },
    ]);

    const navigate = useNavigate();
    const [editing, setEditing] = useState(null);
    const [loading, setLoading] = useState(false);

    const formatTimeTo12Hour = (time) => {
        let [hours, minutes] = time.split(':');
        const period = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12 || 12;
        return `${hours}:${minutes} ${period}`;
    };

    const formatTimeTo24Hour = (time) => {
        let [hours, minutesPeriod] = time.split(':');
        let [minutes, period] = minutesPeriod.split(' ');
        hours = period === 'PM' && hours !== '12' ? parseInt(hours, 10) + 12 : hours;
        hours = period === 'AM' && hours === '12' ? '00' : hours;
        return `${hours}:${minutes}`;
    };

    const sendEmailNotification = async (applicant, date, time, email, link) => {
        const subject = `Interview Scheduled with ${applicant}`;
        const text = `Dear ${applicant},\n\nYour interview is scheduled for ${date} at ${formatTimeTo12Hour(time)}.\n\nPlease join the meeting using the following link: ${link}\n\nBest regards,\nYour Company`;

        try {
            await axios.post('http://localhost:5000/send-email', {
                to: email,
                subject,
                text
            });
            alert('Email sent successfully');
        } catch (error) {
            alert('Failed to send email');
        }
    };
    return (
        <div className="unique-interview-container">
            <ul className="unique-interview-list">
                {interviews.map((interview) => (
                    <li key={interview.id} className="unique-interview-item">
                        <h3>{interview.applicant}</h3>
                        <label>Date: {interview.date}</label>
                        <label>Time: {interview.time}</label>
                        <label>Email: {interview.email}</label>
                        <label>Link: <a href={interview.link}>Join Interview</a></label>
                        <div className="unique-button-group">
                            <button className="unique-edit-btn" onClick={() => setEditing(interview.id)}>Edit</button>
                            <button className="unique-send-email-btn" onClick={() => sendEmailNotification(interview.applicant, interview.date, interview.time, interview.email, interview.link)}>Send Email</button>
                        </div>
                    </li>
                ))}
            </ul>
            <div className="unique-button-container">
                <button className="unique-back-btn" onClick={() => navigate(0)}>Back</button>
            </div>
        </div>
    );
};

export default InterviewScheduling;
