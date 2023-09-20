"use client";

import { Fragment, useMemo, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
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
} from "@fluentui/react-breadcrumb-preview";
import { TableSimpleMultipleRegular } from "@fluentui/react-icons";
import { useSuspenseQuery } from "@suspensive/react-query";

import { SharingContext } from "@/clients";
import { listSharingServers } from "@/gen";

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
        icon: <TableSimpleMultipleRegular />,
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
  const [servers, setServers] = useState({});
  const pathname = usePathname();
  const { data } = useSuspenseQuery(listSharingServers.useQuery({}));
  const navItems = useMemo(() => getLinkItems(pathname), [pathname]);

  useEffect(() => {
    const serverMap = Object.fromEntries(data.servers.map((el) => [el.id, el]));
    setServers(serverMap);
  }, [data.servers]);

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
