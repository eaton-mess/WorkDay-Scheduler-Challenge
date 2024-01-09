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

    // Load events from local storage
    function loadEvents() {
        $(".row.time-block").each(function () {
            const eventId = $(this).attr("id") + "-" + dayjs().format("YYYY-MM-DD");
            const eventText = localStorage.getItem(eventId);

            if (eventText) {
                $(this).find("textarea").val(eventText);
            }
        });
    }

    // Save button click event
    $(".saveBtn").on("click", function () {
        const time = $(this).parent().attr("id");
        const eventId = time + "-" + dayjs().format("YYYY-MM-DD");
        const eventText = $(this).siblings("textarea").val();

        localStorage.setItem(eventId, eventText);

        // Display a prompt below the currentDay
        const promptElement = $("<p>").text("Appointment added to local storage successfully ✅");
        $("#currentDay").parent().append(promptElement);

        // Remove the prompt after a certain duration (e.g., 3 seconds)
        setTimeout(function () {
            promptElement.remove();
        }, 3000);
    });

    // Initialize the colors and load events
    updateColors();
    loadEvents();
});
