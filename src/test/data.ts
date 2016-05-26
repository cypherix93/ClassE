[

    //Courses
    {
        id: "CSE308",
        department: "CSE",
        courseNumber: "40226",
        description: "Make some comic book site thing.",
        SBC: ["EXP+_PART", "SBS+_PART", "STEM+_PART"],
        requirements:   [{
            CourseId: "CSE219",
            CourseDepartments: "CSE",
            CourseNumber: "40225"
            },
            {
                CourseId: "CSE114",
                CourseDepartments: "CSE",
                CourseNumber:  "40224"
            }],
        recitations: ""
    },
    {
        id: "CSE320",
        department: "CSE",
        courseNumber: "43943",
        description: "This course will introduce C programming and essential concepts of operating systems, compilers, concurrency, and performance analysis, focused around several cross-cutting examples, such as memory management, error handling, and threaded programming.",
        SBC: ["EXP+_PART", "SBS+_PART"],
        requirements:   [{
            CourseId: "CSE220",
            CourseDepartments: "CSE",
            CourseNumber: "30225"
        }],
        recitations: ""
    },
    {
        id: "CSE220",
        department: "CSE",
        courseNumber: "41244",
        description: "This course will introduce assembly language programming and essential concepts of computer organization and architecture. The focus of this course is on the computer organization of a computer system, including the processor architecture and the memory system. In particular, we will discuss the internal representation of information, performance evaluation methodology, instruction set architectures and implementation techniques for computer arithmetic, control path design, and pipelining.",
        SBC: ["EXP+_PART", "SBS+_PART"],
        requirements: [],
        recitations: [{
            sectionId: "23145"
            }]
    },
    {
        id: "CSE114",
        department: "CSE",
        courseNumber: "40224",
        description: "Programming 101",
        SBC: [],
        requirements: [],
        recitations: []
    },
    {
        id: "CSE219",
        department: "CSE",
        courseNumber: "40225",
        description: "Programming 102",
        SBC: [],
        requirements:   [{
            CourseId: "CSE114",
            CourseDepartments: "CSE",
            CourseNumber: "40224"
        }],
        recitations: []
    },

    // Users
    {
        id: "DragonSlayerX87",
        email: "dragonslayer@gmail.com"
    },
    {
        id: "iLoveSchool2016",
        email: "mathIsFun@hotmail.com"
    },
    {
        id: "iHateSchool2016",
        email: "Trump2016@gmail.com"
    },
    {
        id: "SchoolIsOkay",
        email: "Indifferent@yahoo.com"
    },
    {
        id: "user1",
        email: "user1@gmail.com"
    },
    {
        id: "user2",
        email: "user2@gmail.com"
    },
    {
        id: "user3",
        email: "user3@gmail.com"
    },
    {
        id: "user4",
        email: "user4@gmail.com"
    },
    {
        id: "user5",
        email: "user5@gmail.com"
    },

    //Loading Dock
    {
        id: "LoadingDock1",
        studentId: "DragonSlayerX87"
    },
    {
        id: "LoadingDock2",
        studentId: "iLoveSchool2016"
    },
    {
        id: "LoadingDock3",
        studentId: "iHateSchool2016"
    },
    {
        id: "LoadingDock4",
        studentId: "SchoolIsOkay"
    },
    {
        id: "LoadingDock5",
        studentId: "user1"
    },
    {
        id: "LoadingDock6",
        studentId: "user2"
    },
    {
        id: "LoadingDock7",
        studentId: "user3"
    },
    {
        id: "LoadingDock8",
        studentId: "user4"
    },
    {
        id: "LoadingDock9",
        studentId: "user5"
    },

    // Section
    {
        id: "12345",
        semester: "Spring2016",
        year: "2016",
        times: [{
            day: "Monday",
            startTime: "1:00",
            endTime: "2:20"
        }],
        courseId: "CSE308"
    },
    {
        id: "12346",
        semester: "Spring2016",
        year: "2016",
        times: [{
            day: "Monday",
            startTime: "2:30",
            endTime: "3:50"
        }],
        courseId: "CSE308"
    }
    //Add sections for each course
    //Add Pools
    //Add Students
    //Add Teachers

]