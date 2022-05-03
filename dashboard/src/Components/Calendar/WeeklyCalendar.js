import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";

import React from "react";

export default function WeeklyCalendar({ currentEvents }) {
  return (
    <FullCalendar
      plugins={[dayGridPlugin]}
      initialView="dayGridWeek"
      height={300}
      headerToolbar={{
        right: "dayGridWeek",
        center: "title",
        left: "prev,next,today",
      }}
      editable={false}
      selectable={false}
      eventContent={(e) => renderEventContent(e)}
      events={currentEvents}
      displayEventTime={true}
      eventColor="blue"
      allDaySlot={true}
    />
  );
}

function renderEventContent(eventInfo) {
  return (
    <>
      <b>{eventInfo.timeText}</b>
      <i>{eventInfo.event.title}</i>
    </>
  );
}
