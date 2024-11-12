import { AtSign, KeyRound, User, Phone, Upload, ClipboardType, LayoutList, HandCoins, Percent} from "lucide-react";


const registerdata = [
  {
    icon: <User />,
    type: 'text',
    name: 'username',
    placeholder: 'Enter your username'
  },
  {
    icon: <AtSign />,
    type: 'email',
    name: 'email',
    placeholder: 'Enter your email'
  },
  {
    icon: <Phone />,
    type: 'number',
    name: 'phone',
    placeholder: 'Enter your Phone Number'
  },
  {
    icon: <KeyRound />,
    type: 'password',
    name: 'password',
    placeholder: 'Enter your password'
  },
];

const logindata = [
    {
      icon: <AtSign />,
      type: 'email',
      name: 'email',
      placeholder: 'Enter your email'
    },
    {
      icon: <KeyRound />,
      type: 'password',
      name: 'password',
      placeholder: 'Enter your password'
    },
  ];

  const productdata = [
    {
      icon: <Upload />,
      type: 'file',
      name: 'productimage',
      placeholder: 'Select image of Product'
    },
    {
      icon: <ClipboardType />,
      type: 'text',
      name: 'title',
      placeholder: 'Enter Title of Product'
    },
    {
      icon: <LayoutList />,
      type: 'text',
      name: 'category',
      placeholder: 'Enter Specified Category'
    },
    {
      icon: <HandCoins />,
      type: 'number',
      name: 'price',
      placeholder: 'Enter Price of Product'
    },
    {
      icon: <Percent />,
      type: 'number',
      name: 'discountedprice',
      placeholder: 'Enter discounted price(optional)'
    },
  ]

export { registerdata, logindata, productdata };
