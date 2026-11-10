type EventDateTimeFieldProps = {
  name: string;
  label: string;
  value: string;
  min?: string;
  disabled?: boolean;
  onChange: (value: string) => void;
};

const hours = Array.from({ length: 24 }, (_, index) => String(index).padStart(2, "0"));
const minutes = Array.from({ length: 12 }, (_, index) => String(index * 5).padStart(2, "0"));

export function EventDateTimeField({ name, label, value, min, disabled, onChange }: EventDateTimeFieldProps) {
  const [date = "", time = "00:00"] = value.split("T");
  const [hour, minute] = time.split(":");
  const [minDate, minTime] = min?.split("T") ?? [];
  const [minHour, minMinute] = minTime?.split(":") ?? [];
  const isMinDate = date === minDate;

  return (
    <div className="event-date-time-field">
      <label htmlFor={`${name}-date`}>{label}</label>
      <input
        id={`${name}-date`}
        aria-label={`${label}: datum`}
        type="date"
        value={date}
        min={minDate}
        disabled={disabled}
        required
        onChange={(event) => onChange(event.target.value ? `${event.target.value}T${time}` : "")}
      />
      <div className="event-time-selects">
        <select
          aria-label={`${label}: sat`}
          value={hour}
          disabled={disabled || !date}
          onChange={(event) => onChange(`${date}T${event.target.value}:${minute}`)}
        >
          {hours.map((option) => (
            <option key={option} disabled={isMinDate && option < minHour}>{option}</option>
          ))}
        </select>
        <span aria-hidden="true">:</span>
        <select
          aria-label={`${label}: minute`}
          value={minute}
          disabled={disabled || !date}
          onChange={(event) => onChange(`${date}T${hour}:${event.target.value}`)}
        >
          {minutes.map((option) => (
            <option key={option} disabled={isMinDate && hour === minHour && option < minMinute}>{option}</option>
          ))}
        </select>
      </div>
      <input name={name} type="hidden" value={value} />
    </div>
  );
}
