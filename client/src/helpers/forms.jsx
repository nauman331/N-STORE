import {
  AtSign,
  KeyRound,
  Hash,
  User,
  Phone,
  Upload,
  ClipboardType,
  LayoutList,
  HandCoins,
  Percent,
  ChartNoAxesCombined,
  House,
} from "lucide-react";

const registerdata = [
  {
    icon: <User />,
    type: "text",
    name: "username",
    placeholder: "Enter your username",
  },
  {
    icon: <AtSign />,
    type: "email",
    name: "email",
    placeholder: "Enter your email",
  },
  {
    icon: <Phone />,
    type: "number",
    name: "phone",
    placeholder: "Enter your Phone Number",
  },
  {
    icon: <KeyRound />,
    type: "password",
    name: "password",
    placeholder: "Enter your password",
  },
];

const logindata = [
  {
    icon: <AtSign />,
    type: "email",
    name: "email",
    placeholder: "Enter your email",
  },
  {
    icon: <KeyRound />,
    type: "password",
    name: "password",
    placeholder: "Enter your password",
  },
];

const productdata = [
  {
    icon: <Upload />,
    type: "file",
    name: "productimage",
    placeholder: "Select image of Product",
  },
  {
    icon: <ClipboardType />,
    type: "text",
    name: "title",
    placeholder: "Enter Title of Product",
  },
  {
    icon: <LayoutList />,
    type: "text",
    name: "category",
    placeholder: "Enter Specified Category",
  },
  {
    icon: <ChartNoAxesCombined />,
    type: "number",
    name: "stock",
    placeholder: "Enter Total Stock",
  },
  {
    icon: <HandCoins />,
    type: "number",
    name: "price",
    placeholder: "Enter Price of Product",
  },
  {
    icon: <Percent />,
    type: "number",
    name: "discountedprice",
    placeholder: "Enter discounted price(optional)",
  },
];

const updateuserdata = [
  {
    icon: <Upload />,
    type: "file",
    name: "profile",
    placeholder: "Select Profile Pic",
  },
  {
    icon: <User />,
    type: "text",
    name: "username",
    placeholder: "Enter your username",
  },
  {
    icon: <AtSign />,
    type: "email",
    name: "email",
    placeholder: "Enter your email",
  },
  {
    icon: <Phone />,
    type: "number",
    name: "phone",
    placeholder: "Enter your Phone Number",
  },
  {
    icon: <House />,
    type: "string",
    name: "address",
    placeholder: "Enter your Address",
  },
];

const proofdata = [
  {
    icon: <Upload />,
    type: "file",
    name: "proofpic",
    placeholder: "Select Proof Pic",
  },
  {
    icon: <Hash />,
    type: "text",
    name: "tId",
    placeholder: "Enter Transaction Id",
  },
];

export { registerdata, logindata, productdata, updateuserdata, proofdata };
