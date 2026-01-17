function isLeapYear(year) {
    return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
}

function checkLeapYear() {
    const yearInput = document.getElementById("year");
    const resultDiv = document.getElementById("result");
    const year = parseInt(yearInput.value);

    if (isNaN(year)) {
        resultDiv.innerHTML = `<div class="alert alert-warning border-0 shadow-sm">Please enter a valid year.</div>`;
        return;
    }

    if (isLeapYear(year)) {
        resultDiv.innerHTML = `<div class="alert alert-success border-0 shadow-sm fw-bold">✨ ${year} is a Leap Year! (366 days)</div>`;
    } else {
        resultDiv.innerHTML = `<div class="alert alert-light border-0 shadow-sm fw-bold">${year} is NOT a Leap Year. (365 days)</div>`;
    }
}

function generateCalendar() {
    const yearInput = document.getElementById("year");
    const container = document.getElementById("calendar-container");
    const year = parseInt(yearInput.value);

    if (isNaN(year)) {
        alert("Please enter a year first.");
        return;
    }

    container.innerHTML = ""; // Clear previous calendar

    const months = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    const daysInWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    for (let m = 0; m < 12; m++) {
        const firstDay = new Date(year, m, 1).getDay(); // 0 is Sunday
        const daysInMonth = new Date(year, m + 1, 0).getDate();

        let monthHtml = `
            <div class="col-lg-4 col-md-6 col-sm-12">
                <div class="month-card">
                    <h5 class="month-title">${months[m]}</h5>
                    <table class="calendar-table">
                        <thead>
                            <tr>
                                ${daysInWeek.map(day => `<th>${day}</th>`).join('')}
                            </tr>
                        </thead>
                        <tbody>
                            <tr>`;

        // Empty cells for days before the first day of the month
        for (let i = 0; i < firstDay; i++) {
            monthHtml += "<td></td>";
        }

        let dayCount = firstDay;
        for (let d = 1; d <= daysInMonth; d++) {
            if (dayCount % 7 === 0 && d !== 1) {
                monthHtml += "</tr><tr>";
            }

            // Highlight February 29th
            const isLeapDay = (m === 1 && d === 29);
            const classes = isLeapDay ? 'leap-day' : '';

            monthHtml += `<td class="${classes}">${d}</td>`;
            dayCount++;
        }

        // Fill empty cells at the end
        while (dayCount % 7 !== 0) {
            monthHtml += "<td></td>";
            dayCount++;
        }

        monthHtml += `
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>`;

        container.innerHTML += monthHtml;
    }

    // Scroll to calendar
    container.scrollIntoView({ behavior: 'smooth' });
}
