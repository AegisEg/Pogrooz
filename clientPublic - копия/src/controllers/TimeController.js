export function getHM(date) {
  var time = new Date(date);

  var hours = time.getHours();
  var minutes = time.getMinutes();

  if (minutes.toString().length === 1) {
    minutes = "0" + minutes;
  }
  if (hours.toString().length === 1) {
    hours = "0" + hours;
  }

  return hours + ":" + minutes;
}

export function timeAt(date) {
  var time = new Date(date);

  var day_diff = new Date().getDate() - time.getDate(),
    month_diff = new Date().getMonth() - time.getMonth(),
    year_diff = new Date().getFullYear() - time.getFullYear();
  var year = time.getFullYear(),
    month = time.getMonth() + 1,
    day = time.getDate();

  if (year_diff > 0)
    return (
      year.toString() +
      "." +
      (month < 10 ? "0" + month.toString() : month.toString()) +
      "." +
      (day < 10 ? "0" + day.toString() : day.toString())
    );

  var arr = [
    "Янв.",
    "Фев.",
    "Мар.",
    "Апр.",
    "Май",
    "Июн.",
    "Июл.",
    "Авг.",
    "Сен.",
    "Окт.",
    "Ноя.",
    "Дек.",
  ];

  var r =
    (day_diff === 0 && month_diff === 0 && "Сегодня") ||
    (day_diff === 1 && month_diff === 0 && "Вчера") ||
    (year_diff === 0 && day + " " + arr[month - 1]);
  return r;
}

export function LastMessageDate(timeR) {
  var time = new Date(timeR);

  var hours = time.getHours();
  var minutes = time.getMinutes();

  if (minutes.toString().length === 1) {
    minutes = "0" + minutes;
  }
  if (hours.toString().length === 1) {
    hours = "0" + hours;
  }

  var day_diff = new Date().getDate() - time.getDate(),
    month_diff = new Date().getMonth() - time.getMonth(),
    year_diff = new Date().getFullYear() - time.getFullYear();
  var year = time.getFullYear(),
    month = time.getMonth() + 1,
    day = time.getDate();

  if (year_diff > 0)
    return (
      (day < 10 ? "0" + day.toString() : day.toString()) +
      "." +
      (month < 10 ? "0" + month.toString() : month.toString()) +
      "." +
      year.toString()
    );

  var arr = [
    "Янв.",
    "Фев.",
    "Мар.",
    "Апр.",
    "Май",
    "Июн.",
    "Июл.",
    "Авг.",
    "Сен.",
    "Окт.",
    "Ноя.",
    "Дек.",
  ];

  var r =
    (day_diff === 0 && month_diff === 0 && hours + ":" + minutes) ||
    (day_diff === 1 && month_diff === 0 && "Вчера") ||
    (year_diff === 0 && day + " " + arr[month - 1]);

  return r;
}

export function OnlineDate(timeR) {
  var time = new Date(timeR);

  var hours = time.getHours();
  var minutes = time.getMinutes();

  if (minutes.toString().length === 1) {
    minutes = "0" + minutes;
  }
  if (hours.toString().length === 1) {
    hours = "0" + hours;
  }

  var diff = (new Date().getTime() - time.getTime()) / 1000,
    day_diff = new Date().getDay() - time.getDay();
  var month_diff = new Date().getMonth() + 1 - (time.getMonth() + 1);
  var year = time.getFullYear(),
    month = time.getMonth() + 1,
    day = time.getDate();

  if (isNaN(day_diff) || day_diff < 0 || month_diff >= 1)
    return (
      year.toString() +
      "." +
      (month < 10 ? "0" + month.toString() : month.toString()) +
      "." +
      (day < 10
        ? "0" + day.toString() + " in " + hours + ":" + minutes
        : day.toString() + " in " + hours + ":" + minutes)
    );

  var r =
    (day_diff === 0 &&
      ((diff < 60 && "Только что") ||
        (diff < 120 && "1 минуту назад") ||
        (diff < 3600 && Math.floor(diff / 60) + "минут. назад") ||
        (diff < 7200 && "1 час назад") ||
        (diff < 86400 && Math.floor(diff / 3600) + "часов назад"))) ||
    (day_diff === 1 && "Вчера в" + hours + ":" + minutes) ||
    (day_diff < 7 && day_diff + "дн. назад в" + hours + ":" + minutes) ||
    (day_diff < 31 &&
      Math.ceil(day_diff / 7) + "недел. в" + hours + ":" + minutes);
  return r;
}
export function prettyDate(num) {
  /**
   * Определяет правильное с точки зрения русского языка окончание месяца
   * @param int $num
   * @param array $postfixes
   * @return string
   */
  function postfix(num, postfixes) {
    //Делим число без остатка на 100
    num = num % 100;

    //Если больше 19, делим его без остатка ещё раз, уже на 10
    if (num > 19) {
      num = num % 10;
    }

    //В зависимости от того, какие числа остались, возвращаем значения
    switch (num) {
      case 1:
        return postfixes[0];

      case 2:
      case 3:
      case 4:
        return postfixes[1];

      default:
        return postfixes[2];
    }
  }

  //Определяем массивы с годами и месяцами
  var yearsPostfixes = ["год", "года", "лет"],
    monthesPostfixes = ["месяц", "месяца", "месяцев"];

  //Делим начальное число без остатка на 12, получаем количество месяцев
  var monthes = num % 12,
    //Отнимаем из начального числа количество месяцев и делим это на 12,
    //получаем количество лет
    years = (num - monthes) / 12;

  //Возвращаем результат postfix() зависимости от значений $years и $monthes
  if (years === 0) {
    return monthes + " " + postfix(monthes, monthesPostfixes);
  }

  if (monthes === 0) {
    return years + " " + postfix(years, yearsPostfixes);
  }

  return (
    years +
    " " +
    postfix(years, yearsPostfixes) +
    " " +
    monthes +
    " " +
    postfix(monthes, monthesPostfixes)
  );
}
