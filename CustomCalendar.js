import React, { useState } from 'react';

import 'react-calendar/dist/Calendar.css';
import '../CalendarCustom.css';
import moment from 'moment';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography } from '@mui/material';
import Calendar from 'react-calendar';

function CustomCalendar({ todos }) {
  const curDate = new Date(); // 현재 날짜
  const [value, onChange] = useState(curDate);
  const [open, setOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);

  const handleClickDay = (date) => {
    setSelectedDate(date);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const filteredTodos = todos.filter(todo =>
    new Date(todo.date).toDateString() === new Date(selectedDate).toDateString()
  );

  return (
    <div>
      <Calendar
        locale="en"
        onChange={onChange}
        value={value}
        onClickDay={handleClickDay}
        next2Label={null}
        prev2Label={null}
        calendarType="gregory" // 일요일 부터 시작
        formatDay={(locale, date) => moment(date).format('D')}
        formatShortWeekday={(locale, date) => moment(date).format('dd').charAt(0).toUpperCase()} // Custom format for weekdays
        showNeighboringMonth={false}
      />
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{moment(selectedDate).format('YYYY-MM-DD')}</DialogTitle>
        <DialogContent>
          {filteredTodos.length > 0 ? (
            filteredTodos.map(todo => (
              <Typography key={todo.id}>{todo.text}</Typography>
            ))
          ) : (
            <Typography>일정이 없습니다</Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">닫기</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default CustomCalendar;
