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
  };

  const [age, setAge] = React.useState("");
  const handleAge = (event: SelectChangeEvent) => {
    setAge(event.target.value as string);
  };

  const [gender, setGender] = React.useState("");
  const handleGender = (event: SelectChangeEvent) => {
    setGender(event.target.value as string);
  };

  const ageOptions = [
    {
      label: "2-3",
      value: "2-3",
    },
    {
      label: "4-8",
      value: "4-8",
    },
    {
      label: "9-13",
      value: "9-13",
    },
    {
      label: "14-18",
      value: "14-18",
    },
    {
      label: "19-30",
      value: "19-30",
    },
    {
      label: "31-50",
      value: "31-50",
    },
    {
      label: "51-70",
      value: "51-70",
    },
    {
      label: "71+",
      value: "71+",
    },
  ];

  const genderOptions = ["Male", "Female"];

  const saveForm = () => {
    props.saveInfo(
      {
        name,
        gender,
        age,
      },
      props.index
    );
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
              <MenuItem value={item}>{item}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <Box>
          <FormControl sx={{ width: 200 }}>
            <InputLabel id="demo-simple-select-label">Age *</InputLabel>
            <Select
              required
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={age}
              label="Age"
              onChange={handleAge}
            >
              {ageOptions.map((item) => (
                <MenuItem value={item.value}>{item.label}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
        <Button sx={{ marginLeft: 2 }} variant="outlined" onClick={saveForm}>
          Save
        </Button>
      </Box>
    </>
  );
};

export default UserDetails;
