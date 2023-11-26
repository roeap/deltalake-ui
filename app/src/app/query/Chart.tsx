"use client";

import * as rc from "recharts";
import { useSuspenseQuery } from "@tanstack/react-query";
import { tableFromIPC } from "apache-arrow";

import { query as connectQuery } from "@/gen";

type ChartProps = {
  query?: string;
};

export function Chart(props: ChartProps): JSX.Element {
  const connect = connectQuery.useQuery({ query: props.query || "" });

  const { data: queryData } = useSuspenseQuery({
    queryKey: [...connect.queryKey, "arrow"],
    queryFn: async ({ signal }) => {
      const result = await connect.queryFn({
        signal,
        queryKey: connect.queryKey,
        meta: {},
      });
      const table = tableFromIPC(result.data);
      return table.toArray();
    },
  });

  return (
    <rc.ResponsiveContainer width="100%" height="100%">
      <rc.LineChart
        width={500}
        height={300}
        data={queryData}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <rc.CartesianGrid strokeDasharray="3 3" />
        <rc.XAxis dataKey="doubleCol" />
        <rc.YAxis />
        <rc.Tooltip />
        <rc.Legend />
        <rc.Line type="monotone" dataKey="intCol" stroke="#82ca9d" />
      </rc.LineChart>
    </rc.ResponsiveContainer>
  );
}
