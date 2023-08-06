import { Suspense, useState, FC } from "react";
import {
  ArrowRoutingRectangleMultiple24Regular,
  BuildingFactoryRegular,
} from "@fluentui/react-icons";
import {
  TabList,
  Tab,
  TabListProps,
  Label,
  makeStyles,
  tokens,
} from "@fluentui/react-components";

import { Loading } from "@/components";
import { DeltalakeIcon, GraphQLIcon, DeltaSharingIcon } from "@/icons";

const useStyles = makeStyles({
  root: {
    height: "100vh",
    width: "100vw",
    top: 0,
    left: 0,
    fontFamily: "Fira Code, monospace",
  },
  content: { height: "calc(100vh - 45px)", display: "flex" },
  tabList: { height: "45px" },
  firaLabel: { fontFamily: "Fira Code, monospace" },
  connected: { color: tokens.colorPaletteLightGreenForeground1 },
});

export const Studio: FC<{ children: React.ReactNode }> = ({ children }) => {
  const classes = useStyles();
  const [selectedValue, setSelectedValue] = useState("network");

  const onTabSelect: TabListProps["onTabSelect"] = (_event, data) => {
    setSelectedValue(data.value as string);
  };

  return (
    <div className={classes.root}>
      <TabList
        selectedValue={selectedValue}
        onTabSelect={onTabSelect}
        size="medium"
        className={classes.tabList}
      >
        <Tab id="studio" value="studio">
          <Label size="large" className={classes.firaLabel}>
            Lakehouse Studio
          </Label>
        </Tab>
        <Tab
          id="network"
          icon={<ArrowRoutingRectangleMultiple24Regular />}
          value="network"
        >
          <Label>Network</Label>
        </Tab>
        <Tab
          id="delta-sharing"
          icon={<DeltaSharingIcon height={16} width={16} />}
          value="delta-sharing"
        >
          <Label>Delta Sharing</Label>
        </Tab>
        <Tab
          id="delta"
          icon={<DeltalakeIcon height={16} width={16} />}
          value="delta"
        >
          <Label>Delta Inspect</Label>
        </Tab>
        <Tab
          id="graphql"
          icon={<GraphQLIcon height={16} width={16} />}
          value="graphql"
        >
          <Label>GraphQL</Label>
        </Tab>
      </TabList>
      <Suspense fallback={<Loading />}>{children}</Suspense>
    </div>
  );
};
