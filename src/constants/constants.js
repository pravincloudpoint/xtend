const categories = [
  {
    id: 1,
    name: "Science",
    image: require("../assets/images/categories/business.png"),
  },
  {
    id: 2,
    name: "English",
    image: require("../assets/images/categories/technology.png"),
  },
  {
    id: 3,
    name: "Marathi",
    image: require("../assets/images/categories/technology.png"),
  },
  {
    id: 4,
    name: "Hindi",
    image: require("../assets/images/categories/technology.png"),
  },
  {
    id: 5,
    name: "Mathematics",
    image: require("../assets/images/categories/digital-marketing.png"),
  },
  {
    id: 6,
    name: "Chemistry",
    image: require("../assets/images/categories/business.png"),
  },
  {
    id: 7,
    name: "Music",
    image: require("../assets/images/categories/technology.png"),
  },
  {
    id: 8,
    name: "Physics",
    image: require("../assets/images/categories/digital-marketing.png"),
  },
    {
    id: 9,
    name: "Civics",
    image: require("../assets/images/categories/technology.png"),
  },
  {
    id: 10,
    name: "History",
    image: require("../assets/images/categories/business.png"),
  },
  {
    id: 11,
    name: "Computer",
    image: require("../assets/images/categories/business.png"),
  },
];

const classes = [
  {
    id: 1,
    class: "Class 1",
    image: require("../assets/images/categories/business.png"),
  },
  {
    id: 2,
    class: "Class 2",
    image: require("../assets/images/categories/technology.png"),
  },
  {
    id: 3,
    class: "Class 3",
    image: require("../assets/images/categories/digital-marketing.png"),
  },
  {
    id: 4,
    class: "Class 4",
    image: require("../assets/images/categories/business.png"),
  },
  {
    id: 5,
    class: "Class 5",
    image: require("../assets/images/categories/technology.png"),
  },
  {
    id: 6,
    class: "Class 6",
    image: require("../assets/images/categories/business.png"),
  },
  {
    id: 7,
    class: "Class 7",
    image: require("../assets/images/categories/technology.png"),
  },
  {
    id: 8,
    class: "Class 8",
    image: require("../assets/images/categories/digital-marketing.png"),
  },
   {
    id: 9,
    class: "Class 9",
    image: require("../assets/images/categories/business.png"),
  },
  {
    id: 10,
    class: "Class 10",
    image: require("../assets/images/categories/technology.png"),
  },
];

const promo = [
  {
    id: "1",
    image: { uri: "https://via.placeholder.com/1005x660" },
  },
  {
    id: "2",
    image: { uri: "https://via.placeholder.com/1005x660" },
  },
  {
    id: "3",
    image: { uri: "https://via.placeholder.com/1005x660" },
  },
];

const tags = [
  {
    id: "1",
    tag: "Java",
  },
  {
    id: "2",
    tag: "Python",
  },
  {
    id: "3",
    tag: "Marketing",
  },
  {
    id: "4",
    tag: "App",
  },
  {
    id: "5",
    tag: "Database",
  },
  {
    id: "6",
    tag: "Analytics",
  },
  {
    id: "7",
    tag: "UI/UX",
  },
];

const myCoupons = [
  {
    id: "1",
    discount: "10% off",
    course: "Mobile Application Development",
    activationCode: "START",
    image: {
      uri: "https://via.placeholder.com/1005x255",
    },
  },
  {
    id: "2",
    discount: "10% off",
    course: "Mobile Application Development",
    activationCode: "START",
    image: {
      uri: "https://via.placeholder.com/1005x255",
    },
  },
  {
    id: "3",
    discount: "10% off",
    course: "Mobile Application Development",
    activationCode: "START",
    image: {
      uri: "https://via.placeholder.com/1005x255",
    },
  },
  {
    id: "4",
    discount: "10% off",
    course: "Mobile Application Development",
    activationCode: "START",
    image: {
      uri: "https://via.placeholder.com/1005x255",
    },
  },
];

const FAQ = [
  {
    id: "1",
    question: "Refund Status: Common Questions",
    answer:
      "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  },
  {
    id: "2",
    question: "Troubleshooting Failed Payments",
    answer:
      "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  },
  {
    id: "3",
    question: "How to Find Your Missing Course",
    answer:
      "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  },
  {
    id: "4",
    question: "Downloading Course Resources",
    answer:
      "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  },
  {
    id: "5",
    question: "How to Refund a Course",
    answer:
      "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  },
  {
    id: "6",
    question: "Lifetime Access",
    answer:
      "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  },
];

const PP = [
  {
    id: "1",
    title: "1. Terms",
    description:
      "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  },
  {
    id: "2",
    title: "2. Use license",
    description:
      "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  },
  {
    id: "3",
    title: "3. Disclaimer",
    description:
      "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.  Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  },
];

const reviews = [
  {
    id: "1",
    name: "Lillian Davis",
    photo: {
      uri: "https://via.placeholder.com/120x120",
    },
    comment: "Lots of good info.",
    rating: 3,
    date: "March 3, 2022",
  },
  {
    id: "2",
    name: "Adam Thompson",
    photo: {
      uri: "https://via.placeholder.com/120x120",
    },
    comment:
      "Great course, Chris helps you get started with a framework where you can then build off of and focus on getting your games started faster. Great course, Chris helps you get started with a framework where you can then build off of and focus on getting your games started faster.",
    rating: 4,
    date: "March 28, 2022",
  },
  {
    id: "3",
    name: "Ryan Howard",
    photo: {
      uri: "https://via.placeholder.com/120x120",
    },
    comment: "It has explained it very well & made it very simple.",
    rating: 5,
    date: "February 12, 2022",
  },
];

const onboardingSlide = [
  {
    id: "1",
    title: "Overcoming infrastructure limitations",
    description:
      "Overcoming infrastructure limitations: Internet connectivity is often limited or unavailable in rural areas due to infrastructure challenges. By utilizing satellite technology and local WiFi hotspots, schools can enable the delivery of educational content directly to the students' devices without internet.",
    // image: {
    //   uri: "https://via.placeholder.com/1125x1125",
    // },
    image: require("../assets/images/03.png"),
  },
  {
    id: "2",
    title: "Offline learning",
    description:
      "Offline learning: Content downloaded via satellite can be stored locally on devices, allowing students to access and study the material even when they are offline. This is particularly beneficial in areas with intermittent or unreliable internet connectivity.",
    // image: {
    //   uri: "https://via.placeholder.com/1125x1125",
    // },
    image: require("../assets/images/01.png"),
  },
  { 
    id: "3",
    title: "Bridging the digital divide",
    description:
      "Bridging the digital divide: By implementing content download through satellite, schools can bridge this digital divide and enable the students residing in rural region to compete on a more level playing field with their urban counterparts.",
    // image: {
    //   uri: "https://via.placeholder.com/1125x1125",
    // },
    image: require("../assets/images/02.png"),
  },
];

export {
  categories,
  promo,
  tags,
  myCoupons,
  FAQ,
  PP,
  reviews,
  onboardingSlide,
  classes,
};
