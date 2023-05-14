export const toastErrorMessages = {
  emptyFile:
    "At least one image is required to post a project, please try again.",
  tokenLost: "Project create fail due to login status lost.",
  uploadIssue: "File upload failed, contact technical support.",
  deleteIssue: "File delete failed, contact technical support.",
  requiredFields: "Fields marked with * are required!",
};

export const Roles = [
  { value: "client", label: "Client" },
  { value: "maker", label: "Maker" },
];

// ZT-NOTE: LEGACY CODE
// export const Categories = [
//   { value: "General", label: "General" },
//   { value: "Dress", label: "Dress" },
//   { value: "Jacket", label: "Jacket" },
//   { value: "Shirt", label: "Shirt" },
//   { value: "Pants", label: "Pants" },
//   { value: "Sportswear", label: "Sportswear" },
//   { value: "Jumpsuit", label: "Jumpsuit" },
//   { value: "Smart casual", label: "Smart casual" },
//   { value: "Accessories", label: "Accessories" },
//   { value: "Others", label: "Others" },
// ];

// export const Tags = [
//   { value: "Fitting", label: "Fitting" },
//   { value: "Custom Design", label: "Custom Design" },
//   { value: "Cotton", label: "Cotton" },
//   { value: "Fabric", label: "Fabric" },
//   { value: "Woolen", label: "Woolen" },
//   { value: "Waterproof", label: "Waterproof" },
//   { value: "Cool", label: "Cool" },
//   { value: "Warm", label: "Warm" },
// ];

export const Bids = [
  {
    id: 1,
    price: 200,
    comment:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloribus sequi fugiat aliquam veniam vitae quam a culpa omnis porro sunt! Itaque tempore ea minus harum dignissimos animi autem inventore repellendus voluptate, possimus eligendi, ipsum obcaecati dicta illo saepe nihil dolores maiores vitae unde expedita distinctio ab! Distinctio aspernatur id autem!",
    maker: {
      avatar:
        "https://meydit-media-storage.s3.ap-southeast-2.amazonaws.com/account-images/id-1/12792782813c.jpg",
      firstName: "Tyler",
      lastName: "Jenkins",
      email: "Tyler@email.com",
      rating: 4,
      address: "Cabramatta",
    },
    createdAt: "1h ago",
  },
  {
    id: 2,
    price: 230,
    comment:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloribus sequi fugiat aliquam veniam vitae quam a culpa omnis porro sunt! Itaque tempore ea minus harum dignissimos animi autem inventore repellendus voluptate, possimus eligendi, ipsum obcaecati dicta illo saepe nihil dolores maiores vitae unde expedita distinctio ab! Distinctio aspernatur id autem!",
    maker: {
      avatar:
        "https://meydit-media-storage.s3.ap-southeast-2.amazonaws.com/account-images/id-2/0128287182e9.jpg",
      firstName: null,
      lastName: null,
      email: "Lara@email.com",
      rating: 2,
      address: "Inner west Sydney",
    },
    createdAt: "30mins ago",
  },
  {
    id: 3,
    price: 300,
    comment:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloribus sequi fugiat aliquam veniam vitae quam a culpa omnis porro sunt! Itaque tempore ea minus harum dignissimos animi autem inventore repellendus voluptate, possimus eligendi, ipsum obcaecati dicta illo saepe nihil dolores maiores vitae unde expedita distinctio ab! Distinctio aspernatur id autem!",
    maker: {
      avatar:
        "https://meydit-media-storage.s3.ap-southeast-2.amazonaws.com/account-images/id-3/fe6e3d3d15ed.jpg",
      firstName: "Linda",
      lastName: "Nguyen",
      email: "Linda@email.com",
      rating: 5,
      address: "Eastern Suburbs",
    },
    createdAt: "5mins ago",
  },
];
