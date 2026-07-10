import type { AvailableDate, AvailableTime, AvailabilityProvider } from "../types/booking";

/**
 * Generate available dates for the next 30 days.
 * Excludes Sundays and past dates.
 */
function generateDates(): AvailableDate[] {
  const dates: AvailableDate[] = [];
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  for (let i = 1; i <= 30; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);

    const dayOfWeek = date.getDay();
    // Skip Sundays (0)
    if (dayOfWeek === 0) continue;

    const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const monthNames = [
      "Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
    ];

    dates.push({
      date: date.toISOString().split("T")[0],
      dayOfWeek: dayNames[dayOfWeek],
      displayDate: `${monthNames[date.getMonth()]} ${date.getDate()}`,
      available: true,
    });
  }

  return dates;
}

/**
 * Generate available time slots for a given date.
 * Hours: 10:00 AM – 6:00 PM, 30-minute intervals.
 * Excludes some mock unavailable slots.
 */
function generateTimeSlots(date: string): AvailableTime[] {
  const slots: AvailableTime[] = [];

  // Mock unavailable slots based on date hash
  const dateHash = date.split("-").reduce((sum, part) => sum + parseInt(part), 0);
  const unavailableIndices = new Set([dateHash % 16, (dateHash * 3) % 16, (dateHash * 7) % 16]);

  let slotIndex = 0;
  for (let hour = 10; hour <= 17; hour++) {
    for (let minute = 0; minute < 60; minute += 30) {
      // Skip 5:30 PM and later (last slot is 5:30 PM for a session ending at 6 PM)
      if (hour === 17 && minute === 30) continue;

      const period = hour >= 12 ? "PM" : "AM";
      const displayHour = hour > 12 ? hour - 12 : hour;
      const displayMinute = minute.toString().padStart(2, "0");
      const timeStr = `${hour.toString().padStart(2, "0")}:${displayMinute}`;
      const displayTime = `${displayHour}:${displayMinute} ${period}`;

      slots.push({
        time: timeStr,
        displayTime,
        available: !unavailableIndices.has(slotIndex),
      });

      slotIndex++;
    }
  }

  return slots;
}

/**
 * Mock availability provider.
 * Can be replaced with Mangomint API adapter in production.
 */
export class MockAvailabilityProvider implements AvailabilityProvider {
  async getAvailableDates(): Promise<AvailableDate[]> {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 600));
    return generateDates();
  }

  async getAvailableTimes(date: string): Promise<AvailableTime[]> {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 400));
    return generateTimeSlots(date);
  }
}

export const availabilityProvider = new MockAvailabilityProvider();