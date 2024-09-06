import React from 'react';

interface TimeAgoProps {
    date: string; // The date that you want to display as time ago
}

const getTimeAgo = (date: string) => {
    const now = new Date();
    const postTime = new Date(date);
    const diffInSeconds = Math.floor((now.getTime() - postTime.getTime()) / 1000);

    const minutes = Math.floor(diffInSeconds / 60);
    const hours = Math.floor(diffInSeconds / 3600);
    const days = Math.floor(diffInSeconds / 86400);

    if (minutes < 60) {
        return `${minutes} min`;
    } else if (hours < 24) {
        return `${hours} h`;
    } else {
        return `${days} d`;
    }
};

const TimeAgo: React.FC<TimeAgoProps> = ({ date }) => {
    return <span>{getTimeAgo(date)}</span>;
};

export default TimeAgo;
