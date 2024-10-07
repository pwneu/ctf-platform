export const challengesData = [
  {
    "id": "1",
    "categoryId": "1",
    "categoryName": "Cryptography",
    "name": "Flag Test 1",
    "description": "Solve cryptographic puzzles to reveal hidden flags.",
    "points": 100,
    "deadlineEnabled": false,
    "maxAttempts": 0,
    "solveCount": 280,
    "tags": [
      "Beginner",
      "PWNEU 2024"
    ],
    "artifacts": [
      {
        "id": "1",
        "fileName": "https://i.pinimg.com/474x/e4/ed/cd/e4edcd205807e450ed26e2427d9df580.jpg"
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


export const categories = [
  { id: 1, categoryName: "Cryptography" },
  { id: 2, categoryName: "Reverse Engineering" },
  { id: 3, categoryName: "Forensics" },
  { id: 4, categoryName: "Web Exploitation" },
  { id: 5, categoryName: "Binary Exploitation" },
  { id: 6, categoryName: "Stenography" },
  { id: 7, categoryName: "Miscellaneous (Misc)" },
  { id: 8, categoryName: "Programming" },
  { id: 9, categoryName: "Pwn" },
  { id: 10, categoryName: "Social Engineering" },
 
];

export const levels = [
  { id: 1, tag: "Beginner" },
  { id: 2, tag: "Intermediate" },
  { id: 3, tag: "Expert" },
];

export const duration = [
  { id: 1, title: "pwneuCTF 2025", range: [0, 239] },
  { id: 2, title: "pwneuCTF 2024", range: [240, 419] },
  { id: 3, title: "pwneuCTF 2023", range: [420, 1079] },
  { id: 4, title: "pwneuCTF 2022", range: [1080, 5000] },
];


export const sortingOptions = [
  "Default",
  "Sort by Points (Ascending)",
  "Sort by Points (Descending)",
  "Sort by Name (A-Z)",
  "Sort by Name (Z-A)",
];


export const solvetracker = [
  { id: 1, hidesolve: "All" },
  { id: 2, hidesolve: "Hide Solved" },
  { id: 3, unsolve: "Show Unsolved" }, 
  { id: 4, showsolve: "Show Solved" },
];



