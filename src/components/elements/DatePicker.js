import React from "react";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";

const DatePicker = ({
  disabled = false,
  required = false,
  value,
  onChange,
  label,
  id,
  disabledFuture = false,
}) => {
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <KeyboardDatePicker
        disabled={disabled}
        required={required}
        disableFuture={disabledFuture}
        inputVariant="outlined"
        id={id}
        label={label}
        format="dd/MM/yyyy"
        value={value}
        onChange={onChange}
        KeyboardButtonProps={{
          "aria-label": "change date",
        }}
      />
    </MuiPickersUtilsProvider>
  );
};

export default DatePicker;
