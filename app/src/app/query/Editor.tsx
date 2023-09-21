"use client";

import { useMemo, useState, useCallback, useEffect, useRef } from "react";
import * as fc from "@fluentui/react-components";
import { EditRegular, CheckmarkRegular } from "@fluentui/react-icons";
import MonacoEditor, { useMonaco, OnMount } from "@monaco-editor/react";
import * as monaco from "monaco-editor";
import { Chart } from "./Chart";

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

export default function Editor(): JSX.Element {
  const classes = useStyles();
  const editorRef = useRef<monaco.editor.IStandaloneCodeEditor | null>(null);

  const [query, setQuery] = useState(
    'SELECT integer as "intCol", double as "doubleCol" from delta.test.d121_only_struct_stats'
  );
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

  const handleEditorDidMount: OnMount = useCallback((editor, monaco) => {
    editorRef.current = editor;
  }, []);

  const readOnly = useMemo(
    () => !(checkedValues["edit"] || []).includes("editing"),
    [checkedValues]
  );

  useEffect(() => {
    if (readOnly && editorRef.current) {
      setQuery(editorRef.current.getValue());
    }
  }, [readOnly]);

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
        defaultValue="SELECT integer as intCol, double as doubleCol from delta.test.d121_only_struct_stats"
        language="sql"
        theme="vs-dark"
        onMount={handleEditorDidMount}
        options={{
          automaticLayout: true,
          domReadOnly: readOnly,
          readOnly: readOnly,
        }}
      />
      <div className={classes.chart}>
        <Chart query={query} />
      </div>
    </div>
  );
}
