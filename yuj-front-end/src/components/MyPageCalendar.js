import React, { Component } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';

const MyPageCalendar = (props) => {

    const { lectureEvents } = props;

    return (
        <div className="App max-w-full">
            <FullCalendar
                defaultView="dayGridMonth"
                plugins={[dayGridPlugin]}
                events={lectureEvents.map(event => {
                    return {...event, title:event.title.substr(0,13)}
                })}
            />
        </div>
    );
}

export default MyPageCalendar;