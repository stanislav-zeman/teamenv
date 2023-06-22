"use client";
import {Card, CardBody} from "@chakra-ui/react";
import {FC, ReactNode} from "react";

interface GenericCardProps {
  children?: ReactNode;
  columns: string;
}

const GenericCard: FC<GenericCardProps> = (props) => {
  return (
    <Card variant="elevated" width="100%">
      <CardBody
        display="grid"
        paddingTop="3"
        paddingBottom="3"
        gridTemplateColumns={props.columns}
        maxWidth="full"
        width="full"
        justifyContent="space-between"
        borderRadius="lg"
        backgroundColor="green.700"
        textColor="white"
        fontWeight="bold"
        alignItems="center"
      >
        {props.children}
      </CardBody>
    </Card>
  );
};

export default GenericCard;
