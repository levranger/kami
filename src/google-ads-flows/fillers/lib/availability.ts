import type { AvailabilityProvider, AvailableDate, AvailableTime, AppointmentType, SlotValidationResult } from "../types/booking";

function getDayOfWeek(dateStr: string): string {
  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const date = new Date(dateStr + "T12:00:00");
  return days[date.getDay()];
}

function isSunday(dateStr: string): boolean {
  return new Date(dateStr + "T12:00:00").getDay() === 0;
}

function generateDates(count: number): AvailableDate[] {
  const dates: AvailableDate[] = [];
  const today = new Date();
  for (let i = 1; i <= count; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    const dateStr = date.toISOString().split("T")[0];
    const sunday = isSunday(dateStr);
    dates.push({
      date: dateStr,
      dayOfWeek: getDayOfWeek(dateStr),
      available: !sunday,
      slots: sunday ? 0 : Math.floor(Math.random() * 8) + 4,
    });
  }
  return dates;
}

function generateTimeSlots(): AvailableTime[] {
  const slots: AvailableTime[] = [];
  for (let hour = 10; hour <= 17; hour++) {
    for (const minutes of [0, 30]) {
      if (hour === 17 && minutes === 30) continue;
      const time = `${hour.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`;
      const h = hour > 12 ? hour - 12 : hour;
      const ampm = hour >= 12 ? "PM" : "AM";
      const display = `${h}:${minutes.toString().padStart(2, "0")} ${ampm}`;
      slots.push({ time, display, available: Math.random() > 0.2 });
    }
  }
  return slots;
}

export const mockAvailabilityProvider: AvailabilityProvider = {
  async getAvailableDates(_appointmentType: AppointmentType): Promise<AvailableDate[]> {
    await new Promise((r) => setTimeout(r, 600));
    return generateDates(30);
  },
  async getAvailableTimes(_date: string, _appointmentType: AppointmentType): Promise<AvailableTime[]> {
    await new Promise((r) => setTimeout(r, 400));
    return generateTimeSlots();
  },
  async revalidateSlot(_date: string, _time: string, _appointmentType: AppointmentType): Promise<SlotValidationResult> {
    await new Promise((r) => setTimeout(r, 300));
    return { available: true };
  },
};