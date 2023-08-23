"use client";
import { Title, Header, createStyles } from "@mantine/core";

const useStyles = createStyles((theme) => ({
  header: {
    backgroundColor: theme.fn.variant({
      variant: "filled",
      color: theme.primaryColor,
    }).background,
  },
}));

export default function Hdr() {
  const { classes } = useStyles();

  return (
    <Header height={54} className={classes.header}>
      <Title order={1} tt="uppercase" mx="1rem">
        Stardew Checklist
      </Title>
    </Header>
  );
}
