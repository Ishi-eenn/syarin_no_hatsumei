export const formFields = [
  {
    name: "title",
    label: "題名",
    placeHolder: "題名を入力",
    validateTrigger:['onChange'],
    rules:[
      {
        required: true,
        message: '題名を入力してください',
      },
    ]
  },
  {
    name: "width",
    label: "ページ数",
    placeHolder: "ページ数を入力",
    validateTrigger:['onChange'],
    rules:[
      {
        required: true,
        message: '数字を入力してください',
      },
    ]
  },
];

export const keywordFormFields = {
  name: "keyword",
  placeHolder: "キーワードまたはisbnを入力",
  validateTrigger:['onChange'],
  rules:[
    {
      required: true,
      message: '入力してください',
    },
  ],
}