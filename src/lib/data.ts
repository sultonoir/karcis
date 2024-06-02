import { CalendarPlus, CompassIcon, Settings } from "lucide-react";
import { MdDashboard, MdOutlineEventNote } from "react-icons/md";
import { TbTicket } from "react-icons/tb";

export const dummy = {
  navbar: [
    {
      title: "Create event",
      path: "/create-event",
      icon: CalendarPlus,
    },
    {
      title: "Exolore",
      path: "/discover",
      icon: CompassIcon,
    },
  ],
  category: [
    {
      value: "festival",
      label: "Festival",
    },
    {
      value: "concert",
      label: "Concert",
    },
    {
      value: "stand-up",
      label: "Stand-up",
    },
    {
      value: "conference",
      label: "Conference",
    },
    {
      value: "workshop",
      label: "Workshop",
    },
    {
      value: "show",
      label: "Show",
    },
    {
      value: "tournaments",
      label: "Tournaments",
    },
    {
      value: "seminar",
      label: "Seminar",
    },
    {
      value: "talk show",
      label: "Talk Show",
    },
    {
      value: "trip",
      label: "Trip",
    },
  ],
  hour: [
    {
      value: "00",
      label: "00",
    },
    {
      value: "01",
      label: "01",
    },
    {
      value: "02",
      label: "02",
    },
    {
      value: "03",
      label: "03",
    },
    {
      value: "04",
      label: "04",
    },
    {
      value: "05",
      label: "05",
    },
    {
      value: "06",
      label: "06",
    },
    {
      value: "07",
      label: "07",
    },
    {
      value: "08",
      label: "08",
    },
    {
      value: "09",
      label: "09",
    },
    {
      value: "10",
      label: "10",
    },
    {
      value: "11",
      label: "11",
    },
    {
      value: "12",
      label: "12",
    },
  ],
  minut: [
    {
      value: "00",
      label: "00",
    },
    {
      value: "10",
      label: "10",
    },
    {
      value: "15",
      label: "15",
    },
    {
      value: "20",
      label: "20",
    },
    {
      value: "25",
      label: "25",
    },
    {
      value: "30",
      label: "30",
    },
    {
      value: "35",
      label: "35",
    },
    {
      value: "40",
      label: "40",
    },
    {
      value: "45",
      label: "45",
    },
    {
      value: "50",
      label: "50",
    },
    {
      value: "55",
      label: "55",
    },
  ],
  ampm: [
    {
      value: "am",
      label: "AM",
    },
    {
      value: "pm",
      label: "PM",
    },
  ],
  profile: [
    {
      title: "Dashboard",
      icons: MdDashboard,
      path: `/member`,
    },
    {
      title: "My event",
      icons: MdOutlineEventNote,
      path: `/member/my-event`,
    },
    {
      title: "My ticket",
      icons: TbTicket,
      path: `/member/my-ticket`,
    },
    {
      title: "Settings",
      icons: Settings,
      path: `/settings`,
    },
  ],
  sidebar: [
    {
      title: "Dashboard",
      icons: MdDashboard,
      path: `/member`,
    },
    {
      title: "My event",
      icons: MdOutlineEventNote,
      path: `/member/my-event`,
    },
  ],
};
