"use client";

import { Fragment, useMemo } from "react";
import {
  makeStyles,
  shorthands,
  tokens,
  ButtonProps,
} from "@fluentui/react-components";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbButton,
  BreadcrumbDivider,
  BreadcrumbProps,
} from "@fluentui/react-breadcrumb-preview";
import { SharingContext } from "@/clients";
import { usePathname } from "next/navigation";

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    flexGrow: 1,
    backgroundColor: tokens.colorNeutralBackground3,
  },
  header: {
    height: "64px",
    width: "100%",
    display: "flex",
    backgroundColor: tokens.colorNeutralBackground3,
    alignItems: "center",
    paddingLeft: "10px",
    ...shorthands.borderBottom("1px", "solid", tokens.colorNeutralBackground6),
  },
  content: {
    display: "flex",
    flexDirection: "row",
    flexGrow: 1,
    backgroundColor: tokens.colorNeutralBackground3,
  },
});

const servers = {
  "1": {
    name: "Production data",
    description: "Awesome data to share",
    url: "http://localhost:8080",
  },
  "2": {
    name: "Business data",
    description: "Awesome data to share",
    url: "http://localhost:8080",
  },
};

type Item = {
  item?: string;
  linkProps?: {
    "aria-label"?: string;
    href?: string;
    icon?: ButtonProps["icon"];
    disabled?: boolean;
  };
};

function renderLink(idx: number, el: Item, isLastItem: boolean = false) {
  return (
    <Fragment key={`${idx}-link`}>
      <BreadcrumbItem>
        <BreadcrumbButton {...el.linkProps} current={isLastItem} as="a">
          {el.item}
        </BreadcrumbButton>
      </BreadcrumbItem>
      {!isLastItem && <BreadcrumbDivider />}
    </Fragment>
  );
}

function getLinkItems(pathname: string | null): Item[] {
  const navItems: Item[] = [
    {
      item: "Delta Sharing",
      linkProps: {
        href: "/delta-sharing",
      },
    },
  ];
  const segments = pathname?.split("/").filter(Boolean);
  if (!segments) return navItems;

  if (segments.length > 1) {
    navItems.push({
      item: `Server ${segments[1]}`,
      linkProps: {
        href: `/${segments.slice(0, 2).join("/")}`,
      },
    });
  }
  if (segments.length > 2) {
    navItems.push({
      item: segments[2],
      linkProps: {
        href: `/${segments.slice(0, 3).join("/")}`,
      },
    });
  }
  if (segments.length > 3) {
    navItems.push({
      item: segments[3],
      linkProps: {
        href: `/${segments.slice(0, 4).join("/")}`,
      },
    });
  }

  return navItems;
}

export default function SharingLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  const styles = useStyles();
  const pathname = usePathname();
  const navItems = useMemo(() => getLinkItems(pathname), [pathname]);

  return (
    <SharingContext.Provider value={{ servers }}>
      <div className={styles.root}>
        <div className={styles.header}>
          <Breadcrumb
            aria-label="Delta Sharing navigation"
            size="large"
            appearance="transparent"
          >
            {navItems.map((el, idx) =>
              renderLink(idx, el, idx === navItems.length - 1)
            )}
          </Breadcrumb>
        </div>
        <div className={styles.content}>{children}</div>
      </div>
    </SharingContext.Provider>
  );
}
