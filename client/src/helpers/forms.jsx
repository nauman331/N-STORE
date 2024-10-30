import { AtSign, KeyRound, User } from "lucide-react";


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

export { registerdata, logindata };
