import { useState, useEffect } from "react";
import CustomCalendar from "../components/Appointment/CustomCalendar";
import TimeRangePicker from "../components/Appointment/TimeRangePicker";
import BookingModal from "../components/Appointment/BookingModal";

export default function ScheduleSection() {
  // Get initial date in WIB. If today's operating hours have ended (>= 20:45 WIB), default to tomorrow!
  const getInitialDateStr = () => {
    const now = new Date();
    const wibDate = new Intl.DateTimeFormat("en-CA", {
      timeZone: "Asia/Jakarta",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    }).format(now);

    const wibTime = new Intl.DateTimeFormat("en-GB", {
      timeZone: "Asia/Jakarta",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    }).format(now);

    const [h, m] = wibTime.split(":").map(Number);
    const mins = h * 60 + m;

    // Past 20:45 WIB: Operating window (07:00 - 21:00) ended for today, select tomorrow
    if (mins >= 20 * 60 + 45) {
      const tomorrow = new Date(now.getTime() + 24 * 3600 * 1000);
      return new Intl.DateTimeFormat("en-CA", {
        timeZone: "Asia/Jakarta",
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      }).format(tomorrow);
    }

    return wibDate;
  };

  const [selectedDate, setSelectedDate] = useState(getInitialDateStr);
  const [busySlots, setBusySlots] = useState([]);
  const [activeBooking, setActiveBooking] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch busy slots from Cloudflare Worker for selectedDate
  useEffect(() => {
    let isMounted = true;

    async function fetchAvailability() {
      try {
        const res = await fetch(
          `https://contact-form-worker.mhps-null.workers.dev/api/calendar/availability?date=${selectedDate}`
        );
        if (res.ok && isMounted) {
          const data = await res.json();
          if (data.busySlots) {
            setBusySlots(data.busySlots);
            return;
          }
        }
      } catch {
        // Fallback default sample schedule if worker is offline
      }

      // Default realistic sample for demo: Haris has class/practicum between 10:00-11:30 and 15:30-17:00
      if (isMounted) {
        setBusySlots([
          { start: "10:00", end: "11:30" },
          { start: "15:30", end: "17:00" },
        ]);
      }
    }

    fetchAvailability();
    return () => {
      isMounted = false;
    };
  }, [selectedDate]);

  const handleConfirmRange = ({ startTime, endTime, duration }) => {
    setActiveBooking({
      date: selectedDate,
      startTime,
      endTime,
      duration,
    });
    setIsModalOpen(true);
  };

  const handleBookingSuccess = (confirmedData) => {
    if (confirmedData?.startTime && confirmedData?.endTime) {
      setBusySlots((prev) => [
        ...prev,
        { start: confirmedData.startTime, end: confirmedData.endTime },
      ]);
    }
  };

  return (
    <section
      id="schedule"
      className="w-full flex items-center justify-center py-12 sm:py-16 px-3.5 sm:px-6 lg:px-8 scroll-mt-20"
    >
      <div className="w-full max-w-7xl mt-4 sm:mt-8 mx-auto flex flex-col items-center">
        {/* Header */}
        <div className="text-center max-w-3xl mb-8 sm:mb-12 px-2">
          <h2 className="text-2xl sm:text-3xl lg:text-5xl font-black tracking-tight text-gray-900 dark:text-white mb-3 sm:mb-4">
            Schedule an Appointment
          </h2>

          <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base lg:text-lg">
            Pick a date and freely select your preferred time. Synced in real-time with my calendar availability.
          </p>
        </div>

        {/* Bespoke Calendar & Time Selection Card */}
        <div className="w-full max-w-5xl rounded-2xl sm:rounded-3xl border border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-slate-900/60 backdrop-blur-xl shadow-2xl p-4 sm:p-6 lg:p-8 transition-colors duration-300 transform-gpu">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
            {/* Left Column: Calendar (5 cols) */}
            <div className="lg:col-span-5 border-b lg:border-b-0 lg:border-r border-slate-200 dark:border-slate-800 pb-6 lg:pb-0 lg:pr-6">
              <CustomCalendar
                selectedDate={selectedDate}
                onSelectDate={(date) => setSelectedDate(date)}
              />
            </div>

            {/* Right Column: Visual Timeline & Time Range Picker (7 cols) */}
            <div className="lg:col-span-7">
              <TimeRangePicker
                key={selectedDate}
                selectedDate={selectedDate}
                busySlots={busySlots}
                onConfirmRange={handleConfirmRange}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Booking Form Modal */}
      <BookingModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        bookingDetails={activeBooking}
        onBookingSuccess={handleBookingSuccess}
      />
    </section>
  );
}
