import React, { useEffect, useState } from "react";
import styled from "styled-components";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import { FormControl, TextField, Button } from "@material-ui/core";

const Profile = ({ user }) => {
  const [dateOfBirth, setdateOfBirth] = useState(null);

  useEffect(() => {
    setdateOfBirth(JSON.parse(user.dateOfBirth));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ProfileContainer>
      <TextField
        margin="normal"
        id="displayName"
        label="First Name"
        variant="outlined"
        value={user.displayName}
        type="text"
        disabled={true}
      />

      <TextField
        margin="normal"
        id="email"
        label="e-mail"
        variant="outlined"
        value={user.email}
        type="text"
        disabled={true}
      />

      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <KeyboardDatePicker
          required
          margin="normal"
          disableFuture
          inputVariant="outlined"
          id="dateOfBirth"
          label="Date of Birth"
          format="dd/MM/yyyy"
          value={dateOfBirth}
          onChange={setdateOfBirth}
          KeyboardButtonProps={{
            "aria-label": "change date",
          }}
        />
      </MuiPickersUtilsProvider>
    </ProfileContainer>
  );
};

export default Profile;

const ProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;
