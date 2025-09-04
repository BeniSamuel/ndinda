import { Status } from "../../enums/status.enum";
import Stop from "../../types/stop/stop.type";

const stops: Stop[] = [
  {
    id: 1,
    place: "Roix Point (Rebero)",
    details: "Rebero-roix-point",
    status: Status.ARRIVED,
    bus_id: 1,
  },
  {
    id: 2,
    place: "Roix Point (Rebero)",
    details: "Rebero-roix-point",
    status: Status.PASSED,
    bus_id: 1,
  },
  {
    id: 3,
    place: "Roix Point (Rebero)",
    details: "Rebero-roix-point",
    status: Status.PASSED,
    bus_id: 1,
  },
  {
    id: 4,
    place: "Roix Point (Rebero)",
    details: "Rebero-roix-point",
    status: Status.PASSED,
    bus_id: 1,
  },
];

export default stops;
