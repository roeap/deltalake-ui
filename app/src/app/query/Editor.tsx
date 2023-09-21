"use client";

import { useMemo, useState, useCallback } from "react";
import * as fc from "@fluentui/react-components";
import { EditRegular, CheckmarkRegular } from "@fluentui/react-icons";
import MonacoEditor from "@monaco-editor/react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const useStyles = fc.makeStyles({
  content: {
    display: "flex",
    flexGrow: 1,
    width: 0,
    flexDirection: "column",
    backgroundColor: fc.tokens.colorNeutralBackground3,
  },
  toolbar: {
    height: "52px",
    backgroundColor: fc.tokens.colorNeutralBackground6,
  },
  area: {
    width: "100%",
    height: "300px",
  },
  chart: {
    width: "100%",
    height: 0,
    flexGrow: 1,
  },
});

const data = [
  {
    name: "Page A",
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: "Page B",
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: "Page C",
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: "Page D",
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: "Page E",
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: "Page F",
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: "Page G",
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];

export default function Editor(): JSX.Element {
  const classes = useStyles();
  const [checkedValues, setCheckedValues] = useState<Record<string, string[]>>({
    edit: ["editing"],
  });
  const [selectedValue, setSelectedValue] = useState<fc.TabValue>("query");

  const onTabSelect = useCallback(
    (_event: fc.SelectTabEvent, data: fc.SelectTabData) => {
      setSelectedValue(data.value);
    },
    []
  );

  const onCheckedValueChange = useCallback(
    (
      _ev: any,
      { name, checkedItems }: { name: string; checkedItems: string[] }
    ) => {
      setCheckedValues((s) => {
        return s ? { ...s, [name]: checkedItems } : { [name]: checkedItems };
      });
    },
    []
  );

  const readOnly = useMemo(
    () => !(checkedValues["edit"] || []).includes("editing"),
    [checkedValues]
  );

  return (
    <div className={classes.content}>
      <fc.TabList selectedValue={selectedValue} onTabSelect={onTabSelect}>
        <fc.Tab id={"query"} value={"query"}>
          Query
        </fc.Tab>
        <fc.Tab id={"plot"} value={"plot"}>
          Plot
        </fc.Tab>
      </fc.TabList>
      <fc.Toolbar
        className={classes.toolbar}
        checkedValues={checkedValues}
        onCheckedValueChange={onCheckedValueChange}
      >
        <fc.Tooltip
          content={"Toggle query edit mode."}
          relationship="description"
          withArrow
          showDelay={600}
        >
          <fc.ToolbarToggleButton
            icon={readOnly ? <EditRegular /> : <CheckmarkRegular />}
            name="edit"
            value="editing"
          />
        </fc.Tooltip>
        <fc.ToolbarDivider />
      </fc.Toolbar>
      <MonacoEditor
        height={"200px"}
        width={"100%"}
        defaultValue="SELECT * from my_table"
        language="sql"
        theme="vs-dark"
        options={{
          automaticLayout: true,
          domReadOnly: readOnly,
          readOnly: readOnly,
        }}
      />
      <div className={classes.chart}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            width={500}
            height={300}
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="pv"
              stroke="#8884d8"
              activeDot={{ r: 8 }}
            />
            <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
