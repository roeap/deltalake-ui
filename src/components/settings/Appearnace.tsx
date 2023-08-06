import {
  makeStyles,
  Radio,
  Text,
  Card,
  CardHeader,
  CardPreview,
  RadioGroup,
  RadioGroupProps,
  tokens,
  Field,
} from "@fluentui/react-components";
import { TextEditStyle24Regular } from "@fluentui/react-icons";

import { useThemeContext } from "@/components";

const useStyles = makeStyles({
  footer: { justifyContent: "flex-end" },
  iconConnected: { color: tokens.colorPaletteLightGreenForeground3 },
  preview: { paddingLeft: "24px", paddingRight: "24px", rowGap: "100px" },
});

export const AppearanceCard: React.FC = () => {
  const { theme, setTheme } = useThemeContext();
  const classes = useStyles();

  const onChangeTheme: RadioGroupProps["onChange"] = (_, data) =>
    setTheme(data.value);

  return (
    <Card>
      <CardHeader
        image={<TextEditStyle24Regular />}
        header={<Text>Theme</Text>}
      />
      <CardPreview className={classes.preview}>
        <Field>
          <RadioGroup
            layout="horizontal-stacked"
            value={theme}
            onChange={onChangeTheme}
          >
            <Radio value="dark" label="dark" />
            <Radio value="light" label="light" />
          </RadioGroup>
        </Field>
      </CardPreview>
    </Card>
  );
};
