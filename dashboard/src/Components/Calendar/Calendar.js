import styled from "styled-components";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";

const Calendar = ({
  currentEvents,
  handleDateSelect,
  handleEvent,
  handleEventClick,
}) => {
  // const [currentEvents, SetCurrentEvents] = useState([]);

  //   const handleDateSelect = (selectInfo) => {
  //     let title = prompt("Please enter a new titie for your event");
  //     let calendarApi = selectInfo.view.calendar;

  //     calendarApi.unselect(); // clear date selection

  //     if (title) {
  //       calendarApi.addEvent({
  //         id: createEventId(),
  //         title,
  //         start: selectInfo.startStr,
  //         end: selectInfo.endStr,
  //         allDay: selectInfo.allDay,
  //       });
  //     }
  //   };

  //   const handleEvent = (events) => {
  //     SetCurrentEvents(events);
  //   };

  // const testSchedule = useSelector((state) => state.schedule);
  // // const request = useSelector(selectTestData);

  // useEffect(() => {
  //   if (testSchedule) return SetCurrentEvents(testSchedule);
  // }, [testSchedule]);

  return (
    <Container>
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin]}
        initialView="dayGridMonth"
        headerToolbar={{
          right: "dayGridMonth,dayGridWeek,timeGridDay, listWeek",
          center: "title",
          left: "prev,next,today",
        }}
        editable={false}
        selectable={false}
        eventClick={(e) => handleEventClick(e)}
        select={(e) => handleDateSelect(e)}
        eventContent={(e) => renderEventContent(e)}
        events={currentEvents}
        displayEventTime={false}
        eventColor="blue"

        // initialEvents={currentEvents}
        // eventsSet={(e) => handleEvent(e)}
      />
    </Container>
  );
};

export default Calendar;

const Container = styled.div`
  flex-grow: 1;
  padding: 2rem 2rem;
  margin-right: 1rem;
  background-color: white;
`;

function renderEventContent(eventInfo) {
  return (
    <>
      <b>{eventInfo.timeText}</b>
      <i>{eventInfo.event.title}</i>
    </>
  );
}
