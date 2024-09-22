export const challengesData = [
  {
    "id": "05d3656e-1c63-4508-a6b4-923ddd28c590", // from original `id`
    "categoryId": "1", // Placeholder as no original mapping for categoryId
    "categoryName": "Cryptography", 
    "name": "Verify",
    "description": "Introductory course on web hosting, domain registration, and how you can easily publish and edit your website online.", // from original `desc`
    "points": 100, 
    "deadlineEnabled": false, // Placeholder as there was no `deadlineEnabled`
    "deadline": "", // Placeholder since no deadline was provided
    "maxAttempts": 0, 
    "solveCount": 280, // Placeholder, no solve count data was available
    "tags": [
      "Beginner",
      "PWNEU 2024"
    ],
    "artifacts": [
      {
        "id": "1", 
        "fileName": "" 
      },
      {
        "id": "2", 
        "fileName": ""
      }
    ],
    "hints": [
      {
        "id": "1", 
        "deduction": 0 
      },
      {
        "id": "2", 
        "deduction": 0 
      }
    ]

  },
  {
    "id": "2", 
    "categoryId": "1", 
    "categoryName": "Cryptography", 
    "name": "Scan Surprise",
    "description": "Introductory course on web hosting, domain registration, and how you can easily publish and edit your website online.", // from original `desc`
    "points": 50, 
    "deadlineEnabled": false, 
    "deadline": "", 
    "maxAttempts": 0, 
    "solveCount": 0, 
    "tags": [
      "Intermediate",
      "PWNEU 2024",
    ],
    "artifacts": [
      {
        "id": "1", 
        "fileName": "" 
      },
      {
        "id": "2", 
        "fileName": ""
      }
    ],
    "hints": [
      {
        "id": "1", 
        "deduction": 0 
      },
      {
        "id": "2", 
        "deduction": 0 
      }
    ]

  },
  {
    "id": "3", 
    "categoryId": "1", 
    "categoryName": "Cryptography", 
    "name": "Secret of the Polyglot ",
    "description": "Introductory course on web hosting, domain registration, and how you can easily publish and edit your website online.", // from original `desc`
    "points": 150, 
    "deadlineEnabled": false, 
    "deadline": "", 
    "maxAttempts": 0, 
    "solveCount": 0, 
    "tags": [
      "Expert",
      "PWNEU 2024",
    ],
    "artifacts": [
      {
        "id": "1", 
        "fileName": "" 
      },
      {
        "id": "2", 
        "fileName": ""
      }
    ],
    "hints": [
      {
        "id": "1", 
        "deduction": 0 
      },
      {
        "id": "2", 
        "deduction": 0 
      }
    ]

  },
];



export const catagories = [
  "All Categories",
  "Cryptography",
  "Reverse Engineering",
  "Forensics",
  "Web Exploitation",
  "Binary Exploitation",
  "Stenography",
  "Miscellaneous (Misc)",
  "Programming",
  "Pwn",
  "Social Engineering",
  "Mobile Security",
  "Hardware Hacking",
];



export const allCategories = [
  "All",
  "Cryptography",
  "Reverse Engineering",
  "Forensics",
  "Web Exploitation",
  "Binary Exploitation",
  "Stenography",
  "Miscellaneous (Misc)",
  "Programming",
  "Pwn",
  "Social Engineering",
  "Mobile Security",
  "Hardware Hacking",
];


export const levels = [
  { id: 1, title: "Beginner" },
  { id: 2, title: "Intermediate" },
  { id: 3, title: "Expert" },
];


export const categories = [
  { id: 1, title: "Cryptography" },
  { id: 2, title: "Reverse Engineering" },
  { id: 3, title: "Forensics" },
  { id: 4, title: "Web Exploitation" },
  { id: 5, title: "Binary Exploitation" },
  { id: 6, title: "Stenography" },
  { id: 7, title: "Miscellaneous (Misc)" },
  { id: 8, title: "Programming" },
  { id: 9, title: "Pwn" },
  { id: 10, title: "Social Engineering" },
  { id: 11, title: "Mobile Security" },
  { id: 12, title: "Hardware Hacking" }
];

export const duration = [
  { id: 1, title: "pwneuCTF 2025", range: [0, 239] },
  { id: 2, title: "pwneuCTF 2024", range: [240, 419] },
  { id: 3, title: "pwneuCTF 2023", range: [420, 1079] },
  { id: 4, title: "pwneuCTF 2022", range: [1080, 5000] },
];



export const lessonItems = [
  {
    id: 1,
    title: "Course Content",
    duration: "87 min",
    lessons: [
      { id: 1, title: "Introduction to the User", duration: "03:56" },
      { id: 2, title: "Getting started with your", duration: "03:56" },
      {
        id: 3,
        title:
          "What is UI vs UX - User Interface vs User Experience vs Product",
        duration: "03:56",
      },
      { id: 4, title: "Wireframing (low fidelity) in", duration: "03:56" },
      { id: 5, title: "Viewing your prototype on", duration: "03:56" },
      { id: 6, title: "Sharing your design", duration: "03:56" },
    ],
  },
  {
    id: 2,
    title: "The Brief",
    duration: "87 min",
    lessons: [
      {
        id: 1,
        title: "Introduction to the User",
        duration: "03:56",
        questions: 5,
      },
      {
        id: 2,
        title: "Getting started with your",
        duration: "03:56",
        questions: 5,
      },
      {
        id: 3,
        title:
          "What is UI vs UX - User Interface vs User Experience vs Product",
        duration: "03:56",
        questions: 5,
      },
      {
        id: 4,
        title: "Wireframing (low fidelity) in",
        duration: "03:56",
        questions: 5,
      },
      {
        id: 5,
        title: "Viewing your prototype on",
        duration: "03:56",
        questions: 5,
      },
      { id: 6, title: "Sharing your design", duration: "03:56", questions: 5 },
    ],
  },
  {
    id: 3,
    title: "Type, Color & Icon Introduction",
    duration: "87 min",
    lessons: [
      {
        id: 1,
        title: "Introduction to the User",
        duration: "03:56",
        questions: 5,
      },
      {
        id: 2,
        title: "Getting started with your",
        duration: "03:56",
        questions: 5,
      },
      {
        id: 3,
        title:
          "What is UI vs UX - User Interface vs User Experience vs Product",
        duration: "03:56",
        questions: 5,
      },
      {
        id: 4,
        title: "Wireframing (low fidelity) in",
        duration: "03:56",
        questions: 5,
      },
      {
        id: 5,
        title: "Viewing your prototype on",
        duration: "03:56",
        questions: 5,
      },
      { id: 6, title: "Sharing your design", duration: "03:56", questions: 5 },
    ],
  },
  {
    id: 4,
    title: "Prototyping a App - Introduction",
    duration: "87 min",
    lessons: [
      {
        id: 1,
        title: "Introduction to the User",
        duration: "03:56",
        questions: 5,
      },
      {
        id: 2,
        title: "Getting started with your",
        duration: "03:56",
        questions: 5,
      },
      {
        id: 3,
        title:
          "What is UI vs UX - User Interface vs User Experience vs Product",
        duration: "03:56",
        questions: 5,
      },
      {
        id: 4,
        title: "Wireframing (low fidelity) in",
        duration: "03:56",
        questions: 5,
      },
      {
        id: 5,
        title: "Viewing your prototype on",
        duration: "03:56",
        questions: 5,
      },
      { id: 6, title: "Sharing your design", duration: "03:56", questions: 5 },
    ],
  },
  {
    id: 5,
    title: "Wireframe Feedback",
    duration: "87 min",
    lessons: [
      {
        id: 1,
        title: "Introduction to the User",
        duration: "03:56",
        questions: 5,
      },
      {
        id: 2,
        title: "Getting started with your",
        duration: "03:56",
        questions: 5,
      },
      {
        id: 3,
        title:
          "What is UI vs UX - User Interface vs User Experience vs Product",
        duration: "03:56",
        questions: 5,
      },
      {
        id: 4,
        title: "Wireframing (low fidelity) in",
        duration: "03:56",
        questions: 5,
      },
      {
        id: 5,
        title: "Viewing your prototype on",
        duration: "03:56",
        questions: 5,
      },
      { id: 6, title: "Sharing your design", duration: "03:56", questions: 5 },
    ],
  },
];
