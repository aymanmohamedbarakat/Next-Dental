import { useState } from "react";

export const useSelectedAppointment = () => {
  const [selectedAppointment, setSelectedAppointment] = useState(null);

  return { selectedAppointment, setSelectedAppointment };
};  