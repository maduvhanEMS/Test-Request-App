import { FaHome, FaCalendarAlt, FaBook, FaProductHunt } from "react-icons/fa";
import { HiOutlineDocumentReport } from "react-icons/hi";

// eslint-disable-next-line import/no-anonymous-default-export
export default [
  {
    name: "Dashboard",
    icon: <FaHome />,
    path: "/",
  },
  {
    name: "Product",
    icon: <FaProductHunt />,
    path: "/product",
    submenu: [
      {
        name: "Test Requests",
        path: "/product",
      },
      {
        name: "New Test Request",
        path: "/newRequest",
      },
    ],
  },
  {
    name: "Book In",
    icon: <FaBook />,
    path: "/bookin",
  },
  {
    name: "Test Schedule",
    icon: <FaCalendarAlt />,
    path: "/test_schedule",
  },
  {
    name: "Reports",
    icon: <HiOutlineDocumentReport />,
    path: "/reports",
  },
];
