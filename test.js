$(document).on("click", ".calendar table > tbody > tr > td", function(event) {
				//event.preventDefault();
				event.stopPropagation();
				var eventTarget = event.target;
				while (eventTarget.tagName != "TD") {
					eventTarget = eventTarget.parentElement;
				}
				if ($(eventTarget).attr("data-date") != undefined) {
					html += "<span class=\"today\"";
				}
			});
// 달력 요일
var calendarDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

//달력 월 (영문)
var monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

// 달력 요일 HTML
function calendarWeekHTML(options) {
	var html = "<thead><tr>";
	for (var index = 0; index < calendarDays.length; index++) {
		html += "<th";
		if (index == 0) {
			html += " class=\"sunday\"";
		} else if (index == 6) {
			html += " class=\"saturday\"";
		}
		html += ">" + calendarDays[index];
		// if (options.showFullDayName) {
		// 	html += "요일";
		// }
		html += "</th>";
	}
	html += "</tr></thead>";
	return html;
}

// 달력 공휴일
var hashmapCalendarHoliday = [];
// hashmapCalendarHoliday["1-1"] = {"title" : "새해"};
// hashmapCalendarHoliday["3-1"] = {"title" : "삼일절"};
// hashmapCalendarHoliday["5-5"] = {"title" : "어린이날"};
// hashmapCalendarHoliday["6-6"] = {"title" : "현충일"};
// hashmapCalendarHoliday["8-15"] = {"title" : "광복절"};
// hashmapCalendarHoliday["10-3"] = {"title" : "개천절"};
// hashmapCalendarHoliday["10-9"] = {"title" : "한글날"};
// hashmapCalendarHoliday["12-25"] = {"title" : "성탄절"};

// 달력 공휴일 함수
function getCalendarHoliday(calendarYear, calendarMonth, calendarDay) {
	if (Object.keys(hashmapCalendarHoliday).length == 0) {
		return null;
	}
	
	// 공휴일(임시 공휴일 포함)
	var holidayInfo = hashmapCalendarHoliday[calendarYear + "-" + calendarMonth + "-" + calendarDay];
	if (holidayInfo == undefined || holidayInfo == null) {
		holidayInfo = hashmapCalendarHoliday[calendarMonth + "-" + calendarDay];
	}
	return holidayInfo ;
}

// 기본값 처리
function setCalendarOptions(options) {
	// 기본값 처리
	if (options.showDay == undefined || options.showDay == null || typeof options.showDay != "boolean") {
		options.showDay = true;
	}
	if (options.showFullDayName == undefined || options.showFullDayName == null || typeof options.showFullDayName != "boolean") {
		options.showFullDayName = false;
	}
	if (options.showToday == undefined || options.showToday == null || typeof options.showToday != "boolean") {
		options.showToday = true;
	}
	
	// 공휴일 처리
	if (options.arHoliday != undefined && options.arHoliday != null && Array.isArray(options.arHoliday)) {
		Object.assign(hashmapCalendarHoliday, options.arHoliday);
	}
}

// 주간 달력 생성 함수
function weekHTML(date, options) {
	// 데이터 검증
	if (date == undefined || date == null || typeof date != "object" || !date instanceof Date) {
		return "";
	}
	
	setCalendarOptions(options);
	
	// 달력 연도
	var calendarYear = date.getFullYear();
	// 달력 월
	var calendarMonth = date.getMonth() + 1;
	// 달력 일
	var calendarToday = date.getDate();
	
	var monthLastDate = new Date(calendarYear, calendarMonth, 0);
	// 달력 월의 마지막 일
	var calendarMonthLastDate = monthLastDate.getDate();

	// 달력 이전 월의 마지막 일
	var prevMonthLastDate = new Date(calendarYear, calendarMonth - 1, 0);

	// 달력 다음 월의 시작 일
	var nextMonthStartDate = new Date(calendarYear, calendarMonth, 1);
	
	// 달력 현재 요일
	var calendarMonthTodayDay = date.getDay();
	
	// 주간 배열
	var arWeek = ["", "", "", "", "", "", ""];
	
	var weekYear = calendarYear;
	var weekMonth = calendarMonth;
	var weekDay = calendarToday;
	// 현재 요일부터 주간 배열에 날짜를 추가
	for (var index = calendarMonthTodayDay; index < 7; index++) {
		arWeek[index] = weekYear +"-" + weekMonth + "-" + weekDay;
		weekDay++;
		// 날짜가 현재 월의 마지막 일보다 크면 다음 월의 1일로 변경
		if (weekDay > calendarMonthLastDate) {
			weekYear = nextMonthStartDate.getFullYear();
			weekMonth = nextMonthStartDate.getMonth() + 1;
			weekDay = 1;
		}
	}
	
	weekYear = calendarYear;
	weekMonth = calendarMonth;
	weekDay = calendarToday;
	// 현재 요일부터 꺼꾸로 주간 배열에 날짜를 추가
	for (var index = calendarMonthTodayDay - 1; index >= 0; index--) {
		weekDay--;
		// 날짜가 현재 월의 1일이면 작으면 이전 월의 마지막 일로 변경
		if (weekDay == 0) {
			weekYear = prevMonthLastDate.getFullYear();
			weekMonth = prevMonthLastDate.getMonth() + 1;
			weekDay = prevMonthLastDate.getDate();
		}
		arWeek[index] = weekYear +"-" + weekMonth + "-" + weekDay;
	}
		
	// 오늘
	var today = new Date();
	
	var html = "";
	html += "<table>";
	if (options.showDay) {
		html += calendarWeekHTML(options);
	}
	html += "<tbody>";
	html += "<tr>";
	for (var index = 0; index < 7; index++) {
		var arWeekDate = arWeek[index].split("-");
		var year = arWeekDate[0];
		var month = arWeekDate[1];
		var day = arWeekDate[2];
		html += "<td data-date=\"" + year + "-" + (month < 10 ? "0" : "") + month + "-" + (day < 10 ? "0" : "") + day +  "\">";
		html += "<span";
		if (options.showToday && year == today.getFullYear() && month == today.getMonth() + 1
			&& day == today.getDate()) {
			html += " class=\"today\"";
		} else {
			var holiday = false;
			var holidayInfo = getCalendarHoliday(year, month, day);
			if (holidayInfo != undefined && holidayInfo != null) {
				html += " class=\"holiday\"";
				holiday = true;
			}
			if (!holiday) {
				if (index == 0) {
					html += " class=\"sunday\"";
				} else if (index == 6) {
					html += " class=\"saturday\"";
				}
			}
		}
		var holidayInfo = getCalendarHoliday(year, month, day);
		if (holidayInfo != undefined && holidayInfo != null) {
			html += " title=\"" + holidayInfo.title + "\"";
		}
		html += ">" + day + "</span>";
		html += "</td>";
	}
	html += "</tbody>";
	html += "</table>";
	return html;
}