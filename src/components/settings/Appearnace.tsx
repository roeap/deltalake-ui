import {
  Button,
  makeStyles,
  shorthands,
  Radio,
  Label,
  useId,
  Text,
  Card,
  CardHeader,
  CardPreview,
  CardFooter,
  Input,
  InputProps,
  Slider,
  Switch,
  RadioGroup,
  RadioGroupProps,
  tokens,
  Field,
} from "@fluentui/react-components";
import {
  TextEditStyle24Regular,
  CloudOff24Regular,
  CloudCheckmark24Regular,
  ContentSettings24Regular,
} from "@fluentui/react-icons";

import { useThemeContext } from "@/components";

const useStyles = makeStyles({
  root: {
    ...shorthands.padding("15px", "15px", "15px", "15px"),
    display: "flex",
    flexDirection: "column",
    rowGap: "25px",
    flexGrow: 1,
  },
  footer: { justifyContent: "flex-end" },
  iconConnected: { color: tokens.colorPaletteLightGreenForeground3 },
  preview: { paddingLeft: "24px", rowGap: "100px" },
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
        header={<Text>Appearance</Text>}
      />
      <CardPreview className={classes.preview}>
        <Field label="App theme">
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
