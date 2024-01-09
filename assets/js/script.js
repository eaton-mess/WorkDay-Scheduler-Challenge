$(document).ready(function () {
    // Display current day at the top of the calendar
    $("#currentDay").text(dayjs().format("dddd, MMMM D, YYYY"));

    // Function to color-code time blocks based on past, present, and future
    function updateColors() {
        const currentHour = dayjs().hour();

        $(".time-block").each(function () {
            const timeDiv = parseInt($(this).attr("id"));

            if (timeDiv < currentHour) {
                $(this).removeClass("present future").addClass("past");
            } else if (timeDiv === currentHour) {
                $(this).removeClass("past future").addClass("present");
            } else {
                $(this).removeClass("past present").addClass("future");
            }
        });
    }


