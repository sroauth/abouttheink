import { useEffect, useState } from "preact/hooks";
import { appointmentDate, appointmentTime } from "@/utils/appointment.ts";
import { f0 } from "@/utils/gun.ts";

export default function Calendar() {
  const times = [
    "12:00",
    "12:30",
    "1:00",
    "1:30",
    "2:00",
    "2:30",
    "3:00",
    "3:30",
    "4:00",
    "4:30",
    "5:00",
    "5:30",
    "6:00",
  ];

  const [currYear, setCurrYear] = useState(new Date().getFullYear());
  const [currMonth, setCurrMonth] = useState(new Date().getMonth());

  const [selectedDate, setSelectedDate] = useState();
  const [selectedTime, setSelectedTime] = useState();

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  function handleBackward() {
    if (currMonth === 0) {
      setCurrYear(currYear - 1);
      setCurrMonth(11);
    } else {
      setCurrMonth(currMonth - 1);
    }
  }

  function handleForward() {
    if (currMonth === 11) {
      setCurrYear(currYear + 1);
      setCurrMonth(0);
    } else {
      setCurrMonth(currMonth + 1);
    }
  }

  function getWeeksOfMonth(year, month) {
    var firstDay = new Date(year, month, 1).getDay();
    var totalDays = new Date(year, month + 1, 0).getDate();
    return Math.ceil((firstDay + totalDays) / 7);
  }

  return (
    <div class="w-[320px]">
      <div class="grid grid-cols-3">
        <div class="text-lg">
          <select
            class="appearance-none bg-transparent outline-none"
            value={currMonth}
            onChange={(e) => setCurrMonth(Number(e.target.value))}
          >
            {months.map((month, i) =>
              currYear > new Date().getFullYear() ||
              i >= new Date().getMonth() ? (
                <option value={i}>{month}</option>
              ) : null
            )}
          </select>
        </div>

        <div class="flex justify-center font-bold">
          <button
            class="bg-[#ECEFF4] py-0.5 px-3 border-r disabled:text-gray-400 disabled:cursor-default"
            onClick={handleBackward}
            disabled={
              currYear === new Date().getFullYear() &&
              currMonth === new Date().getMonth()
            }
          >
            &lt;
          </button>
          <button class="bg-[#ECEFF4] py-0.5 px-3" onClick={handleForward}>
            &gt;
          </button>
        </div>

        <div class="flex justify-end text-lg">
          <select
            class="appearance-none bg-transparent outline-none"
            value={currYear}
            onChange={(e) => setCurrYear(Number(e.target.value))}
          >
            <option value="2023">2023</option>
            <option value="2024">2024</option>
            <option value="2023">2025</option>
            <option value="2024">2026</option>
            <option value="2023">2027</option>
            <option value="2024">2028</option>
          </select>
        </div>
      </div>

      <div class="mt-5">
        <div class="grid grid-cols-7 gap-1 font-bold">
          <div class="flex justify-center">S</div>
          <div class="flex justify-center">M</div>
          <div class="flex justify-center">T</div>
          <div class="flex justify-center">W</div>
          <div class="flex justify-center">T</div>
          <div class="flex justify-center">F</div>
          <div class="flex justify-center">S</div>

          {(() => {
            const date = new Date();

            const firstDay = new Date(currYear, currMonth, 1).getDay();
            const endDate = new Date(currYear, currMonth + 1, 0).getDate();
            const endDay = new Date(currYear, currMonth, endDate).getDay();
            const endDateLastMonth = new Date(currYear, currMonth, 0).getDate();

            const monthMatches = currMonth === date.getMonth();
            const yearMatches = currYear === date.getFullYear();

            const items = [];

            for (let i = firstDay; i > 0; i--) {
              items.push(
                <div class="h-10 flex justify-center items-center font-bold text-gray-400">
                  {endDateLastMonth - i + 1}
                </div>
              );
            }

            const disabledDays = [0, 2];

            for (let i = 1; i <= endDate; i++) {
              const isToday =
                i === date.getDate() && monthMatches && yearMatches
                  ? "text-[#D08770]"
                  : "";
              const isPastDay =
                i < date.getDate() && monthMatches && yearMatches;

              const isDisabledDay = disabledDays.includes(
                new Date(currYear, currMonth, i).getDay()
              );

              const isSelected =
                selectedDate?.getFullYear() === currYear &&
                selectedDate?.getMonth() === currMonth &&
                selectedDate?.getDate() === i
                  ? "border-red-400 hover:scale-100"
                  : "border-transparent";

              items.push(
                <button
                  class={`bg-white h-10 flex justify-center items-center font-bold border-2 transition-transform hover:scale-110 disabled:bg-[#E5E9F0] disabled:text-gray-400 disabled:scale-100 disabled:cursor-default ${isToday} ${isSelected}`}
                  disabled={isPastDay || isDisabledDay}
                  onClick={() => {
                    setSelectedDate(
                      new Date(
                        currYear,
                        currMonth,
                        i,
                        date.getHours(),
                        date.getMinutes()
                      )
                    );

                    appointmentDate.value = `${currYear}-${f0(
                      currMonth + 1
                    )}-${f0(i)}`;
                  }}
                >
                  {i}
                </button>
              );
            }

            for (
              let i = endDay;
              i < 6 + (getWeeksOfMonth(currYear, currMonth) < 6 ? 7 : 0);
              i++
            ) {
              items.push(
                <div class="h-10 flex justify-center items-center font-bold text-gray-400">
                  {i - endDay + 1}
                </div>
              );
            }

            return items;
          })()}
        </div>
      </div>

      <div class="mt-5 gap-1" style="columns: 7;">
        {times.map((time) => {
          const date = new Date();
          const [hours, minutes] = time.split(":");

          const isPast =
            selectedDate?.getDate() === date.getDate() &&
            (Number(hours) % 12) + 12 <= date.getHours() &&
            Number(minutes) <= date.getMinutes();
          const isSelected =
            selectedTime?.includes((Number(hours) % 12) + 12) &&
            selectedTime?.includes(Number(minutes))
              ? "border-red-400"
              : "border-transparent";

          return (
            <button
              class={`border-2 bg-white w-full mt-[4px] disabled:bg-[#E5E9F0] disabled:text-gray-400 disabled:cursor-default ${isSelected}`}
              disabled={isPast}
              onClick={() => {
                setSelectedTime([(Number(hours) % 12) + 12, Number(minutes)]);
                appointmentTime.value = `${(Number(hours) % 12) + 12}:${f0(
                  Number(minutes)
                )}:00`;
              }}
            >
              {time}
            </button>
          );
        })}
      </div>
    </div>
  );
}
