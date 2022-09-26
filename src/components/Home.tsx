import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import UserDetails, { UserInfo } from "./UserDetails";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const formRef = React.useRef<any>();
  const [userInfo, setUserInfo] = React.useState<UserInfo>();
  const [familyInfo, setFamilyInfo] = React.useState([]);

  let navigate = useNavigate();

  const addFamilyMember = () => {
    const updatedFamilyInfo = [...familyInfo];

    updatedFamilyInfo.push({
      name: "",
      gender: "",
      age: "",
    });
    setFamilyInfo(updatedFamilyInfo);
  };

  const saveInfo = (info: UserInfo, index: number) => {
    if (index === undefined) {
      setUserInfo(info);
      return;
    }
    const updatedFamilyInfo = [...familyInfo];
    updatedFamilyInfo[index] = {
      name: info.name,
      gender: info.gender,
      age: info.age,
    };
    setFamilyInfo(updatedFamilyInfo);
  };

  const submitForm = () => {
    if (formRef && formRef.current) {
      if (formRef.current.reportValidity())
        navigate("/meal-plan", { state: { userInfo, familyInfo }});
    }
    console.log(userInfo, familyInfo);
  };

  return (
    <form ref={formRef}>
      <Typography
        textAlign="center"
        variant="h3"
        component="h3"
        marginTop={2}
        p={2}
        sx={{
          color: "white",
          backgroundColor: "#127582",
        }}
      >
        Healthy Food Guide
      </Typography>
      <Typography
        textAlign="center"
        variant="h6"
        component="h6"
        sx={{ margin: "2rem 50px 0" }}
      >
        <Box>Welcome to your daily healthy meal plan</Box>
        <Box>
          Our application suggests the best meal plan & servings based on your
          Gender & Age group
        </Box>
      </Typography>
      <Box mt={2} sx={{ textAlign: "center", fontSize: 20 }}>
        Please enter your details below
      </Box>
      <UserDetails saveInfo={saveInfo} />
      {familyInfo.length > 0 && (
        <Box mt={2} sx={{ textAlign: "center", fontSize: 20 }}>
          Enter Family details below
        </Box>
      )}

      {familyInfo.map((item, index) => (
        <UserDetails key={index} saveInfo={saveInfo} index={index} />
      ))}
      <Box
        sx={{
          marginTop: 2,
          textDecoration: "underline",
          cursor: "pointer",
          textAlign: "center",
        }}
        onClick={addFamilyMember}
      >
        Add Family +
      </Box>
      <Button
        sx={{ marginLeft: 2, margin: "auto", display: "flex", marginTop: 2 }}
        variant="contained"
        onClick={submitForm}
      >
        Submit
      </Button>
    </form>
  );
};

export default Home;
