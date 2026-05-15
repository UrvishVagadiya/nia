"use client";

import React, { useCallback } from "react";
import { useField, FieldLabel, DatePicker } from "@payloadcms/ui";
import { format, parseISO, isValid } from "date-fns";

const EventDatePicker: React.FC<{ path: string }> = () => {
  const { value: dateValue, setValue: setDateValue } = useField<string>({ path: "date" });
  const { setValue: setDayValue } = useField<string>({ path: "day" });

  const onChange = useCallback(
    (incomingDate: Date | string) => {
      if (!incomingDate) return;

      const dateObj = typeof incomingDate === "string" ? parseISO(incomingDate) : incomingDate;

      if (!isValid(dateObj)) return;

      setDayValue(format(dateObj, "EEEE"));

      setDateValue(format(dateObj, "MMM d"));
    },
    [setDateValue, setDayValue]
  );

  return (
    <div className="field-type" style={{ marginBottom: "25px" }}>
      <FieldLabel label="Auto-select Day & Date" />

      <div style={{ width: "300px" }}>
        <DatePicker
          onChange={onChange}
          placeholder="Select a date..."
          displayFormat="MMM d, yyyy"
        />
      </div>

      <p style={{ fontSize: "11px", marginTop: "8px", opacity: 0.6 }}>
        Select a date to automatically fill the Day and Date fields below.
      </p>
    </div>
  );
};

export default EventDatePicker;
