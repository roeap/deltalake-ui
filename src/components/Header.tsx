"use client";

import { FC } from "react";
import {
  makeStyles,
  tokens,
  Title3,
  Tooltip,
  ToggleButton,
} from "@fluentui/react-components";
import {
  LightbulbFilament24Regular,
  LightbulbFilament24Filled,
} from "@fluentui/react-icons";

import { useThemeContext } from "./ThemeProvider";

const useStyles = makeStyles({
  header: {
    height: "64px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    paddingLeft: tokens.spacingVerticalL,
    paddingRight: tokens.spacingVerticalL,
    backgroundColor: tokens.colorBrandBackground,
    borderBottomWidth: "1px",
    borderBottomStyle: "solid",
    borderBottomColor: tokens.colorNeutralBackground6,
  },
  firaLabel: { fontFamily: "Fira Code, monospace" },
});

export const Header: FC = () => {
  const styles = useStyles();
  const { theme, setTheme } = useThemeContext();

  return (
    <div className={styles.header}>
      <Title3 className={styles.firaLabel}>Lakehouse Studio</Title3>
      <Tooltip content="Toggle dark mode." relationship="label">
        <ToggleButton
          checked={theme === "dark"}
          appearance="transparent"
          icon={
            theme === "dark" ? (
              <LightbulbFilament24Filled />
            ) : (
              <LightbulbFilament24Regular />
            )
          }
          onClick={() =>
            theme === "dark" ? setTheme("light") : setTheme("dark")
          }
        />
      </Tooltip>
    </div>
  );
};
