import { Status } from "../../enums/status.enum";

type Stop = {
  id: number;
  place: string;
  details: string;
  bus_id: number;
  status: Status;
};

export default Stop;