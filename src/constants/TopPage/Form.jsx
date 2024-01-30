export const formFields = [
  {
    name: "title",
    label: "本棚の名前",
    placeHolder: "",
    validateTrigger:['onChange'],
    rules:[
      {
        required: true,
        message: '名前を入力してください',
      },
    ]
  },
  {
    name: "w",
    label: "横(cm)",
    placeHolder: "10",
    validateTrigger:['onChange'],
    rules:[
      {
        required: true,
        message: '横幅を入力してください',
      },
    ]
  },
  {
    name: "boards",
    label: "板の枚数(枚)",
    placeHolder: "2",
    validateTrigger:['onChange'],
    rules:[
      {
        required: true,
        message: '板を入力してください',
      },
    ]
  },
];