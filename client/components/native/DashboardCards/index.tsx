import { Card } from "@/components/ui/card";
import { ReactElement } from "react";

type CardContainerArgs = {
  title: string;
  value: string | number;
  color: string;
  icon?: ReactElement<any, any>;
};

const CardContainer = ({ title, value, color, icon }: CardContainerArgs) => {
  return (
    <Card
      className="p-3 text-center font-bold text-white text-xl shadow-lg"
      style={{
        backgroundColor: color,
      }}
    >
      <div className="absolute text-[8rem] opacity-15">
        {icon ? icon : null}
      </div>
      <h3 className="tracking-tight">{title}</h3>
      <p>{value}</p>
    </Card>
  );
};

const DashboardCards = ({ infoArray }: { infoArray: CardContainerArgs[] }) => {
  return (
    <div className="grid grid-cols-3 gap-2 my-2">
      {infoArray.map(({ color, title, value, icon }) => (
        <CardContainer
          key={`${color}-${title}-${value}`}
          color={color}
          title={title}
          value={value}
          icon={icon}
        />
      ))}
    </div>
  );
};

export default DashboardCards;
