import * as React from "react";
import * as Papa from "papaparse";
import Box from "@mui/material/Box";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import { useLocation } from "react-router-dom";
// @ts-ignore
import foodGroupCsvData from "../../data/foodgroups-en_ONPP.csv";
// @ts-ignore
import statementsCsvData from "../../data/fg_directional_satements-en_ONPP.csv";
// @ts-ignore
import servingsCsvData from "../../data/servings_per_day-en_ONPP.csv";
// @ts-ignore
import foodCsvData from "../../data/foods-en_ONPP_rev.csv";
import { UserInfo } from "./UserDetails";

import { styled } from "@mui/system";

const TableHeader = styled("div")({
  color: "white",
  backgroundColor: "#1babbd",
  padding: 8,
  fontSize: 24,
  fontWeight: 700,
  textAlign: "center",
  textTransform: "capitalize",
});

const TableRow = styled("div")({
  borderBottom: "solid 1px black",
  marginTop: 4,
});

type FoodGroupValue = {
  fgid: string;
  foodgroup: string;
  fgcat_id: number;
  fgcat: string;
};

type ServingData = {
  fgid: string;
  gender: string;
  ages: string;
  servings: number;
};

type StatementData = {
  fgid: string;
  "directional-statement": string;
};

type FoodData = {
  fgid: string;
  fgcat_id: number;
  srvg_sz: string;
  food: string;
};

const MealPlan = () => {
  const location = useLocation();
  const { userInfo, familyInfo } = location.state;
  const [foodGroups, setFoodGroups] = React.useState<Array<string>>([]);
  const [foodGroupsData, setFoodGroupsData] = React.useState<
    Array<FoodGroupValue>
  >([]);
  const [statementsData, setStatementsData] = React.useState<
    Array<StatementData>
  >([]);
  const [servingsData, setServingsData] = React.useState<Array<ServingData>>(
    []
  );
  const [foodData, setFoodData] = React.useState<Array<FoodData>>([]);

  const getRandomElements = (arr: any, num: number) => {
    const shuffled = [...arr].sort(() => 0.5 - Math.random());

    return shuffled.slice(0, Math.min(num, arr.length));
  };

  React.useEffect(() => {
    Papa.parse(foodGroupCsvData, {
      header: true,
      download: true,
      dynamicTyping: true,
      complete: (results: { data: Array<FoodGroupValue> }) => {
        const uniqFoodGroups = new Set<string>(); // []

        results.data?.forEach(({ foodgroup }: FoodGroupValue) => {
          if (foodgroup) uniqFoodGroups.add(foodgroup);
        });

        setFoodGroups(Array.from(uniqFoodGroups));
        setFoodGroupsData(results.data);
      },
    });
    Papa.parse(statementsCsvData, {
      header: true,
      download: true,
      dynamicTyping: true,
      complete: (results: { data: Array<StatementData> }) => {
        setStatementsData(results.data);
      },
    });
    Papa.parse(servingsCsvData, {
      header: true,
      download: true,
      dynamicTyping: true,
      complete: (results: { data: Array<ServingData> }) => {
        setServingsData(results.data);
      },
    });
    Papa.parse(foodCsvData, {
      header: true,
      download: true,
      dynamicTyping: true,
      complete: (results: { data: Array<FoodData> }) => {
        setFoodData(results.data);
      },
    });
  }, []);

  const calculateServingSize = (info: UserInfo, foodgroup: string) =>
    servingsData?.find(
      (data: ServingData) =>
        data.gender === info.gender &&
        data.ages === info.age &&
        data.fgid ==
          foodGroupsData?.find(
            (value: FoodGroupValue) => value.foodgroup == foodgroup
          ).fgid
    )?.servings;

  const calculateStatements = (foodgroup: string) =>
    statementsData?.filter(
      (data: StatementData) =>
        data.fgid ==
        foodGroupsData?.find(
          (value: FoodGroupValue) => value.foodgroup == foodgroup
        ).fgid
    );

  return (
    <>
      <Box
        sx={{
          margin: 2,
          textDecoration: "underline",
          textAlign: "center",
          fontSize: 30,
        }}
      >
        Recommended Serving Size Per Day
      </Box>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: `2fr 1fr ${familyInfo
            .map(() => "1fr")
            .join(" ")}`,
        }}
      >
        <TableHeader>Foodgroup</TableHeader>
        <TableHeader>{userInfo.name}</TableHeader>
        {familyInfo.map(({ name }: UserInfo) => (
          <TableHeader key={name}>{name}</TableHeader>
        ))}
        {foodGroups.map((foodgroup) => (
          <React.Fragment key={foodgroup}>
            <TableRow sx={{ padding: 2 }}>
              <Box sx={{ fontWeight: 700, fontSize: 26, color: "darkorange" }}>
                {foodgroup}
              </Box>
              <Box sx={{ fontWeight: 700, fontSize: 18, fontStyle: "italic" }}>
                Meal suggestions -{" "}
              </Box>
              <Box m={1}>
                <ul>
                  {calculateStatements(foodgroup).map((data: StatementData) => (
                    <li key={data["directional-statement"]}>
                      {data["directional-statement"]}
                    </li>
                  ))}
                </ul>
              </Box>
              <Box
                mb={2}
                sx={{ fontWeight: 700, fontSize: 18, fontStyle: "italic" }}
              >
                Food suggestions -{" "}
              </Box>
              {foodGroupsData
                ?.filter(
                  (value: FoodGroupValue) => value.foodgroup === foodgroup
                )
                .map((value: FoodGroupValue) => (
                  <Accordion key={value.fgcat}>
                    <AccordionSummary sx={{}}>
                      <Box sx={{ fontWeight: 600, fontSize: 18 }}>
                        {value.fgcat}
                      </Box>
                    </AccordionSummary>
                    <AccordionDetails>
                      <div>
                        {getRandomElements(
                          foodData.filter(
                            (data: FoodData) => data.fgcat_id === value.fgcat_id
                          ),
                          7
                        ).map((data: FoodData, index: number) => (
                          <div key={`${data.food}-${index}`}>
                            {data.food} - {data.srvg_sz}
                          </div>
                        ))}
                      </div>
                    </AccordionDetails>
                  </Accordion>
                ))}
            </TableRow>
            <TableRow
              sx={{ fontWeight: 600, fontSize: 20, textAlign: "center" }}
            >
              {calculateServingSize(userInfo, foodgroup)}
            </TableRow>
            {familyInfo.map((info: UserInfo) => (
              <TableRow
                key={info.name}
                sx={{ fontWeight: 600, fontSize: 20, textAlign: "center" }}
              >
                {calculateServingSize(info, foodgroup)}
              </TableRow>
            ))}
          </React.Fragment>
        ))}
      </Box>
    </>
  );
};

export default MealPlan;
