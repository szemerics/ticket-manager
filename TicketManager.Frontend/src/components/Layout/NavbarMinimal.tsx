import { useContext, useEffect, useState } from "react";
import { rem, Button, useMantineTheme } from "@mantine/core";
import {
  IconUserCircle,
  IconLogout,
  IconHome,
  IconDeviceTv,
} from "@tabler/icons-react";
import classes from "./NavbarMinimalColored.module.css";
import { useNavigate } from "react-router-dom";
import { useMediaQuery } from "@mantine/hooks";
import useAuth from "../../hooks/useAuth.tsx";
import { roleKeyName } from "../../constants/constants";

interface NavbarLinkProps {
  icon: typeof IconHome;
  label: string;
  color: string;
  active?: boolean;
  onClick?(): void;
}

function NavbarLink({
  icon: Icon,
  label,
  color,
  active,
  onClick,
}: NavbarLinkProps) {
  return (
    <div
      role="button"
      className={classes.link}
      onClick={onClick}
      data-active={active || undefined}
    >
      <Button
        variant="light"
        color={color}
        className={classes.iconButton}
        style={{
          width: rem(40),
          height: rem(40),
          flexGrow: 0,
          flexShrink: 0,
          flexBasis: rem(40),
        }}
      >
        <Icon
          className={classes.linkIcon}
          style={{
            width: rem(25),
            height: rem(25),
            flexGrow: 0,
            flexShrink: 0,
            flexBasis: rem(25),
          }}
          stroke={1.8}
        />
      </Button>
      <span>{label}</span>
    </div>
  );
}

export function NavbarMinimal({ toggle }: any) {
  const theme = useMantineTheme();
  const isMobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);
  const [active, setActive] = useState(0);
  const navigate = useNavigate();
  const { logout } = useAuth();

  const rolesString = localStorage.getItem(roleKeyName);
  const userRoles =
    typeof rolesString === "string"
      ? rolesString.split(",").map((r) => r.trim())
      : [];

  const menuItems = [
    {
      icon: IconHome,
      label: "Dashboard",
      url: "dashboard",
      roles: ["Admin", "Cashier", "Customer"],
    },
    {
      icon: IconDeviceTv,
      label: "Movies",
      url: "movies",
      roles: ["Admin"],
    },
  ];

  const onLogout = () => {
    logout();
  };

  useEffect(() => {
    setActive(menuItems.findIndex((m) => location.pathname === m.url));
  }, []);

  const links = menuItems
    .filter((link) =>
      userRoles.some((role) => link.roles.includes(role))
    )
    .map((link, index) => (
      <NavbarLink
        color="app-color"
        {...link}
        key={link.label}
        active={index === active}
        onClick={async () => {
          setActive(index);
          toggle();
          navigate(link.url);
        }}
      />
    ));

  return (
    <nav className={classes.navbar}>
      <div>
        <div className={classes.navbarMain}>{links}</div>
        <div
          className={classes.footer}
          style={{ width: !isMobile ? "216px" : "90%" }}
        >
          <NavbarLink
            active={location.pathname === "/profile"}
            icon={IconUserCircle}
            label="Profile"
            onClick={() => {
              navigate("profile");
              toggle();
            }}
            color="grape"
          />
          <NavbarLink
            icon={IconLogout}
            label={"Logout"}
            onClick={onLogout}
            color="grape"
          />
        </div>
      </div>
    </nav>
  );
}
