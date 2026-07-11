// aTyp — GPS milestone & question data.
// Generated from "Additional material/JoyDew_GPS_Level_One_Pilot_Small_Question_Model_for_Pilot_v1.xlsx"
// (JoyDew GPS Level One Pilot — Small Question Model, 90 questions / 8 milestones).
//
// Model rules (from the Design_Rules sheet):
//  - The database contains neutral questions only — no answers, laws, or
//    recommendations. Personalized guidance comes from the LLM layer.
//  - Question levels: L1 screening (critical) → L2 clarifies L1 (high)
//    → L3 deeper follow-up for the AI layer (medium).
//  - Each milestone has a Current track ("now") and a Future track ("planning").
//  - Progressive cascade: L2 questions marked `cascade` resurface as
//    top-level questions on the next milestone when unresolved.
//
// minAge/maxAge are only anchors for the "you are here" marker on the map;
// `trigger` holds the real age-or-trigger wording from the model.

const GPS_MILESTONES = [
  {
    "id": "m1",
    "emoji": "🧩",
    "label": "Diagnosis",
    "sub": "Getting a clear picture",
    "fullName": "Diagnosis",
    "trigger": "Age 2-8 / when diagnosis is being considered",
    "domain": "Medical / Services",
    "minAge": 0,
    "maxAge": 8,
    "description": "A clear diagnostic picture helps you ask better questions about supports, services, communication, education — and the road ahead.",
    "questions": [
      {
        "id": "P001",
        "level": 1,
        "timing": "current",
        "risk": "critical",
        "text": "Does the current diagnostic picture accurately explain my child's strengths, challenges, and support needs?",
        "children": [
          {
            "id": "P002",
            "level": 2,
            "timing": "current",
            "risk": "high",
            "text": "What evaluations have already been completed?",
            "children": [
              {
                "id": "P003",
                "level": 3,
                "timing": "current",
                "risk": "medium",
                "text": "What areas of functioning remain unclear?"
              }
            ],
            "why": "A clear diagnostic picture helps the family ask better questions about supports, services, communication, education, and future planning.",
            "cascade": true
          },
          {
            "id": "P004",
            "level": 2,
            "timing": "current",
            "risk": "high",
            "text": "Are co-occurring needs being considered?",
            "children": [
              {
                "id": "P005",
                "level": 3,
                "timing": "current",
                "risk": "medium",
                "text": "What needs are not yet explained by the current diagnosis?"
              }
            ],
            "why": "A clear diagnostic picture helps the family ask better questions about supports, services, communication, education, and future planning.",
            "cascade": true
          }
        ],
        "why": "A clear diagnostic picture helps the family ask better questions about supports, services, communication, education, and future planning."
      },
      {
        "id": "P006",
        "level": 1,
        "timing": "future",
        "risk": "critical",
        "text": "Which diagnosis or combination of diagnoses may best support my child's long-term quality of life and access to appropriate services?",
        "children": [
          {
            "id": "P007",
            "level": 2,
            "timing": "future",
            "risk": "high",
            "text": "How could the diagnosis affect service access now?",
            "children": [
              {
                "id": "P008",
                "level": 3,
                "timing": "future",
                "risk": "medium",
                "text": "How could the diagnosis affect adult-service planning later?"
              }
            ],
            "why": "The GPS should help families think beyond labels toward long-term access, opportunity, and quality of life.",
            "cascade": true
          },
          {
            "id": "P009",
            "level": 2,
            "timing": "future",
            "risk": "high",
            "text": "Are there labels that could create unintended barriers?",
            "children": [
              {
                "id": "P010",
                "level": 3,
                "timing": "future",
                "risk": "medium",
                "text": "What long-term assumptions might follow from each label?"
              }
            ],
            "why": "The GPS should help families think beyond labels toward long-term access, opportunity, and quality of life.",
            "cascade": true
          }
        ],
        "why": "The GPS should help families think beyond labels toward long-term access, opportunity, and quality of life."
      }
    ]
  },
  {
    "id": "m2",
    "emoji": "🏫",
    "label": "IEP & Advocacy",
    "sub": "A school plan that works",
    "fullName": "IEP Readiness & Advocacy",
    "trigger": "Preschool through age 20",
    "domain": "Education",
    "minAge": 3,
    "maxAge": 12,
    "description": "The IEP is often the main planning tool during childhood. It should connect daily school supports to outcomes that will still matter years from now.",
    "questions": [
      {
        "id": "P011",
        "level": 1,
        "timing": "current",
        "risk": "critical",
        "text": "Does the current IEP reflect the child's real needs, strengths, and family priorities?",
        "children": [
          {
            "id": "P012",
            "level": 2,
            "timing": "current",
            "risk": "high",
            "text": "Are the goals measurable and meaningful?",
            "children": [
              {
                "id": "P013",
                "level": 3,
                "timing": "current",
                "risk": "medium",
                "text": "Which goals will still matter five years from now?"
              }
            ],
            "why": "The IEP is often the main planning tool during childhood and should connect daily school supports to meaningful outcomes.",
            "cascade": true
          },
          {
            "id": "P014",
            "level": 2,
            "timing": "current",
            "risk": "high",
            "text": "Are services aligned with the child's needs?",
            "children": [
              {
                "id": "P015",
                "level": 3,
                "timing": "current",
                "risk": "medium",
                "text": "Which supports are missing or no longer working?"
              }
            ],
            "why": "The IEP is often the main planning tool during childhood and should connect daily school supports to meaningful outcomes.",
            "cascade": true
          }
        ],
        "why": "The IEP is often the main planning tool during childhood and should connect daily school supports to meaningful outcomes."
      },
      {
        "id": "P016",
        "level": 1,
        "timing": "future",
        "risk": "critical",
        "text": "Is the IEP preparing the child for the next educational stage and ultimately adulthood?",
        "children": [
          {
            "id": "P017",
            "level": 2,
            "timing": "future",
            "risk": "high",
            "text": "What transition is coming next?",
            "children": [
              {
                "id": "P018",
                "level": 3,
                "timing": "future",
                "risk": "medium",
                "text": "What skills will be needed for that next transition?"
              }
            ],
            "why": "Each school year should build skills for the next transition, not only address the current placement.",
            "cascade": true
          },
          {
            "id": "P019",
            "level": 2,
            "timing": "future",
            "risk": "high",
            "text": "Are independence and communication goals being built early enough?",
            "children": [
              {
                "id": "P020",
                "level": 3,
                "timing": "future",
                "risk": "medium",
                "text": "Which adult-life skills should begin before age 20?"
              }
            ],
            "why": "Each school year should build skills for the next transition, not only address the current placement.",
            "cascade": true
          }
        ],
        "why": "Each school year should build skills for the next transition, not only address the current placement."
      }
    ]
  },
  {
    "id": "m3",
    "emoji": "🌗",
    "label": "Puberty",
    "sub": "Body, privacy & safety",
    "fullName": "Puberty",
    "trigger": "Not age-specific / when puberty-related changes appear",
    "domain": "Health / Safety / Daily Life",
    "minAge": 9,
    "maxAge": 14,
    "description": "Physical, emotional, and sensory changes arrive on their own schedule. Recognizing them early — and preparing for privacy, relationships, and body safety — makes this stage safer and calmer.",
    "questions": [
      {
        "id": "P021",
        "level": 1,
        "timing": "current",
        "risk": "critical",
        "text": "Are physical, emotional, sensory, and behavioral changes related to puberty being recognized and supported?",
        "children": [
          {
            "id": "P022",
            "level": 2,
            "timing": "current",
            "risk": "high",
            "text": "What changes are we noticing at home or school?",
            "children": [
              {
                "id": "P023",
                "level": 3,
                "timing": "current",
                "risk": "medium",
                "text": "Which changes may require new supports?"
              }
            ],
            "why": "Puberty can change support needs quickly and may affect safety, communication, hygiene, anxiety, and participation.",
            "cascade": true
          },
          {
            "id": "P024",
            "level": 2,
            "timing": "current",
            "risk": "high",
            "text": "Can the individual communicate discomfort or confusion?",
            "children": [
              {
                "id": "P025",
                "level": 3,
                "timing": "current",
                "risk": "medium",
                "text": "What communication supports are needed around body changes?"
              }
            ],
            "why": "Puberty can change support needs quickly and may affect safety, communication, hygiene, anxiety, and participation.",
            "cascade": true
          }
        ],
        "why": "Puberty can change support needs quickly and may affect safety, communication, hygiene, anxiety, and participation."
      },
      {
        "id": "P026",
        "level": 1,
        "timing": "future",
        "risk": "critical",
        "text": "Are we preparing for privacy, relationships, body safety, and independence during and after puberty?",
        "children": [
          {
            "id": "P027",
            "level": 2,
            "timing": "future",
            "risk": "high",
            "text": "Has privacy been taught in a way the individual understands?",
            "children": [
              {
                "id": "P028",
                "level": 3,
                "timing": "future",
                "risk": "medium",
                "text": "What privacy routines need to be practiced?"
              }
            ],
            "why": "Families often need proactive questions before safety, privacy, or relationship concerns become urgent.",
            "cascade": true
          },
          {
            "id": "P029",
            "level": 2,
            "timing": "future",
            "risk": "high",
            "text": "Has body safety been addressed appropriately?",
            "children": [
              {
                "id": "P030",
                "level": 3,
                "timing": "future",
                "risk": "medium",
                "text": "How will the individual report discomfort, fear, or unsafe situations?"
              }
            ],
            "why": "Families often need proactive questions before safety, privacy, or relationship concerns become urgent.",
            "cascade": true
          }
        ],
        "why": "Families often need proactive questions before safety, privacy, or relationship concerns become urgent."
      }
    ]
  },
  {
    "id": "m4",
    "emoji": "🎒",
    "label": "High School Planning",
    "sub": "Strengths & adult pathways",
    "fullName": "High School Planning",
    "trigger": "Age 15-17",
    "domain": "Education / Employment",
    "minAge": 14,
    "maxAge": 17,
    "description": "High school is where strengths, interests, and possible adult pathways come into focus. What is tried before 18 shapes what is possible after 21.",
    "questions": [
      {
        "id": "P031",
        "level": 1,
        "timing": "current",
        "risk": "critical",
        "text": "Is high school being used to identify strengths, interests, and possible adult pathways?",
        "children": [
          {
            "id": "P032",
            "level": 2,
            "timing": "current",
            "risk": "high",
            "text": "What strengths are becoming clear?",
            "children": [
              {
                "id": "P033",
                "level": 3,
                "timing": "current",
                "risk": "medium",
                "text": "Which environments help those strengths appear?"
              }
            ],
            "why": "High school is the key window to test interests and build a practical bridge to adult life.",
            "cascade": true
          },
          {
            "id": "P034",
            "level": 2,
            "timing": "current",
            "risk": "high",
            "text": "Has vocational or community exposure begun?",
            "children": [
              {
                "id": "P035",
                "level": 3,
                "timing": "current",
                "risk": "medium",
                "text": "What experiences should be tried before age 18?"
              }
            ],
            "why": "High school is the key window to test interests and build a practical bridge to adult life.",
            "cascade": true
          }
        ],
        "why": "High school is the key window to test interests and build a practical bridge to adult life."
      },
      {
        "id": "P036",
        "level": 1,
        "timing": "future",
        "risk": "critical",
        "text": "Is the school plan building toward employment, contribution, higher education, or meaningful daytime activity after age 21?",
        "children": [
          {
            "id": "P037",
            "level": 2,
            "timing": "future",
            "risk": "high",
            "text": "What adult pathway is most realistic today?",
            "children": [
              {
                "id": "P038",
                "level": 3,
                "timing": "future",
                "risk": "medium",
                "text": "What alternative pathway should also be explored?"
              }
            ],
            "why": "A diploma or school placement is not enough; families need a post-school life plan.",
            "cascade": true
          },
          {
            "id": "P039",
            "level": 2,
            "timing": "future",
            "risk": "high",
            "text": "What barriers could prevent post-school success?",
            "children": [
              {
                "id": "P040",
                "level": 3,
                "timing": "future",
                "risk": "medium",
                "text": "Which barriers should be reduced before age 18?"
              }
            ],
            "why": "A diploma or school placement is not enough; families need a post-school life plan.",
            "cascade": true
          }
        ],
        "why": "A diploma or school placement is not enough; families need a post-school life plan."
      }
    ]
  },
  {
    "id": "m5",
    "emoji": "🧭",
    "label": "Adult Readiness",
    "sub": "Legal, benefits & finances",
    "fullName": "Adult Readiness & Post-21 Preparation",
    "trigger": "Age 16-20 / Super-Milestone",
    "domain": "Legal / Benefits / Finance / Life Plan",
    "minAge": 16,
    "maxAge": 20,
    "description": "The transition super-milestone. Legal decisions, Medicaid and adult services, and financial steps all have deadlines that arrive at 18 and 21 — this stage gets double coverage because it is high-risk and complex.",
    "questions": [
      {
        "id": "P041",
        "level": 1,
        "timing": "current",
        "risk": "critical",
        "text": "What steps should I take today to maximize my child's quality of life and my family's quality of life after age 21?",
        "children": [
          {
            "id": "P042",
            "level": 2,
            "timing": "current",
            "risk": "high",
            "text": "What does a good adult life look like for my child?",
            "children": [
              {
                "id": "P043",
                "level": 3,
                "timing": "current",
                "risk": "medium",
                "text": "What outcomes would show quality of life at age 25?"
              }
            ],
            "why": "The transition years determine whether adulthood begins with a plan or with a crisis after school services end.",
            "cascade": true
          },
          {
            "id": "P044",
            "level": 2,
            "timing": "current",
            "risk": "high",
            "text": "What does a sustainable family life look like after age 21?",
            "children": [
              {
                "id": "P045",
                "level": 3,
                "timing": "current",
                "risk": "medium",
                "text": "What family stress points must be reduced before school ends?"
              }
            ],
            "why": "The transition years determine whether adulthood begins with a plan or with a crisis after school services end.",
            "cascade": true
          }
        ],
        "why": "The transition years determine whether adulthood begins with a plan or with a crisis after school services end."
      },
      {
        "id": "P046",
        "level": 1,
        "timing": "current",
        "risk": "critical",
        "text": "What steps should I take to prepare all legal requirements before age 21?",
        "children": [
          {
            "id": "P047",
            "level": 2,
            "timing": "current",
            "risk": "high",
            "text": "What decisions will my child be expected to make at age 18?",
            "children": [
              {
                "id": "P048",
                "level": 3,
                "timing": "current",
                "risk": "medium",
                "text": "Which decisions may require support?"
              }
            ],
            "why": "Legal responsibility changes in adulthood, and families need to understand decision-making supports before urgent decisions arise.",
            "cascade": true
          },
          {
            "id": "P049",
            "level": 2,
            "timing": "current",
            "risk": "high",
            "text": "Who should be involved in decision-making planning?",
            "children": [
              {
                "id": "P050",
                "level": 3,
                "timing": "current",
                "risk": "medium",
                "text": "What safeguards are needed while preserving autonomy?"
              }
            ],
            "why": "Legal responsibility changes in adulthood, and families need to understand decision-making supports before urgent decisions arise.",
            "cascade": true
          }
        ],
        "why": "Legal responsibility changes in adulthood, and families need to understand decision-making supports before urgent decisions arise."
      },
      {
        "id": "P051",
        "level": 1,
        "timing": "current",
        "risk": "critical",
        "text": "What steps should I take to connect my child to Medicaid and my state's adult service system?",
        "children": [
          {
            "id": "P052",
            "level": 2,
            "timing": "current",
            "risk": "high",
            "text": "What adult services may be needed after age 21?",
            "children": [
              {
                "id": "P053",
                "level": 3,
                "timing": "current",
                "risk": "medium",
                "text": "Which of those services require eligibility steps before age 21?"
              }
            ],
            "why": "Many adult supports depend on eligibility pathways, applications, documentation, and timing.",
            "cascade": true
          },
          {
            "id": "P054",
            "level": 2,
            "timing": "current",
            "risk": "high",
            "text": "What documentation should be organized now?",
            "children": [
              {
                "id": "P055",
                "level": 3,
                "timing": "current",
                "risk": "medium",
                "text": "What applications or waiting lists may affect timing?"
              }
            ],
            "why": "Many adult supports depend on eligibility pathways, applications, documentation, and timing.",
            "cascade": true
          }
        ],
        "why": "Many adult supports depend on eligibility pathways, applications, documentation, and timing."
      },
      {
        "id": "P056",
        "level": 1,
        "timing": "future",
        "risk": "critical",
        "text": "What financial steps should I take before my child turns 21?",
        "children": [
          {
            "id": "P057",
            "level": 2,
            "timing": "future",
            "risk": "high",
            "text": "What future expenses should we anticipate?",
            "children": [
              {
                "id": "P058",
                "level": 3,
                "timing": "future",
                "risk": "medium",
                "text": "Which costs may increase after school services end?"
              }
            ],
            "why": "Financial planning affects housing, services, benefits, caregiving, and long-term family stability.",
            "cascade": true
          },
          {
            "id": "P059",
            "level": 2,
            "timing": "future",
            "risk": "high",
            "text": "How should family finances align with benefits and long-term support needs?",
            "children": [
              {
                "id": "P060",
                "level": 3,
                "timing": "future",
                "risk": "medium",
                "text": "What financial decisions could affect future eligibility or security?"
              }
            ],
            "why": "Financial planning affects housing, services, benefits, caregiving, and long-term family stability.",
            "cascade": true
          }
        ],
        "why": "Financial planning affects housing, services, benefits, caregiving, and long-term family stability."
      }
    ]
  },
  {
    "id": "m6",
    "emoji": "⛰️",
    "label": "T1 Cliff",
    "sub": "Life after school ends",
    "fullName": "T1 Cliff",
    "trigger": "Age 21 / school exit",
    "domain": "Adult Services / Daily Life",
    "minAge": 21,
    "maxAge": 22,
    "description": "At 21 the school-based system — services, routines, therapies, structure — ends at once. This stage is about seeing what was lost and rebuilding a meaningful week.",
    "questions": [
      {
        "id": "P061",
        "level": 1,
        "timing": "current",
        "risk": "critical",
        "text": "What services, routines, therapies, and supports ended when school ended?",
        "children": [
          {
            "id": "P062",
            "level": 2,
            "timing": "current",
            "risk": "high",
            "text": "Which supports were school-based?",
            "children": [
              {
                "id": "P063",
                "level": 3,
                "timing": "current",
                "risk": "medium",
                "text": "Which school-based supports have no replacement yet?"
              }
            ],
            "why": "The T1 Cliff exposes gaps that were previously hidden by the school system.",
            "cascade": true
          },
          {
            "id": "P064",
            "level": 2,
            "timing": "current",
            "risk": "high",
            "text": "What changed in the weekly schedule?",
            "children": [
              {
                "id": "P065",
                "level": 3,
                "timing": "current",
                "risk": "medium",
                "text": "Where are the biggest gaps in the week?"
              }
            ],
            "why": "The T1 Cliff exposes gaps that were previously hidden by the school system.",
            "cascade": true
          }
        ],
        "why": "The T1 Cliff exposes gaps that were previously hidden by the school system."
      },
      {
        "id": "P066",
        "level": 1,
        "timing": "future",
        "risk": "critical",
        "text": "What structure, services, and supports must replace the school-based system after age 21?",
        "children": [
          {
            "id": "P067",
            "level": 2,
            "timing": "future",
            "risk": "high",
            "text": "What does a meaningful week look like now?",
            "children": [
              {
                "id": "P068",
                "level": 3,
                "timing": "future",
                "risk": "medium",
                "text": "What should the week look like one year from now?"
              }
            ],
            "why": "A meaningful adult life requires a new structure for daily activity, relationships, health, and support coordination.",
            "cascade": true
          },
          {
            "id": "P069",
            "level": 2,
            "timing": "future",
            "risk": "high",
            "text": "Who coordinates the adult support system?",
            "children": [
              {
                "id": "P070",
                "level": 3,
                "timing": "future",
                "risk": "medium",
                "text": "What backup plan exists if supports fail?"
              }
            ],
            "why": "A meaningful adult life requires a new structure for daily activity, relationships, health, and support coordination.",
            "cascade": true
          }
        ],
        "why": "A meaningful adult life requires a new structure for daily activity, relationships, health, and support coordination."
      }
    ]
  },
  {
    "id": "m7",
    "emoji": "🏡",
    "label": "Housing Launch",
    "sub": "A home beyond the family home",
    "fullName": "Housing Launch",
    "trigger": "Parent 55+ and child 16+ / or earlier concern",
    "domain": "Housing / Family Aging",
    "minAge": 21,
    "maxAge": 39,
    "description": "Long-term housing works best when it is planned before a crisis forces the decision. Safety, autonomy, belonging, and family sustainability all belong in the picture.",
    "questions": [
      {
        "id": "P071",
        "level": 1,
        "timing": "current",
        "risk": "critical",
        "text": "Have we started long-term housing planning before a crisis forces the decision?",
        "children": [
          {
            "id": "P072",
            "level": 2,
            "timing": "current",
            "risk": "high",
            "text": "Where is the individual expected to live in five years?",
            "children": [
              {
                "id": "P073",
                "level": 3,
                "timing": "current",
                "risk": "medium",
                "text": "What makes the current housing situation sustainable or fragile?"
              }
            ],
            "why": "Housing usually takes years to plan and is closely tied to benefits, staffing, family aging, and quality of life.",
            "cascade": true
          },
          {
            "id": "P074",
            "level": 2,
            "timing": "current",
            "risk": "high",
            "text": "What level of support is needed at home?",
            "children": [
              {
                "id": "P075",
                "level": 3,
                "timing": "current",
                "risk": "medium",
                "text": "How might that support need change over time?"
              }
            ],
            "why": "Housing usually takes years to plan and is closely tied to benefits, staffing, family aging, and quality of life.",
            "cascade": true
          }
        ],
        "why": "Housing usually takes years to plan and is closely tied to benefits, staffing, family aging, and quality of life."
      },
      {
        "id": "P076",
        "level": 1,
        "timing": "future",
        "risk": "critical",
        "text": "What housing model would best support safety, autonomy, belonging, and family sustainability?",
        "children": [
          {
            "id": "P077",
            "level": 2,
            "timing": "future",
            "risk": "high",
            "text": "What does a good home mean for the individual?",
            "children": [
              {
                "id": "P078",
                "level": 3,
                "timing": "future",
                "risk": "medium",
                "text": "What community features matter most?"
              }
            ],
            "why": "The best housing plan should balance support needs with dignity, relationships, independence, and family wellbeing.",
            "cascade": true
          },
          {
            "id": "P079",
            "level": 2,
            "timing": "future",
            "risk": "high",
            "text": "What housing risks should be avoided?",
            "children": [
              {
                "id": "P080",
                "level": 3,
                "timing": "future",
                "risk": "medium",
                "text": "What future caregiver limits should be considered now?"
              }
            ],
            "why": "The best housing plan should balance support needs with dignity, relationships, independence, and family wellbeing.",
            "cascade": true
          }
        ],
        "why": "The best housing plan should balance support needs with dignity, relationships, independence, and family wellbeing."
      }
    ]
  },
  {
    "id": "m8",
    "emoji": "🔄",
    "label": "ISP Annual Planning",
    "sub": "A better year, every year",
    "fullName": "ISP Annual Planning",
    "trigger": "Age 21+ / every year",
    "domain": "Adult Services / Quality of Life",
    "minAge": 21,
    "maxAge": 999,
    "description": "The annual ISP should reflect the person's real goals and preferences — and move them toward a better next year, not just repeat the last one.",
    "questions": [
      {
        "id": "P081",
        "level": 1,
        "timing": "current",
        "risk": "critical",
        "text": "Does the ISP reflect the person's actual goals, preferences, strengths, and support needs this year?",
        "children": [
          {
            "id": "P082",
            "level": 2,
            "timing": "current",
            "risk": "high",
            "text": "Did the individual participate in the planning process?",
            "children": [
              {
                "id": "P083",
                "level": 3,
                "timing": "current",
                "risk": "medium",
                "text": "How were preferences communicated or interpreted?"
              }
            ],
            "why": "The ISP should drive meaningful adult outcomes, not simply repeat services from the prior year.",
            "cascade": true
          },
          {
            "id": "P084",
            "level": 2,
            "timing": "current",
            "risk": "high",
            "text": "Are current supports accurately described?",
            "children": [
              {
                "id": "P085",
                "level": 3,
                "timing": "current",
                "risk": "medium",
                "text": "What support needs are missing or outdated?"
              }
            ],
            "why": "The ISP should drive meaningful adult outcomes, not simply repeat services from the prior year.",
            "cascade": true
          }
        ],
        "why": "The ISP should drive meaningful adult outcomes, not simply repeat services from the prior year."
      },
      {
        "id": "P086",
        "level": 1,
        "timing": "future",
        "risk": "critical",
        "text": "Is this year's ISP moving the person toward a better next year and a stronger adult life?",
        "children": [
          {
            "id": "P087",
            "level": 2,
            "timing": "future",
            "risk": "high",
            "text": "What changed since the last ISP?",
            "children": [
              {
                "id": "P088",
                "level": 3,
                "timing": "future",
                "risk": "medium",
                "text": "What goals should change because life has changed?"
              }
            ],
            "why": "Annual planning should create progress in quality of life, not only maintain the status quo.",
            "cascade": true
          },
          {
            "id": "P089",
            "level": 2,
            "timing": "future",
            "risk": "high",
            "text": "What should improve by next year's ISP?",
            "children": [
              {
                "id": "P090",
                "level": 3,
                "timing": "future",
                "risk": "medium",
                "text": "What future risks should this ISP begin to prepare for?"
              }
            ],
            "why": "Annual planning should create progress in quality of life, not only maintain the status quo.",
            "cascade": true
          }
        ],
        "why": "Annual planning should create progress in quality of life, not only maintain the status quo."
      }
    ]
  }
];

// Answer scale shown under every question. One tap = one micro-answer;
// the AI layer interprets them, the app never judges an answer.
const GPS_ANSWER_OPTIONS = [
  { id: 'yes',    label: 'Yes',          emoji: '👍' },
  { id: 'no',     label: 'No',           emoji: '👎' },
  { id: 'unsure', label: 'Not sure',     emoji: '🤔' },
  { id: 'na',     label: 'Not relevant', emoji: '➖' },
];

// Answers that leave a cascade-tagged L2 question unresolved, so it carries
// over to the next milestone as a top-level question.
const GPS_OPEN_ANSWERS = new Set(['no', 'unsure']);

Object.assign(window, { GPS_MILESTONES, GPS_ANSWER_OPTIONS, GPS_OPEN_ANSWERS });
