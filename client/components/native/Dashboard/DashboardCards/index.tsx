import { Card } from "@/components/ui/card";
import { ReactElement } from "react";
import { GenericTooltip } from "../..";

type CardContainerArgs = {
  title: string;
  value: string | number;
  color: string;
  icon?: ReactElement<any, any>;
  description?: string;
};

const CardContainer = ({
  description,
  title,
  value,
  color,
  icon,
}: CardContainerArgs) => {
  return (
    <Card
      className="p-3 text-center font-bold text-white text-xl shadow-lg relative"
      style={{
        backgroundColor: color,
      }}
    >
      <div className="absolute text-[8rem] opacity-15">
        {icon ? icon : null}
      </div>
      <div className="flex flex-row gap-1 justify-center">
        <h3 className="tracking-tight">{title}</h3>
        {description && <GenericTooltip content={description} />}
      </div>
      <p>{value}</p>
    </Card>
  );
};

const DashboardCards = ({ infoArray }: { infoArray: CardContainerArgs[] }) => {
  return (
    <div className="grid sm:grid-cols-1 lg:grid-cols-3 gap-2 my-2">
      {infoArray.map(({ description, color, title, value, icon }) => (
        <CardContainer
          key={`${color}-${title}-${value}`}
          color={color}
          title={title}
          value={value}
          icon={icon}
          description={description}
        />
      ))}
    </div>
  );
};

export default DashboardCards;
