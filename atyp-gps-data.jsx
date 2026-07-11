// aTyp — GPS question data (Small Question Model).
// SOURCE OF TRUTH: "Additional material/JoyDew_GPS_Level_One_Pilot_Small_Question_
// Model_for_Pilot_v1.xlsx" — Moisha's tagged pilot (90 questions, 8 milestones).
// Fields come straight from his columns; nothing here is invented.
//
//   GPS_MILESTONES[]        the 8 milestones, shown on the GPS path.
//     .ageLabel / .isTrigger  Moisha's "Age or Trigger": some milestones are
//                             age-anchored (Ages 15-17), some are triggered by an
//                             event, not a year (puberty, family aging).
//     .questions[]          Level-1 root questions. Each carries .timing
//                           ("current" = ask now, "future" = plan ahead), .why
//                           (why it matters) and .risk.
//       .children[]         Level-2 clarifiers; each Level-2 has its Level-3.
//
// The model (per Moisha): the parent drills L1 -> pick an L2 -> L3, and THEN the
// AI layer answers, using the child's profile + the exact question reached.
// The database is neutral questions only — no laws, providers, or answers.

const GPS_MILESTONES = [
  {
    "id": "diagnosis",
    "emoji": "🧩",
    "label": "Diagnosis",
    "ageLabel": "Ages 2–8",
    "isTrigger": false,
    "startAge": 2,
    "endAge": 8,
    "maxAge": 8,
    "super": false,
    "domain": "Medical / Services",
    "description": "Getting a clear picture — the diagnosis shapes every service, support and plan that follows.",
    "questions": [
      {
        "id": "P001",
        "level": 1,
        "timing": "current",
        "risk": "critical",
        "text": "Does the current diagnostic picture accurately explain my child's strengths, challenges, and support needs?",
        "why": "A clear diagnostic picture helps the family ask better questions about supports, services, communication, education, and future planning.",
        "children": [
          {
            "id": "P002",
            "level": 2,
            "timing": "current",
            "risk": "high",
            "text": "What evaluations have already been completed?",
            "why": "A clear diagnostic picture helps the family ask better questions about supports, services, communication, education, and future planning.",
            "children": [
              {
                "id": "P003",
                "level": 3,
                "timing": "current",
                "risk": "medium",
                "text": "What areas of functioning remain unclear?"
              }
            ]
          },
          {
            "id": "P004",
            "level": 2,
            "timing": "current",
            "risk": "high",
            "text": "Are co-occurring needs being considered?",
            "why": "A clear diagnostic picture helps the family ask better questions about supports, services, communication, education, and future planning.",
            "children": [
              {
                "id": "P005",
                "level": 3,
                "timing": "current",
                "risk": "medium",
                "text": "What needs are not yet explained by the current diagnosis?"
              }
            ]
          }
        ]
      },
      {
        "id": "P006",
        "level": 1,
        "timing": "future",
        "risk": "critical",
        "text": "Which diagnosis or combination of diagnoses may best support my child's long-term quality of life and access to appropriate services?",
        "why": "The GPS should help families think beyond labels toward long-term access, opportunity, and quality of life.",
        "children": [
          {
            "id": "P007",
            "level": 2,
            "timing": "future",
            "risk": "high",
            "text": "How could the diagnosis affect service access now?",
            "why": "The GPS should help families think beyond labels toward long-term access, opportunity, and quality of life.",
            "children": [
              {
                "id": "P008",
                "level": 3,
                "timing": "future",
                "risk": "medium",
                "text": "How could the diagnosis affect adult-service planning later?"
              }
            ]
          },
          {
            "id": "P009",
            "level": 2,
            "timing": "future",
            "risk": "high",
            "text": "Are there labels that could create unintended barriers?",
            "why": "The GPS should help families think beyond labels toward long-term access, opportunity, and quality of life.",
            "children": [
              {
                "id": "P010",
                "level": 3,
                "timing": "future",
                "risk": "medium",
                "text": "What long-term assumptions might follow from each label?"
              }
            ]
          }
        ]
      }
    ]
  },
  {
    "id": "iep-readiness-advocacy",
    "emoji": "📋",
    "label": "IEP Readiness & Advocacy",
    "ageLabel": "Preschool–age 20",
    "isTrigger": false,
    "startAge": 3,
    "endAge": 20,
    "maxAge": 20,
    "super": false,
    "domain": "Education",
    "description": "The IEP is the main planning tool through childhood — it should tie school supports to real outcomes.",
    "questions": [
      {
        "id": "P011",
        "level": 1,
        "timing": "current",
        "risk": "critical",
        "text": "Does the current IEP reflect the child's real needs, strengths, and family priorities?",
        "why": "The IEP is often the main planning tool during childhood and should connect daily school supports to meaningful outcomes.",
        "children": [
          {
            "id": "P012",
            "level": 2,
            "timing": "current",
            "risk": "high",
            "text": "Are the goals measurable and meaningful?",
            "why": "The IEP is often the main planning tool during childhood and should connect daily school supports to meaningful outcomes.",
            "children": [
              {
                "id": "P013",
                "level": 3,
                "timing": "current",
                "risk": "medium",
                "text": "Which goals will still matter five years from now?"
              }
            ]
          },
          {
            "id": "P014",
            "level": 2,
            "timing": "current",
            "risk": "high",
            "text": "Are services aligned with the child's needs?",
            "why": "The IEP is often the main planning tool during childhood and should connect daily school supports to meaningful outcomes.",
            "children": [
              {
                "id": "P015",
                "level": 3,
                "timing": "current",
                "risk": "medium",
                "text": "Which supports are missing or no longer working?"
              }
            ]
          }
        ]
      },
      {
        "id": "P016",
        "level": 1,
        "timing": "future",
        "risk": "critical",
        "text": "Is the IEP preparing the child for the next educational stage and ultimately adulthood?",
        "why": "Each school year should build skills for the next transition, not only address the current placement.",
        "children": [
          {
            "id": "P017",
            "level": 2,
            "timing": "future",
            "risk": "high",
            "text": "What transition is coming next?",
            "why": "Each school year should build skills for the next transition, not only address the current placement.",
            "children": [
              {
                "id": "P018",
                "level": 3,
                "timing": "future",
                "risk": "medium",
                "text": "What skills will be needed for that next transition?"
              }
            ]
          },
          {
            "id": "P019",
            "level": 2,
            "timing": "future",
            "risk": "high",
            "text": "Are independence and communication goals being built early enough?",
            "why": "Each school year should build skills for the next transition, not only address the current placement.",
            "children": [
              {
                "id": "P020",
                "level": 3,
                "timing": "future",
                "risk": "medium",
                "text": "Which adult-life skills should begin before age 20?"
              }
            ]
          }
        ]
      }
    ]
  },
  {
    "id": "puberty",
    "emoji": "🌱",
    "label": "Puberty",
    "ageLabel": "When puberty appears",
    "isTrigger": true,
    "startAge": 11,
    "endAge": 17,
    "maxAge": 17,
    "super": false,
    "domain": "Health / Safety / Daily Life",
    "description": "Not tied to a fixed age. Puberty can change support, safety and communication needs quickly.",
    "questions": [
      {
        "id": "P021",
        "level": 1,
        "timing": "current",
        "risk": "critical",
        "text": "Are physical, emotional, sensory, and behavioral changes related to puberty being recognized and supported?",
        "why": "Puberty can change support needs quickly and may affect safety, communication, hygiene, anxiety, and participation.",
        "children": [
          {
            "id": "P022",
            "level": 2,
            "timing": "current",
            "risk": "high",
            "text": "What changes are we noticing at home or school?",
            "why": "Puberty can change support needs quickly and may affect safety, communication, hygiene, anxiety, and participation.",
            "children": [
              {
                "id": "P023",
                "level": 3,
                "timing": "current",
                "risk": "medium",
                "text": "Which changes may require new supports?"
              }
            ]
          },
          {
            "id": "P024",
            "level": 2,
            "timing": "current",
            "risk": "high",
            "text": "Can the individual communicate discomfort or confusion?",
            "why": "Puberty can change support needs quickly and may affect safety, communication, hygiene, anxiety, and participation.",
            "children": [
              {
                "id": "P025",
                "level": 3,
                "timing": "current",
                "risk": "medium",
                "text": "What communication supports are needed around body changes?"
              }
            ]
          }
        ]
      },
      {
        "id": "P026",
        "level": 1,
        "timing": "future",
        "risk": "critical",
        "text": "Are we preparing for privacy, relationships, body safety, and independence during and after puberty?",
        "why": "Families often need proactive questions before safety, privacy, or relationship concerns become urgent.",
        "children": [
          {
            "id": "P027",
            "level": 2,
            "timing": "future",
            "risk": "high",
            "text": "Has privacy been taught in a way the individual understands?",
            "why": "Families often need proactive questions before safety, privacy, or relationship concerns become urgent.",
            "children": [
              {
                "id": "P028",
                "level": 3,
                "timing": "future",
                "risk": "medium",
                "text": "What privacy routines need to be practiced?"
              }
            ]
          },
          {
            "id": "P029",
            "level": 2,
            "timing": "future",
            "risk": "high",
            "text": "Has body safety been addressed appropriately?",
            "why": "Families often need proactive questions before safety, privacy, or relationship concerns become urgent.",
            "children": [
              {
                "id": "P030",
                "level": 3,
                "timing": "future",
                "risk": "medium",
                "text": "How will the individual report discomfort, fear, or unsafe situations?"
              }
            ]
          }
        ]
      }
    ]
  },
  {
    "id": "high-school-planning",
    "emoji": "🎒",
    "label": "High School Planning",
    "ageLabel": "Ages 15–17",
    "isTrigger": false,
    "startAge": 15,
    "endAge": 17,
    "maxAge": 17,
    "super": false,
    "domain": "Education / Employment",
    "description": "The key window to test interests and build a practical bridge toward adult life.",
    "questions": [
      {
        "id": "P031",
        "level": 1,
        "timing": "current",
        "risk": "critical",
        "text": "Is high school being used to identify strengths, interests, and possible adult pathways?",
        "why": "High school is the key window to test interests and build a practical bridge to adult life.",
        "children": [
          {
            "id": "P032",
            "level": 2,
            "timing": "current",
            "risk": "high",
            "text": "What strengths are becoming clear?",
            "why": "High school is the key window to test interests and build a practical bridge to adult life.",
            "children": [
              {
                "id": "P033",
                "level": 3,
                "timing": "current",
                "risk": "medium",
                "text": "Which environments help those strengths appear?"
              }
            ]
          },
          {
            "id": "P034",
            "level": 2,
            "timing": "current",
            "risk": "high",
            "text": "Has vocational or community exposure begun?",
            "why": "High school is the key window to test interests and build a practical bridge to adult life.",
            "children": [
              {
                "id": "P035",
                "level": 3,
                "timing": "current",
                "risk": "medium",
                "text": "What experiences should be tried before age 18?"
              }
            ]
          }
        ]
      },
      {
        "id": "P036",
        "level": 1,
        "timing": "future",
        "risk": "critical",
        "text": "Is the school plan building toward employment, contribution, higher education, or meaningful daytime activity after age 21?",
        "why": "A diploma or school placement is not enough; families need a post-school life plan.",
        "children": [
          {
            "id": "P037",
            "level": 2,
            "timing": "future",
            "risk": "high",
            "text": "What adult pathway is most realistic today?",
            "why": "A diploma or school placement is not enough; families need a post-school life plan.",
            "children": [
              {
                "id": "P038",
                "level": 3,
                "timing": "future",
                "risk": "medium",
                "text": "What alternative pathway should also be explored?"
              }
            ]
          },
          {
            "id": "P039",
            "level": 2,
            "timing": "future",
            "risk": "high",
            "text": "What barriers could prevent post-school success?",
            "why": "A diploma or school placement is not enough; families need a post-school life plan.",
            "children": [
              {
                "id": "P040",
                "level": 3,
                "timing": "future",
                "risk": "medium",
                "text": "Which barriers should be reduced before age 18?"
              }
            ]
          }
        ]
      }
    ]
  },
  {
    "id": "adult-readiness-post-21-preparation",
    "emoji": "🧭",
    "label": "Adult Readiness & Post-21 Preparation",
    "ageLabel": "Ages 16–20",
    "isTrigger": false,
    "startAge": 16,
    "endAge": 20,
    "maxAge": 20,
    "super": true,
    "domain": "Legal / Benefits / Finance / Life Plan",
    "description": "The transition super-milestone — legal, benefits, finance and life plan, before school services end.",
    "questions": [
      {
        "id": "P041",
        "level": 1,
        "timing": "current",
        "risk": "critical",
        "text": "What steps should I take today to maximize my child's quality of life and my family's quality of life after age 21?",
        "why": "The transition years determine whether adulthood begins with a plan or with a crisis after school services end.",
        "children": [
          {
            "id": "P042",
            "level": 2,
            "timing": "current",
            "risk": "high",
            "text": "What does a good adult life look like for my child?",
            "why": "The transition years determine whether adulthood begins with a plan or with a crisis after school services end.",
            "children": [
              {
                "id": "P043",
                "level": 3,
                "timing": "current",
                "risk": "medium",
                "text": "What outcomes would show quality of life at age 25?"
              }
            ]
          },
          {
            "id": "P044",
            "level": 2,
            "timing": "current",
            "risk": "high",
            "text": "What does a sustainable family life look like after age 21?",
            "why": "The transition years determine whether adulthood begins with a plan or with a crisis after school services end.",
            "children": [
              {
                "id": "P045",
                "level": 3,
                "timing": "current",
                "risk": "medium",
                "text": "What family stress points must be reduced before school ends?"
              }
            ]
          }
        ]
      },
      {
        "id": "P046",
        "level": 1,
        "timing": "current",
        "risk": "critical",
        "text": "What steps should I take to prepare all legal requirements before age 21?",
        "why": "Legal responsibility changes in adulthood, and families need to understand decision-making supports before urgent decisions arise.",
        "children": [
          {
            "id": "P047",
            "level": 2,
            "timing": "current",
            "risk": "high",
            "text": "What decisions will my child be expected to make at age 18?",
            "why": "Legal responsibility changes in adulthood, and families need to understand decision-making supports before urgent decisions arise.",
            "children": [
              {
                "id": "P048",
                "level": 3,
                "timing": "current",
                "risk": "medium",
                "text": "Which decisions may require support?"
              }
            ]
          },
          {
            "id": "P049",
            "level": 2,
            "timing": "current",
            "risk": "high",
            "text": "Who should be involved in decision-making planning?",
            "why": "Legal responsibility changes in adulthood, and families need to understand decision-making supports before urgent decisions arise.",
            "children": [
              {
                "id": "P050",
                "level": 3,
                "timing": "current",
                "risk": "medium",
                "text": "What safeguards are needed while preserving autonomy?"
              }
            ]
          }
        ]
      },
      {
        "id": "P051",
        "level": 1,
        "timing": "current",
        "risk": "critical",
        "text": "What steps should I take to connect my child to Medicaid and my state's adult service system?",
        "why": "Many adult supports depend on eligibility pathways, applications, documentation, and timing.",
        "children": [
          {
            "id": "P052",
            "level": 2,
            "timing": "current",
            "risk": "high",
            "text": "What adult services may be needed after age 21?",
            "why": "Many adult supports depend on eligibility pathways, applications, documentation, and timing.",
            "children": [
              {
                "id": "P053",
                "level": 3,
                "timing": "current",
                "risk": "medium",
                "text": "Which of those services require eligibility steps before age 21?"
              }
            ]
          },
          {
            "id": "P054",
            "level": 2,
            "timing": "current",
            "risk": "high",
            "text": "What documentation should be organized now?",
            "why": "Many adult supports depend on eligibility pathways, applications, documentation, and timing.",
            "children": [
              {
                "id": "P055",
                "level": 3,
                "timing": "current",
                "risk": "medium",
                "text": "What applications or waiting lists may affect timing?"
              }
            ]
          }
        ]
      },
      {
        "id": "P056",
        "level": 1,
        "timing": "future",
        "risk": "critical",
        "text": "What financial steps should I take before my child turns 21?",
        "why": "Financial planning affects housing, services, benefits, caregiving, and long-term family stability.",
        "children": [
          {
            "id": "P057",
            "level": 2,
            "timing": "future",
            "risk": "high",
            "text": "What future expenses should we anticipate?",
            "why": "Financial planning affects housing, services, benefits, caregiving, and long-term family stability.",
            "children": [
              {
                "id": "P058",
                "level": 3,
                "timing": "future",
                "risk": "medium",
                "text": "Which costs may increase after school services end?"
              }
            ]
          },
          {
            "id": "P059",
            "level": 2,
            "timing": "future",
            "risk": "high",
            "text": "How should family finances align with benefits and long-term support needs?",
            "why": "Financial planning affects housing, services, benefits, caregiving, and long-term family stability.",
            "children": [
              {
                "id": "P060",
                "level": 3,
                "timing": "future",
                "risk": "medium",
                "text": "What financial decisions could affect future eligibility or security?"
              }
            ]
          }
        ]
      }
    ]
  },
  {
    "id": "t1-cliff",
    "emoji": "⛰️",
    "label": "T1 Cliff",
    "ageLabel": "Age 21 · school exit",
    "isTrigger": false,
    "startAge": 21,
    "endAge": 21,
    "maxAge": 21,
    "super": false,
    "domain": "Adult Services / Daily Life",
    "description": "When school ends, hidden school-based supports disappear. What replaces them?",
    "questions": [
      {
        "id": "P061",
        "level": 1,
        "timing": "current",
        "risk": "critical",
        "text": "What services, routines, therapies, and supports ended when school ended?",
        "why": "The T1 Cliff exposes gaps that were previously hidden by the school system.",
        "children": [
          {
            "id": "P062",
            "level": 2,
            "timing": "current",
            "risk": "high",
            "text": "Which supports were school-based?",
            "why": "The T1 Cliff exposes gaps that were previously hidden by the school system.",
            "children": [
              {
                "id": "P063",
                "level": 3,
                "timing": "current",
                "risk": "medium",
                "text": "Which school-based supports have no replacement yet?"
              }
            ]
          },
          {
            "id": "P064",
            "level": 2,
            "timing": "current",
            "risk": "high",
            "text": "What changed in the weekly schedule?",
            "why": "The T1 Cliff exposes gaps that were previously hidden by the school system.",
            "children": [
              {
                "id": "P065",
                "level": 3,
                "timing": "current",
                "risk": "medium",
                "text": "Where are the biggest gaps in the week?"
              }
            ]
          }
        ]
      },
      {
        "id": "P066",
        "level": 1,
        "timing": "future",
        "risk": "critical",
        "text": "What structure, services, and supports must replace the school-based system after age 21?",
        "why": "A meaningful adult life requires a new structure for daily activity, relationships, health, and support coordination.",
        "children": [
          {
            "id": "P067",
            "level": 2,
            "timing": "future",
            "risk": "high",
            "text": "What does a meaningful week look like now?",
            "why": "A meaningful adult life requires a new structure for daily activity, relationships, health, and support coordination.",
            "children": [
              {
                "id": "P068",
                "level": 3,
                "timing": "future",
                "risk": "medium",
                "text": "What should the week look like one year from now?"
              }
            ]
          },
          {
            "id": "P069",
            "level": 2,
            "timing": "future",
            "risk": "high",
            "text": "Who coordinates the adult support system?",
            "why": "A meaningful adult life requires a new structure for daily activity, relationships, health, and support coordination.",
            "children": [
              {
                "id": "P070",
                "level": 3,
                "timing": "future",
                "risk": "medium",
                "text": "What backup plan exists if supports fail?"
              }
            ]
          }
        ]
      }
    ]
  },
  {
    "id": "housing-launch",
    "emoji": "🏠",
    "label": "Housing Launch",
    "ageLabel": "Parent 55+ · child 16+",
    "isTrigger": true,
    "startAge": 16,
    "endAge": 40,
    "maxAge": 40,
    "super": false,
    "domain": "Housing / Family Aging",
    "description": "Housing takes years to plan and is tied to benefits, staffing and family aging — start before a crisis.",
    "questions": [
      {
        "id": "P071",
        "level": 1,
        "timing": "current",
        "risk": "critical",
        "text": "Have we started long-term housing planning before a crisis forces the decision?",
        "why": "Housing usually takes years to plan and is closely tied to benefits, staffing, family aging, and quality of life.",
        "children": [
          {
            "id": "P072",
            "level": 2,
            "timing": "current",
            "risk": "high",
            "text": "Where is the individual expected to live in five years?",
            "why": "Housing usually takes years to plan and is closely tied to benefits, staffing, family aging, and quality of life.",
            "children": [
              {
                "id": "P073",
                "level": 3,
                "timing": "current",
                "risk": "medium",
                "text": "What makes the current housing situation sustainable or fragile?"
              }
            ]
          },
          {
            "id": "P074",
            "level": 2,
            "timing": "current",
            "risk": "high",
            "text": "What level of support is needed at home?",
            "why": "Housing usually takes years to plan and is closely tied to benefits, staffing, family aging, and quality of life.",
            "children": [
              {
                "id": "P075",
                "level": 3,
                "timing": "current",
                "risk": "medium",
                "text": "How might that support need change over time?"
              }
            ]
          }
        ]
      },
      {
        "id": "P076",
        "level": 1,
        "timing": "future",
        "risk": "critical",
        "text": "What housing model would best support safety, autonomy, belonging, and family sustainability?",
        "why": "The best housing plan should balance support needs with dignity, relationships, independence, and family wellbeing.",
        "children": [
          {
            "id": "P077",
            "level": 2,
            "timing": "future",
            "risk": "high",
            "text": "What does a good home mean for the individual?",
            "why": "The best housing plan should balance support needs with dignity, relationships, independence, and family wellbeing.",
            "children": [
              {
                "id": "P078",
                "level": 3,
                "timing": "future",
                "risk": "medium",
                "text": "What community features matter most?"
              }
            ]
          },
          {
            "id": "P079",
            "level": 2,
            "timing": "future",
            "risk": "high",
            "text": "What housing risks should be avoided?",
            "why": "The best housing plan should balance support needs with dignity, relationships, independence, and family wellbeing.",
            "children": [
              {
                "id": "P080",
                "level": 3,
                "timing": "future",
                "risk": "medium",
                "text": "What future caregiver limits should be considered now?"
              }
            ]
          }
        ]
      }
    ]
  },
  {
    "id": "isp-annual-planning",
    "emoji": "🔄",
    "label": "ISP Annual Planning",
    "ageLabel": "Age 21+ · yearly",
    "isTrigger": false,
    "startAge": 21,
    "endAge": 200,
    "maxAge": 200,
    "super": false,
    "domain": "Adult Services / Quality of Life",
    "description": "Every year the ISP should move the person toward a stronger adult life, not repeat last year.",
    "questions": [
      {
        "id": "P081",
        "level": 1,
        "timing": "current",
        "risk": "critical",
        "text": "Does the ISP reflect the person's actual goals, preferences, strengths, and support needs this year?",
        "why": "The ISP should drive meaningful adult outcomes, not simply repeat services from the prior year.",
        "children": [
          {
            "id": "P082",
            "level": 2,
            "timing": "current",
            "risk": "high",
            "text": "Did the individual participate in the planning process?",
            "why": "The ISP should drive meaningful adult outcomes, not simply repeat services from the prior year.",
            "children": [
              {
                "id": "P083",
                "level": 3,
                "timing": "current",
                "risk": "medium",
                "text": "How were preferences communicated or interpreted?"
              }
            ]
          },
          {
            "id": "P084",
            "level": 2,
            "timing": "current",
            "risk": "high",
            "text": "Are current supports accurately described?",
            "why": "The ISP should drive meaningful adult outcomes, not simply repeat services from the prior year.",
            "children": [
              {
                "id": "P085",
                "level": 3,
                "timing": "current",
                "risk": "medium",
                "text": "What support needs are missing or outdated?"
              }
            ]
          }
        ]
      },
      {
        "id": "P086",
        "level": 1,
        "timing": "future",
        "risk": "critical",
        "text": "Is this year's ISP moving the person toward a better next year and a stronger adult life?",
        "why": "Annual planning should create progress in quality of life, not only maintain the status quo.",
        "children": [
          {
            "id": "P087",
            "level": 2,
            "timing": "future",
            "risk": "high",
            "text": "What changed since the last ISP?",
            "why": "Annual planning should create progress in quality of life, not only maintain the status quo.",
            "children": [
              {
                "id": "P088",
                "level": 3,
                "timing": "future",
                "risk": "medium",
                "text": "What goals should change because life has changed?"
              }
            ]
          },
          {
            "id": "P089",
            "level": 2,
            "timing": "future",
            "risk": "high",
            "text": "What should improve by next year's ISP?",
            "why": "Annual planning should create progress in quality of life, not only maintain the status quo.",
            "children": [
              {
                "id": "P090",
                "level": 3,
                "timing": "future",
                "risk": "medium",
                "text": "What future risks should this ISP begin to prepare for?"
              }
            ]
          }
        ]
      }
    ]
  }
];


// The AI names each level's role in the funnel.
const GPS_LEVEL_LABEL = { 1: 'Key question', 2: 'Narrow it down', 3: 'The specific question' };

Object.assign(window, { GPS_MILESTONES, GPS_LEVEL_LABEL });
