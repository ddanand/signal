import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

type UserDetailsProps = {
  index?: number;
  saveInfo: (info: UserInfo, index: number) => void;
};
export type UserInfo = {
  name: string;
  gender: string;
  age: string;
};

const UserDetails = (props: UserDetailsProps) => {
  const [name, setName] = React.useState("");
  const handleName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
    saveForm({ name: event.target.value, gender, age });
  };

  const [age, setAge] = React.useState("");
  const handleAge = (event: SelectChangeEvent) => {
    setAge(event.target.value as string);
    saveForm({ name, gender, age: event.target.value });
  };

  const [gender, setGender] = React.useState("");
  const handleGender = (event: SelectChangeEvent) => {
    setGender(event.target.value as string);
    saveForm({ name, gender: event.target.value, age });
  };

  const ageOptions = [
    "2 to 3",
    "4 to 8",
    "9 to 13",
    "14 to 18",
    "19 to 30",
    "31 to 50",
    "51 to 70",
    "71+",
  ];

  const genderOptions = ["Male", "Female"];

  const saveForm = (info: UserInfo) => {
    props.saveInfo(info, props.index);
  };

  return (
    <>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        sx={{
          marginTop: 4,
        }}
      >
        <TextField required label="Name" value={name} onChange={handleName} />

        <FormControl sx={{ width: 200, marginLeft: 1, marginRight: 1 }}>
          <InputLabel id="gender-label">Gender *</InputLabel>
          <Select
            required
            labelId="gender-label"
            value={gender}
            label="Gender"
            onChange={handleGender}
          >
            {genderOptions.map((item) => (
              <MenuItem key={item} value={item}>{item}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <Box>
          <FormControl sx={{ width: 200 }}>
            <InputLabel id="demo-simple-select-label">Age *</InputLabel>
            <Select
              required
              labelId="demo-simple-select-label"
              value={age}
              label="Age"
              onChange={handleAge}
            >
              {ageOptions.map((item) => (
                <MenuItem key={item} value={item}>{item}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
        {/* <Button sx={{ marginLeft: 2 }} variant="outlined" onClick={saveForm}>
          Save
        </Button> */}
      </Box>
    </>
  );
};

export default UserDetails;
