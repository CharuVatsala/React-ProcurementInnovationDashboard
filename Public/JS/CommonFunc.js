export function truncator(input) {
  if (input == null || input === '' || input === undefined) {
    return input;
  }

  if (input.length > 100) {
    return input.substring(0, 100) + '...';
  }
  else {
    return input;
  }
}

export function truncatorheader(input) {
  if (input == null || input === '' || input === undefined) {
    return input;
  }

  if (input.length > 35) {
    return input.substring(0, 35) + '...';
  }
  else {
    return input;
  }
}

export function formatDate(timeStamp) {
  const months = [
    'January',
    'Feburary',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ];
  let d = new Date(timeStamp);
  let formatted_date =
    d.getDate() + ' ' + months[d.getMonth()] + ' ' + d.getFullYear();
  return formatted_date;
}

export function formatTime(timeStamp) {
  const hour = timeStamp.substr(11, 2);
  const minutes = timeStamp.substr(14, 2);
  const period = hour < 12 ? 'am' : 'pm';
  return hour + '.' + minutes + ' ' + period;
}

export function checklatest(timeStamp) {
  let createdDate = new Date(timeStamp);
  let monthbackdate = new Date();
  /* monthbackdate.setDate(-30); */
  monthbackdate.setDate(monthbackdate.getDate() - 30);

  if (monthbackdate > createdDate) {
    return 0;
  } else {
    return 1;
  }
}
