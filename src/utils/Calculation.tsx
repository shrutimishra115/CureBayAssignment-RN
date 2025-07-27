// Calculate BMI
export const calculateBMI = (height: string, weight: string): string | null => {
  const h = parseFloat(height);
  const w = parseFloat(weight);
  if (!h || !w || isNaN(h) || isNaN(w)) return null;
  const bmi = w / (h / 100) ** 2;
  return bmi.toFixed(2);
};

// Get Weekdays (short format)
export const getWeekdays = (): string[] => {
  const today = new Date();
  const days: string[] = [];
  for (let i = 6; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(today.getDate() - i);
    days.push(date.toLocaleDateString('en-US', {weekday: 'short'}));
  }
  return days;
};

// Calculate stats from array (min, avg, max)
interface ValueData {
  value: number;
}

export const calcStats = (
  arr: ValueData[],
): {min: string | number; avg: string | number; max: string | number} => {
  if (!arr || arr.length === 0) return {min: '--', avg: '--', max: '--'};
  const values = arr.map(d => d.value);
  const min = Math.min(...values);
  const max = Math.max(...values);
  const avg = values.reduce((a, b) => a + b, 0) / values.length;
  return {min, avg, max};
};

export const getTooltipColor = (normalized: number): string => {
  const red = Math.round(255 * normalized);
  const green = Math.round(255 * (1 - normalized));
  return `rgb(${red}, ${green}, 0)`; // green to red gradient
};

// Define the type for entry parameter in getAlerts function
interface Entry {
  heartRate: number;
  oxygen: number;
  bloodPressureSys: number;
  bloodPressureDia: number;
}

// Define the type for each alert object
interface Alert {
  text: string;
  action: string;
}

// Function to get alerts based on the entry data
export const getAlerts = (entry: Entry | null): Alert[] => {
  if (!entry) return [];

  const alerts: Alert[] = [];

  if (entry.heartRate > 120)
    {alerts.push({ text: '⚠️ High Heart Rate', action: 'Take rest' });}

  if (entry.oxygen < 95)
    {alerts.push({ text: '🟠 Low Oxygen Level', action: 'Consult a doctor' });}

  if (entry.bloodPressureSys > 140 || entry.bloodPressureDia > 90)
    {alerts.push({ text: '⚠️ High BP', action: 'Drink water' });}

  return alerts;
};

// Function to calculate time ago from ISO string
export const getTimeAgo = (isoString: string): string => {
  const now = new Date();
  const updated = new Date(isoString);
  const diffMs = now.getTime() - updated.getTime();

  const minutes = Math.floor(diffMs / 60000);
  const hours = Math.floor(diffMs / 3600000);
  const days = Math.floor(diffMs / 86400000);

  if (minutes < 1) {return 'Just now';}
  if (minutes < 60) {return `${minutes} min${minutes > 1 ? 's' : ''} ago`;}
  if (hours < 24) {return `${hours} hour${hours > 1 ? 's' : ''} ago`;}
  return `${days} day${days > 1 ? 's' : ''} ago`;
};
