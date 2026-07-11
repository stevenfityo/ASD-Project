// aTyp — GPS question data.
// SOURCE OF TRUTH: "Additional material/2021-01-25 Questions you need to ask
// V_, Moish_Larry.xlsx" (Moisha's question grid). Questions are copied verbatim.
//
// Structure of that Excel: columns = 8 age stages, rows = 8 categories. We keep
// the same shape here:
//   GPS_STAGES[]  = the 8 age stages (the GPS path the child travels by age).
//     .categories[] = Moisha's categories that have questions at that age.
//       .questions[] = the cell's questions, in Moisha's order.
//         level  : 1 = the first (headline) question of the category, 2 = the
//                  follow-up rows beneath it. (Moisha groups a lead question
//                  with sub-rows, e.g. "What are my rights?" → hometown/county…)
//         timing : "current" or "future". Moisha's grid has no such column, so
//                  we tag each question: planning / anticipation / next-stage
//                  wording ("plan", "expect", "who will pay", "protect …future",
//                  "how will …") => future; present routine / rights / needs =>
//                  current. This is a first-pass heuristic — easy to retune by
//                  editing a question's `timing` field.
//
// Neutral questions only — no answers, laws or advice; the AI layer personalizes.

const GPS_STAGES = [
  {
    "id": "s1",
    "emoji": "👶",
    "label": "Ages 1–3",
    "sub": "Early years",
    "ageKey": "1-3",
    "minAge": 0,
    "maxAge": 3,
    "description": "The early years — first questions about diagnosis, routines and support.",
    "categories": [
      {
        "name": "Medical",
        "emoji": "🩺",
        "questions": [
          {
            "id": "s1-medical-1",
            "level": 1,
            "timing": "future",
            "text": "What is the best Diagnosis Code to optimize future services?"
          },
          {
            "id": "s1-medical-2",
            "level": 2,
            "timing": "future",
            "text": "Are there other Medical Conditions that I need to look for?"
          },
          {
            "id": "s1-medical-3",
            "level": 2,
            "timing": "current",
            "text": "Which Doctor should I talk to?"
          },
          {
            "id": "s1-medical-4",
            "level": 2,
            "timing": "future",
            "text": "I'm concerned that my child may have autism, should I seek a diagnosis?"
          },
          {
            "id": "s1-medical-5",
            "level": 2,
            "timing": "future",
            "text": "What is the best Diagnosis Code to optimize funding for future services?"
          }
        ]
      },
      {
        "name": "Therapy",
        "emoji": "🧠",
        "questions": [
          {
            "id": "s1-therapy-1",
            "level": 1,
            "timing": "current",
            "text": "Do I need Early intervention?"
          },
          {
            "id": "s1-therapy-2",
            "level": 2,
            "timing": "current",
            "text": "What are the most important therapies?"
          },
          {
            "id": "s1-therapy-3",
            "level": 2,
            "timing": "current",
            "text": "What are the pros/cons on therapies methods"
          },
          {
            "id": "s1-therapy-4",
            "level": 2,
            "timing": "current",
            "text": "Is the Therapy legitimate?"
          }
        ]
      },
      {
        "name": "Finance",
        "emoji": "💰",
        "questions": [
          {
            "id": "s1-finance-1",
            "level": 1,
            "timing": "future",
            "text": "Who will pay for Early Intervention"
          },
          {
            "id": "s1-finance-2",
            "level": 2,
            "timing": "future",
            "text": "Who will pay for therapies"
          },
          {
            "id": "s1-finance-3",
            "level": 2,
            "timing": "current",
            "text": "What other costs /income should I consider"
          }
        ]
      },
      {
        "name": "Legal",
        "emoji": "⚖️",
        "questions": [
          {
            "id": "s1-legal-1",
            "level": 1,
            "timing": "current",
            "text": "What are my rights?"
          },
          {
            "id": "s1-legal-2",
            "level": 2,
            "timing": "current",
            "text": "in my hometown"
          },
          {
            "id": "s1-legal-3",
            "level": 2,
            "timing": "current",
            "text": "in my county"
          },
          {
            "id": "s1-legal-4",
            "level": 2,
            "timing": "current",
            "text": "in my state"
          },
          {
            "id": "s1-legal-5",
            "level": 2,
            "timing": "current",
            "text": "In my country"
          },
          {
            "id": "s1-legal-6",
            "level": 2,
            "timing": "future",
            "text": "What other legal steps I should take to protect my child's future?"
          }
        ]
      },
      {
        "name": "Daily Life",
        "emoji": "🗓️",
        "questions": [
          {
            "id": "s1-dailylife-1",
            "level": 1,
            "timing": "future",
            "text": "my life changed. What should I plan for?"
          },
          {
            "id": "s1-dailylife-2",
            "level": 2,
            "timing": "current",
            "text": "Day routine"
          },
          {
            "id": "s1-dailylife-3",
            "level": 2,
            "timing": "current",
            "text": "Night Routine"
          },
          {
            "id": "s1-dailylife-4",
            "level": 2,
            "timing": "current",
            "text": "Week"
          },
          {
            "id": "s1-dailylife-5",
            "level": 2,
            "timing": "current",
            "text": "Month"
          },
          {
            "id": "s1-dailylife-6",
            "level": 2,
            "timing": "current",
            "text": "Year"
          },
          {
            "id": "s1-dailylife-7",
            "level": 2,
            "timing": "current",
            "text": "Weekend"
          },
          {
            "id": "s1-dailylife-8",
            "level": 2,
            "timing": "current",
            "text": "Holidays"
          },
          {
            "id": "s1-dailylife-9",
            "level": 2,
            "timing": "current",
            "text": "Birthday"
          },
          {
            "id": "s1-dailylife-10",
            "level": 2,
            "timing": "current",
            "text": "Vacation"
          },
          {
            "id": "s1-dailylife-11",
            "level": 2,
            "timing": "future",
            "text": "Next stage"
          }
        ]
      },
      {
        "name": "Family",
        "emoji": "👪",
        "questions": [
          {
            "id": "s1-family-1",
            "level": 1,
            "timing": "future",
            "text": "what should I Expect?"
          },
          {
            "id": "s1-family-2",
            "level": 2,
            "timing": "current",
            "text": "Parents"
          },
          {
            "id": "s1-family-3",
            "level": 2,
            "timing": "current",
            "text": "sibling"
          },
          {
            "id": "s1-family-4",
            "level": 2,
            "timing": "current",
            "text": "Grandparents"
          },
          {
            "id": "s1-family-5",
            "level": 2,
            "timing": "current",
            "text": "Extended Family"
          },
          {
            "id": "s1-family-6",
            "level": 2,
            "timing": "current",
            "text": "What should I do with regard to:"
          }
        ]
      }
    ]
  },
  {
    "id": "s2",
    "emoji": "🧒",
    "label": "Ages 4–8",
    "sub": "Childhood",
    "ageKey": "4-8",
    "minAge": 4,
    "maxAge": 8,
    "description": "Building daily routines, therapies and the first school steps.",
    "categories": [
      {
        "name": "Medical",
        "emoji": "🩺",
        "questions": [
          {
            "id": "s2-medical-1",
            "level": 1,
            "timing": "current",
            "text": "What is my medical routine?"
          },
          {
            "id": "s2-medical-2",
            "level": 2,
            "timing": "current",
            "text": "Does my child's medical routine need to be different"
          },
          {
            "id": "s2-medical-3",
            "level": 2,
            "timing": "future",
            "text": "What should I expect from my doctor"
          },
          {
            "id": "s2-medical-4",
            "level": 2,
            "timing": "current",
            "text": "What should I ask/tell my doctor"
          },
          {
            "id": "s2-medical-5",
            "level": 2,
            "timing": "current",
            "text": "Which Doctor should I talk to?"
          },
          {
            "id": "s2-medical-6",
            "level": 2,
            "timing": "future",
            "text": "What medical situation(s) should I expect?"
          },
          {
            "id": "s2-medical-7",
            "level": 2,
            "timing": "current",
            "text": "What do I do in case of a medical emergency?"
          },
          {
            "id": "s2-medical-8",
            "level": 2,
            "timing": "current",
            "text": "Should I consider medications/supplements?"
          },
          {
            "id": "s2-medical-9",
            "level": 2,
            "timing": "current",
            "text": "Why is my child not speaking?"
          },
          {
            "id": "s2-medical-10",
            "level": 2,
            "timing": "current",
            "text": "What should I do about my child not speaking?"
          }
        ]
      },
      {
        "name": "Therapy",
        "emoji": "🧠",
        "questions": [
          {
            "id": "s2-therapy-1",
            "level": 1,
            "timing": "current",
            "text": "What are the most important therapies at this age?"
          }
        ]
      },
      {
        "name": "Education",
        "emoji": "📚",
        "questions": [
          {
            "id": "s2-education-1",
            "level": 1,
            "timing": "future",
            "text": "What day care I should look for"
          }
        ]
      },
      {
        "name": "Finance",
        "emoji": "💰",
        "questions": [
          {
            "id": "s2-finance-1",
            "level": 1,
            "timing": "future",
            "text": "Who will pay for education?"
          },
          {
            "id": "s2-finance-2",
            "level": 2,
            "timing": "future",
            "text": "Who will pay for therapies"
          },
          {
            "id": "s2-finance-3",
            "level": 2,
            "timing": "current",
            "text": "What other cost/income I should consider"
          }
        ]
      },
      {
        "name": "Legal",
        "emoji": "⚖️",
        "questions": [
          {
            "id": "s2-legal-1",
            "level": 1,
            "timing": "current",
            "text": "What are my rights?"
          },
          {
            "id": "s2-legal-2",
            "level": 2,
            "timing": "current",
            "text": "in my hometown"
          },
          {
            "id": "s2-legal-3",
            "level": 2,
            "timing": "current",
            "text": "in my county"
          },
          {
            "id": "s2-legal-4",
            "level": 2,
            "timing": "current",
            "text": "in my state"
          },
          {
            "id": "s2-legal-5",
            "level": 2,
            "timing": "current",
            "text": "In my country"
          },
          {
            "id": "s2-legal-6",
            "level": 2,
            "timing": "future",
            "text": "What other legal steps I should take to protect my child's future?"
          }
        ]
      },
      {
        "name": "Daily Life",
        "emoji": "🗓️",
        "questions": [
          {
            "id": "s2-dailylife-1",
            "level": 1,
            "timing": "future",
            "text": "my life changed. What should I plan for?"
          },
          {
            "id": "s2-dailylife-2",
            "level": 2,
            "timing": "current",
            "text": "Day routine"
          },
          {
            "id": "s2-dailylife-3",
            "level": 2,
            "timing": "current",
            "text": "Night Routine"
          },
          {
            "id": "s2-dailylife-4",
            "level": 2,
            "timing": "current",
            "text": "Week"
          },
          {
            "id": "s2-dailylife-5",
            "level": 2,
            "timing": "current",
            "text": "Month"
          },
          {
            "id": "s2-dailylife-6",
            "level": 2,
            "timing": "current",
            "text": "Year"
          },
          {
            "id": "s2-dailylife-7",
            "level": 2,
            "timing": "current",
            "text": "Weekend"
          },
          {
            "id": "s2-dailylife-8",
            "level": 2,
            "timing": "current",
            "text": "Holidays"
          },
          {
            "id": "s2-dailylife-9",
            "level": 2,
            "timing": "current",
            "text": "Birthday"
          },
          {
            "id": "s2-dailylife-10",
            "level": 2,
            "timing": "current",
            "text": "Vacation"
          },
          {
            "id": "s2-dailylife-11",
            "level": 2,
            "timing": "future",
            "text": "Next stage"
          }
        ]
      },
      {
        "name": "Family",
        "emoji": "👪",
        "questions": [
          {
            "id": "s2-family-1",
            "level": 1,
            "timing": "future",
            "text": "what should I Expect?"
          },
          {
            "id": "s2-family-2",
            "level": 2,
            "timing": "current",
            "text": "Parents"
          },
          {
            "id": "s2-family-3",
            "level": 2,
            "timing": "current",
            "text": "sibling"
          },
          {
            "id": "s2-family-4",
            "level": 2,
            "timing": "current",
            "text": "Grandparents"
          },
          {
            "id": "s2-family-5",
            "level": 2,
            "timing": "current",
            "text": "Extended Family"
          },
          {
            "id": "s2-family-6",
            "level": 2,
            "timing": "current",
            "text": "What should I do with regard to:"
          }
        ]
      },
      {
        "name": "Crisis Management",
        "emoji": "🚨",
        "questions": [
          {
            "id": "s2-crisismanagement-1",
            "level": 1,
            "timing": "future",
            "text": "What crisis I should expect?"
          },
          {
            "id": "s2-crisismanagement-2",
            "level": 2,
            "timing": "current",
            "text": "What should I do in case of crisis?"
          }
        ]
      }
    ]
  },
  {
    "id": "s3",
    "emoji": "🧑",
    "label": "Ages 9–13",
    "sub": "Pre-teen",
    "ageKey": "9-13",
    "minAge": 9,
    "maxAge": 13,
    "description": "School, communication and planning for the stage ahead.",
    "categories": [
      {
        "name": "Medical",
        "emoji": "🩺",
        "questions": [
          {
            "id": "s3-medical-1",
            "level": 1,
            "timing": "current",
            "text": "What is my medical routine?"
          },
          {
            "id": "s3-medical-2",
            "level": 2,
            "timing": "current",
            "text": "Does my child's medical routine need to be different"
          },
          {
            "id": "s3-medical-3",
            "level": 2,
            "timing": "future",
            "text": "What should I expect from my doctor"
          },
          {
            "id": "s3-medical-4",
            "level": 2,
            "timing": "current",
            "text": "What should I ask/tell my doctor"
          },
          {
            "id": "s3-medical-5",
            "level": 2,
            "timing": "current",
            "text": "Which Doctor should I talk to?"
          },
          {
            "id": "s3-medical-6",
            "level": 2,
            "timing": "future",
            "text": "What medical situation(s) should I expect?"
          },
          {
            "id": "s3-medical-7",
            "level": 2,
            "timing": "current",
            "text": "What do I do in case of a medical emergency?"
          },
          {
            "id": "s3-medical-8",
            "level": 2,
            "timing": "current",
            "text": "Should I consider medications/supplements?"
          },
          {
            "id": "s3-medical-9",
            "level": 2,
            "timing": "current",
            "text": "Why is my child not speaking?"
          },
          {
            "id": "s3-medical-10",
            "level": 2,
            "timing": "current",
            "text": "What should I do about my child not speaking?"
          },
          {
            "id": "s3-medical-11",
            "level": 2,
            "timing": "current",
            "text": "My child do sleep well. What can I do?"
          }
        ]
      },
      {
        "name": "Therapy",
        "emoji": "🧠",
        "questions": [
          {
            "id": "s3-therapy-1",
            "level": 1,
            "timing": "current",
            "text": "What are the most important therapies at this age?"
          },
          {
            "id": "s3-therapy-2",
            "level": 2,
            "timing": "future",
            "text": "Should I consider alternative therapies"
          },
          {
            "id": "s3-therapy-3",
            "level": 2,
            "timing": "future",
            "text": "Should I consider alternative support"
          }
        ]
      },
      {
        "name": "Education",
        "emoji": "📚",
        "questions": [
          {
            "id": "s3-education-1",
            "level": 1,
            "timing": "future",
            "text": "What elementary school should I look for?"
          },
          {
            "id": "s3-education-2",
            "level": 2,
            "timing": "current",
            "text": "Should I seek additional home education?"
          },
          {
            "id": "s3-education-3",
            "level": 2,
            "timing": "future",
            "text": "What should I expect from schools?"
          },
          {
            "id": "s3-education-4",
            "level": 2,
            "timing": "future",
            "text": "What should expect from my child?"
          },
          {
            "id": "s3-education-5",
            "level": 2,
            "timing": "future",
            "text": "How do I plan education now and for next stage?"
          },
          {
            "id": "s3-education-6",
            "level": 2,
            "timing": "current",
            "text": "How do I communicate my child's needs"
          }
        ]
      },
      {
        "name": "Finance",
        "emoji": "💰",
        "questions": [
          {
            "id": "s3-finance-1",
            "level": 1,
            "timing": "future",
            "text": "Who will pay for education?"
          },
          {
            "id": "s3-finance-2",
            "level": 2,
            "timing": "future",
            "text": "Who will pay for therapies"
          },
          {
            "id": "s3-finance-3",
            "level": 2,
            "timing": "current",
            "text": "What other cost/income I should consider"
          }
        ]
      },
      {
        "name": "Legal",
        "emoji": "⚖️",
        "questions": [
          {
            "id": "s3-legal-1",
            "level": 1,
            "timing": "current",
            "text": "What are my rights?"
          },
          {
            "id": "s3-legal-2",
            "level": 2,
            "timing": "current",
            "text": "in my hometown"
          },
          {
            "id": "s3-legal-3",
            "level": 2,
            "timing": "current",
            "text": "in my county"
          },
          {
            "id": "s3-legal-4",
            "level": 2,
            "timing": "current",
            "text": "in my state"
          },
          {
            "id": "s3-legal-5",
            "level": 2,
            "timing": "current",
            "text": "In my country"
          },
          {
            "id": "s3-legal-6",
            "level": 2,
            "timing": "future",
            "text": "What other legal steps I should take to protect my child's future?"
          }
        ]
      },
      {
        "name": "Daily Life",
        "emoji": "🗓️",
        "questions": [
          {
            "id": "s3-dailylife-1",
            "level": 1,
            "timing": "future",
            "text": "my life changed. What should I plan for?"
          },
          {
            "id": "s3-dailylife-2",
            "level": 2,
            "timing": "current",
            "text": "Day routine"
          },
          {
            "id": "s3-dailylife-3",
            "level": 2,
            "timing": "current",
            "text": "Night Routine"
          },
          {
            "id": "s3-dailylife-4",
            "level": 2,
            "timing": "current",
            "text": "Week"
          },
          {
            "id": "s3-dailylife-5",
            "level": 2,
            "timing": "current",
            "text": "Month"
          },
          {
            "id": "s3-dailylife-6",
            "level": 2,
            "timing": "current",
            "text": "Year"
          },
          {
            "id": "s3-dailylife-7",
            "level": 2,
            "timing": "current",
            "text": "Weekend"
          },
          {
            "id": "s3-dailylife-8",
            "level": 2,
            "timing": "current",
            "text": "Holidays"
          },
          {
            "id": "s3-dailylife-9",
            "level": 2,
            "timing": "current",
            "text": "Birthday"
          },
          {
            "id": "s3-dailylife-10",
            "level": 2,
            "timing": "current",
            "text": "Vacation"
          },
          {
            "id": "s3-dailylife-11",
            "level": 2,
            "timing": "future",
            "text": "Next stage"
          }
        ]
      },
      {
        "name": "Family",
        "emoji": "👪",
        "questions": [
          {
            "id": "s3-family-1",
            "level": 1,
            "timing": "future",
            "text": "what should I Expect?"
          },
          {
            "id": "s3-family-2",
            "level": 2,
            "timing": "current",
            "text": "Parents"
          },
          {
            "id": "s3-family-3",
            "level": 2,
            "timing": "current",
            "text": "sibling"
          },
          {
            "id": "s3-family-4",
            "level": 2,
            "timing": "current",
            "text": "Grandparents"
          },
          {
            "id": "s3-family-5",
            "level": 2,
            "timing": "current",
            "text": "Extended Family"
          },
          {
            "id": "s3-family-6",
            "level": 2,
            "timing": "current",
            "text": "What should I do with regard to:"
          }
        ]
      },
      {
        "name": "Crisis Management",
        "emoji": "🚨",
        "questions": [
          {
            "id": "s3-crisismanagement-1",
            "level": 1,
            "timing": "future",
            "text": "What crisis I should expect?"
          },
          {
            "id": "s3-crisismanagement-2",
            "level": 2,
            "timing": "current",
            "text": "What should I do in case of crisis?"
          }
        ]
      }
    ]
  },
  {
    "id": "s4",
    "emoji": "🧑‍🎓",
    "label": "Ages 14–17",
    "sub": "Teen years",
    "ageKey": "14-17",
    "minAge": 14,
    "maxAge": 17,
    "description": "Teenage changes, education choices and preparing for transition.",
    "categories": [
      {
        "name": "Medical",
        "emoji": "🩺",
        "questions": [
          {
            "id": "s4-medical-1",
            "level": 1,
            "timing": "current",
            "text": "What is my medical routine?"
          },
          {
            "id": "s4-medical-2",
            "level": 2,
            "timing": "current",
            "text": "Does my child's medical routine need to be different"
          },
          {
            "id": "s4-medical-3",
            "level": 2,
            "timing": "future",
            "text": "What should I expect from my doctor"
          },
          {
            "id": "s4-medical-4",
            "level": 2,
            "timing": "current",
            "text": "What should I ask/tell my doctor"
          },
          {
            "id": "s4-medical-5",
            "level": 2,
            "timing": "current",
            "text": "Which Doctor should I talk to?"
          },
          {
            "id": "s4-medical-6",
            "level": 2,
            "timing": "future",
            "text": "What medical situation(s) should I expect?"
          },
          {
            "id": "s4-medical-7",
            "level": 2,
            "timing": "current",
            "text": "What do I do in case of a medical emergency?"
          },
          {
            "id": "s4-medical-8",
            "level": 2,
            "timing": "current",
            "text": "Should I consider medications/supplements?"
          },
          {
            "id": "s4-medical-9",
            "level": 2,
            "timing": "current",
            "text": "Why is my child not speaking?"
          },
          {
            "id": "s4-medical-10",
            "level": 2,
            "timing": "current",
            "text": "What should I do about my child not speaking?"
          },
          {
            "id": "s4-medical-11",
            "level": 2,
            "timing": "current",
            "text": "My child do sleep well. What can I do?"
          }
        ]
      },
      {
        "name": "Therapy",
        "emoji": "🧠",
        "questions": [
          {
            "id": "s4-therapy-1",
            "level": 1,
            "timing": "current",
            "text": "What are the most important therapies at this age?"
          },
          {
            "id": "s4-therapy-2",
            "level": 2,
            "timing": "future",
            "text": "Should I consider alternative therapies"
          },
          {
            "id": "s4-therapy-3",
            "level": 2,
            "timing": "future",
            "text": "Should I consider alternative support"
          }
        ]
      },
      {
        "name": "Education",
        "emoji": "📚",
        "questions": [
          {
            "id": "s4-education-1",
            "level": 1,
            "timing": "future",
            "text": "What Middle school I should look for?"
          },
          {
            "id": "s4-education-2",
            "level": 2,
            "timing": "current",
            "text": "Should I have additional home education?"
          },
          {
            "id": "s4-education-3",
            "level": 2,
            "timing": "future",
            "text": "What should I expect from schools?"
          },
          {
            "id": "s4-education-4",
            "level": 2,
            "timing": "future",
            "text": "What should expect from my child?"
          },
          {
            "id": "s4-education-5",
            "level": 2,
            "timing": "future",
            "text": "How do I plan education now and for next stage?"
          },
          {
            "id": "s4-education-6",
            "level": 2,
            "timing": "current",
            "text": "How do I communicate my child's needs"
          }
        ]
      },
      {
        "name": "Finance",
        "emoji": "💰",
        "questions": [
          {
            "id": "s4-finance-1",
            "level": 1,
            "timing": "future",
            "text": "Who will pay for education?"
          },
          {
            "id": "s4-finance-2",
            "level": 2,
            "timing": "future",
            "text": "Who will pay for therapies?"
          },
          {
            "id": "s4-finance-3",
            "level": 2,
            "timing": "current",
            "text": "What other cost/income I should consider"
          }
        ]
      },
      {
        "name": "Legal",
        "emoji": "⚖️",
        "questions": [
          {
            "id": "s4-legal-1",
            "level": 1,
            "timing": "current",
            "text": "What are my rights?"
          },
          {
            "id": "s4-legal-2",
            "level": 2,
            "timing": "current",
            "text": "in my hometown"
          },
          {
            "id": "s4-legal-3",
            "level": 2,
            "timing": "current",
            "text": "in my county"
          },
          {
            "id": "s4-legal-4",
            "level": 2,
            "timing": "current",
            "text": "in my state"
          },
          {
            "id": "s4-legal-5",
            "level": 2,
            "timing": "current",
            "text": "In my country"
          },
          {
            "id": "s4-legal-6",
            "level": 2,
            "timing": "future",
            "text": "What other legal steps I should take to protect my child's future?"
          }
        ]
      },
      {
        "name": "Daily Life",
        "emoji": "🗓️",
        "questions": [
          {
            "id": "s4-dailylife-1",
            "level": 1,
            "timing": "future",
            "text": "my life changed. What should I plan for?"
          },
          {
            "id": "s4-dailylife-2",
            "level": 2,
            "timing": "current",
            "text": "Day routine"
          },
          {
            "id": "s4-dailylife-3",
            "level": 2,
            "timing": "current",
            "text": "Night Routine"
          },
          {
            "id": "s4-dailylife-4",
            "level": 2,
            "timing": "current",
            "text": "Week"
          },
          {
            "id": "s4-dailylife-5",
            "level": 2,
            "timing": "current",
            "text": "Month"
          },
          {
            "id": "s4-dailylife-6",
            "level": 2,
            "timing": "current",
            "text": "Year"
          },
          {
            "id": "s4-dailylife-7",
            "level": 2,
            "timing": "current",
            "text": "Weekend"
          },
          {
            "id": "s4-dailylife-8",
            "level": 2,
            "timing": "current",
            "text": "Holidays"
          },
          {
            "id": "s4-dailylife-9",
            "level": 2,
            "timing": "current",
            "text": "Birthday"
          },
          {
            "id": "s4-dailylife-10",
            "level": 2,
            "timing": "current",
            "text": "Vacation"
          },
          {
            "id": "s4-dailylife-11",
            "level": 2,
            "timing": "future",
            "text": "Next stage"
          }
        ]
      },
      {
        "name": "Family",
        "emoji": "👪",
        "questions": [
          {
            "id": "s4-family-1",
            "level": 1,
            "timing": "future",
            "text": "what should I Expect?"
          },
          {
            "id": "s4-family-2",
            "level": 2,
            "timing": "current",
            "text": "Parents"
          },
          {
            "id": "s4-family-3",
            "level": 2,
            "timing": "current",
            "text": "sibling"
          },
          {
            "id": "s4-family-4",
            "level": 2,
            "timing": "current",
            "text": "Grandparents"
          },
          {
            "id": "s4-family-5",
            "level": 2,
            "timing": "current",
            "text": "Extended Family"
          },
          {
            "id": "s4-family-6",
            "level": 2,
            "timing": "current",
            "text": "What should I do with regard to:"
          }
        ]
      },
      {
        "name": "Crisis Management",
        "emoji": "🚨",
        "questions": [
          {
            "id": "s4-crisismanagement-1",
            "level": 1,
            "timing": "future",
            "text": "What crisis I should expect?"
          },
          {
            "id": "s4-crisismanagement-2",
            "level": 2,
            "timing": "current",
            "text": "What should I do in case of crisis?"
          }
        ]
      }
    ]
  },
  {
    "id": "s5",
    "emoji": "🎓",
    "label": "Ages 18–21",
    "sub": "Transition",
    "ageKey": "18-21",
    "minAge": 18,
    "maxAge": 21,
    "description": "The move toward adulthood — legal, financial and life planning.",
    "categories": [
      {
        "name": "Medical",
        "emoji": "🩺",
        "questions": [
          {
            "id": "s5-medical-1",
            "level": 1,
            "timing": "current",
            "text": "What is my medical routine?"
          },
          {
            "id": "s5-medical-2",
            "level": 2,
            "timing": "current",
            "text": "Does my child's medical routine need to be different"
          },
          {
            "id": "s5-medical-3",
            "level": 2,
            "timing": "future",
            "text": "What should I expect from my doctor"
          },
          {
            "id": "s5-medical-4",
            "level": 2,
            "timing": "current",
            "text": "What should I ask/tell my doctor"
          },
          {
            "id": "s5-medical-5",
            "level": 2,
            "timing": "current",
            "text": "Which Doctor should I talk to?"
          },
          {
            "id": "s5-medical-6",
            "level": 2,
            "timing": "future",
            "text": "What medical situation(s) should I expect?"
          },
          {
            "id": "s5-medical-7",
            "level": 2,
            "timing": "current",
            "text": "What do I do in case of a medical emergency?"
          },
          {
            "id": "s5-medical-8",
            "level": 2,
            "timing": "current",
            "text": "Should I consider medications/supplements?"
          },
          {
            "id": "s5-medical-9",
            "level": 2,
            "timing": "future",
            "text": "How will puberty affect my child?"
          },
          {
            "id": "s5-medical-10",
            "level": 2,
            "timing": "future",
            "text": "Should I expect other medical conditions?"
          },
          {
            "id": "s5-medical-11",
            "level": 2,
            "timing": "current",
            "text": "My child do sleep well. What can I do?"
          }
        ]
      },
      {
        "name": "Therapy",
        "emoji": "🧠",
        "questions": [
          {
            "id": "s5-therapy-1",
            "level": 1,
            "timing": "current",
            "text": "What are the most important therapies at this age?"
          },
          {
            "id": "s5-therapy-2",
            "level": 2,
            "timing": "future",
            "text": "Should I consider alternative therapies"
          },
          {
            "id": "s5-therapy-3",
            "level": 2,
            "timing": "future",
            "text": "Should I consider alternative support"
          }
        ]
      },
      {
        "name": "Education",
        "emoji": "📚",
        "questions": [
          {
            "id": "s5-education-1",
            "level": 1,
            "timing": "future",
            "text": "What High school I should look for?"
          },
          {
            "id": "s5-education-2",
            "level": 2,
            "timing": "current",
            "text": "Should I have additional home education?"
          },
          {
            "id": "s5-education-3",
            "level": 2,
            "timing": "future",
            "text": "What should I expect from schools?"
          },
          {
            "id": "s5-education-4",
            "level": 2,
            "timing": "future",
            "text": "What should expect from my child?"
          },
          {
            "id": "s5-education-5",
            "level": 2,
            "timing": "future",
            "text": "How do I plan education now and for next stage?"
          },
          {
            "id": "s5-education-6",
            "level": 2,
            "timing": "current",
            "text": "How do I communicate my child's needs"
          }
        ]
      },
      {
        "name": "Finance",
        "emoji": "💰",
        "questions": [
          {
            "id": "s5-finance-1",
            "level": 1,
            "timing": "future",
            "text": "Who will pay for education?"
          },
          {
            "id": "s5-finance-2",
            "level": 2,
            "timing": "future",
            "text": "Who will pay for therapies"
          },
          {
            "id": "s5-finance-3",
            "level": 2,
            "timing": "current",
            "text": "What other cost/income I should consider"
          }
        ]
      },
      {
        "name": "Legal",
        "emoji": "⚖️",
        "questions": [
          {
            "id": "s5-legal-1",
            "level": 1,
            "timing": "current",
            "text": "What are my rights?"
          },
          {
            "id": "s5-legal-2",
            "level": 2,
            "timing": "current",
            "text": "in my hometown"
          },
          {
            "id": "s5-legal-3",
            "level": 2,
            "timing": "current",
            "text": "in my county"
          },
          {
            "id": "s5-legal-4",
            "level": 2,
            "timing": "current",
            "text": "in my state"
          },
          {
            "id": "s5-legal-5",
            "level": 2,
            "timing": "current",
            "text": "In my country"
          },
          {
            "id": "s5-legal-6",
            "level": 2,
            "timing": "future",
            "text": "What other legal steps I should take to protect my adult child's future?"
          }
        ]
      },
      {
        "name": "Daily Life",
        "emoji": "🗓️",
        "questions": [
          {
            "id": "s5-dailylife-1",
            "level": 1,
            "timing": "future",
            "text": "my life changed. What should I plan for?"
          },
          {
            "id": "s5-dailylife-2",
            "level": 2,
            "timing": "current",
            "text": "Day routine"
          },
          {
            "id": "s5-dailylife-3",
            "level": 2,
            "timing": "current",
            "text": "Night Routine"
          },
          {
            "id": "s5-dailylife-4",
            "level": 2,
            "timing": "current",
            "text": "Week"
          },
          {
            "id": "s5-dailylife-5",
            "level": 2,
            "timing": "current",
            "text": "Month"
          },
          {
            "id": "s5-dailylife-6",
            "level": 2,
            "timing": "current",
            "text": "Year"
          },
          {
            "id": "s5-dailylife-7",
            "level": 2,
            "timing": "current",
            "text": "Weekend"
          },
          {
            "id": "s5-dailylife-8",
            "level": 2,
            "timing": "current",
            "text": "Holidays"
          },
          {
            "id": "s5-dailylife-9",
            "level": 2,
            "timing": "current",
            "text": "Birthday"
          },
          {
            "id": "s5-dailylife-10",
            "level": 2,
            "timing": "current",
            "text": "Vacation"
          },
          {
            "id": "s5-dailylife-11",
            "level": 2,
            "timing": "future",
            "text": "Next stage"
          }
        ]
      },
      {
        "name": "Family",
        "emoji": "👪",
        "questions": [
          {
            "id": "s5-family-1",
            "level": 1,
            "timing": "future",
            "text": "what should I Expect?"
          },
          {
            "id": "s5-family-2",
            "level": 2,
            "timing": "current",
            "text": "Parents"
          },
          {
            "id": "s5-family-3",
            "level": 2,
            "timing": "current",
            "text": "sibling"
          },
          {
            "id": "s5-family-4",
            "level": 2,
            "timing": "current",
            "text": "Grandparents"
          },
          {
            "id": "s5-family-5",
            "level": 2,
            "timing": "current",
            "text": "Extended Family"
          },
          {
            "id": "s5-family-6",
            "level": 2,
            "timing": "current",
            "text": "What should I do with regard to:"
          }
        ]
      },
      {
        "name": "Crisis Management",
        "emoji": "🚨",
        "questions": [
          {
            "id": "s5-crisismanagement-1",
            "level": 1,
            "timing": "future",
            "text": "What crisis I should expect?"
          },
          {
            "id": "s5-crisismanagement-2",
            "level": 2,
            "timing": "current",
            "text": "What should I do in case of crisis?"
          }
        ]
      }
    ]
  },
  {
    "id": "s6",
    "emoji": "💼",
    "label": "Ages 22–30",
    "sub": "Young adult",
    "ageKey": "22-30",
    "minAge": 22,
    "maxAge": 30,
    "description": "Adult life, ongoing support and long-term planning.",
    "categories": [
      {
        "name": "Medical",
        "emoji": "🩺",
        "questions": [
          {
            "id": "s6-medical-1",
            "level": 1,
            "timing": "current",
            "text": "What is my medical routine?"
          },
          {
            "id": "s6-medical-2",
            "level": 2,
            "timing": "current",
            "text": "Does my child's medical routine need to be different"
          },
          {
            "id": "s6-medical-3",
            "level": 2,
            "timing": "future",
            "text": "What should I expect from my doctor"
          },
          {
            "id": "s6-medical-4",
            "level": 2,
            "timing": "current",
            "text": "What should I ask/tell my doctor"
          },
          {
            "id": "s6-medical-5",
            "level": 2,
            "timing": "current",
            "text": "Which Doctor should I talk to?"
          },
          {
            "id": "s6-medical-6",
            "level": 2,
            "timing": "future",
            "text": "What medical situation(s) should I expect?"
          },
          {
            "id": "s6-medical-7",
            "level": 2,
            "timing": "current",
            "text": "What do I do in case of a medical emergency?"
          },
          {
            "id": "s6-medical-8",
            "level": 2,
            "timing": "current",
            "text": "Should I consider medications/supplements?"
          },
          {
            "id": "s6-medical-9",
            "level": 2,
            "timing": "future",
            "text": "How will adulthood affect my child?"
          },
          {
            "id": "s6-medical-10",
            "level": 2,
            "timing": "future",
            "text": "Should I expect other medical conditions?"
          },
          {
            "id": "s6-medical-11",
            "level": 2,
            "timing": "current",
            "text": "My child do sleep well. What can I do?"
          }
        ]
      },
      {
        "name": "Therapy",
        "emoji": "🧠",
        "questions": [
          {
            "id": "s6-therapy-1",
            "level": 1,
            "timing": "current",
            "text": "What are the most important therapies at this age?"
          },
          {
            "id": "s6-therapy-2",
            "level": 2,
            "timing": "future",
            "text": "Should I consider alternative therapies"
          },
          {
            "id": "s6-therapy-3",
            "level": 2,
            "timing": "future",
            "text": "Should I consider alternative support"
          }
        ]
      },
      {
        "name": "Education",
        "emoji": "📚",
        "questions": [
          {
            "id": "s6-education-1",
            "level": 1,
            "timing": "future",
            "text": "What Transition  school I should look for?"
          },
          {
            "id": "s6-education-2",
            "level": 2,
            "timing": "current",
            "text": "Should I have additional home education?"
          },
          {
            "id": "s6-education-3",
            "level": 2,
            "timing": "future",
            "text": "What should I expect from schools?"
          },
          {
            "id": "s6-education-4",
            "level": 2,
            "timing": "future",
            "text": "What should expect from my child?"
          },
          {
            "id": "s6-education-5",
            "level": 2,
            "timing": "future",
            "text": "How do I plan education now and for next stage?"
          },
          {
            "id": "s6-education-6",
            "level": 2,
            "timing": "current",
            "text": "How do I communicate my child's needs"
          }
        ]
      },
      {
        "name": "Finance",
        "emoji": "💰",
        "questions": [
          {
            "id": "s6-finance-1",
            "level": 1,
            "timing": "future",
            "text": "Who will pay for education?"
          },
          {
            "id": "s6-finance-2",
            "level": 2,
            "timing": "future",
            "text": "Who will pay for therapies"
          },
          {
            "id": "s6-finance-3",
            "level": 2,
            "timing": "current",
            "text": "What other cost/income I should consider"
          }
        ]
      },
      {
        "name": "Legal",
        "emoji": "⚖️",
        "questions": [
          {
            "id": "s6-legal-1",
            "level": 1,
            "timing": "current",
            "text": "What are my rights?"
          },
          {
            "id": "s6-legal-2",
            "level": 2,
            "timing": "current",
            "text": "in my hometown"
          },
          {
            "id": "s6-legal-3",
            "level": 2,
            "timing": "current",
            "text": "in my county"
          },
          {
            "id": "s6-legal-4",
            "level": 2,
            "timing": "current",
            "text": "in my state"
          },
          {
            "id": "s6-legal-5",
            "level": 2,
            "timing": "current",
            "text": "In my country"
          },
          {
            "id": "s6-legal-6",
            "level": 2,
            "timing": "future",
            "text": "What other legal steps I should take to protect my adult child's future?"
          }
        ]
      },
      {
        "name": "Daily Life",
        "emoji": "🗓️",
        "questions": [
          {
            "id": "s6-dailylife-1",
            "level": 1,
            "timing": "future",
            "text": "my life changed. What should I plan for?"
          },
          {
            "id": "s6-dailylife-2",
            "level": 2,
            "timing": "current",
            "text": "Day routine"
          },
          {
            "id": "s6-dailylife-3",
            "level": 2,
            "timing": "current",
            "text": "Night Routine"
          },
          {
            "id": "s6-dailylife-4",
            "level": 2,
            "timing": "current",
            "text": "Week"
          },
          {
            "id": "s6-dailylife-5",
            "level": 2,
            "timing": "current",
            "text": "Month"
          },
          {
            "id": "s6-dailylife-6",
            "level": 2,
            "timing": "current",
            "text": "Year"
          },
          {
            "id": "s6-dailylife-7",
            "level": 2,
            "timing": "current",
            "text": "Weekend"
          },
          {
            "id": "s6-dailylife-8",
            "level": 2,
            "timing": "current",
            "text": "Holidays"
          },
          {
            "id": "s6-dailylife-9",
            "level": 2,
            "timing": "current",
            "text": "Birthday"
          },
          {
            "id": "s6-dailylife-10",
            "level": 2,
            "timing": "current",
            "text": "Vacation"
          },
          {
            "id": "s6-dailylife-11",
            "level": 2,
            "timing": "future",
            "text": "Next stage"
          }
        ]
      },
      {
        "name": "Family",
        "emoji": "👪",
        "questions": [
          {
            "id": "s6-family-1",
            "level": 1,
            "timing": "future",
            "text": "what should I Expect?"
          },
          {
            "id": "s6-family-2",
            "level": 2,
            "timing": "current",
            "text": "Parents"
          },
          {
            "id": "s6-family-3",
            "level": 2,
            "timing": "current",
            "text": "sibling"
          },
          {
            "id": "s6-family-4",
            "level": 2,
            "timing": "current",
            "text": "Grandparents"
          },
          {
            "id": "s6-family-5",
            "level": 2,
            "timing": "current",
            "text": "Extended Family"
          },
          {
            "id": "s6-family-6",
            "level": 2,
            "timing": "current",
            "text": "What should I do with regard to:"
          }
        ]
      },
      {
        "name": "Crisis Management",
        "emoji": "🚨",
        "questions": [
          {
            "id": "s6-crisismanagement-1",
            "level": 1,
            "timing": "future",
            "text": "What crisis I should expect?"
          },
          {
            "id": "s6-crisismanagement-2",
            "level": 2,
            "timing": "current",
            "text": "What should I do in case of crisis?"
          }
        ]
      }
    ]
  },
  {
    "id": "s7",
    "emoji": "🏡",
    "label": "Ages 31–40",
    "sub": "Adulthood",
    "ageKey": "31-40",
    "minAge": 31,
    "maxAge": 40,
    "description": "Sustaining routines, care and the family around your adult child.",
    "categories": [
      {
        "name": "Medical",
        "emoji": "🩺",
        "questions": [
          {
            "id": "s7-medical-1",
            "level": 1,
            "timing": "current",
            "text": "What is my medical routine?"
          },
          {
            "id": "s7-medical-2",
            "level": 2,
            "timing": "current",
            "text": "Does my child's medical routine need to be different"
          },
          {
            "id": "s7-medical-3",
            "level": 2,
            "timing": "future",
            "text": "What should I expect from my doctor"
          },
          {
            "id": "s7-medical-4",
            "level": 2,
            "timing": "current",
            "text": "What should I ask/tell my doctor"
          },
          {
            "id": "s7-medical-5",
            "level": 2,
            "timing": "current",
            "text": "Which Doctor should I talk to?"
          },
          {
            "id": "s7-medical-6",
            "level": 2,
            "timing": "future",
            "text": "What medical situation(s) should I expect?"
          },
          {
            "id": "s7-medical-7",
            "level": 2,
            "timing": "current",
            "text": "What do I do in case of a medical emergency?"
          },
          {
            "id": "s7-medical-8",
            "level": 2,
            "timing": "current",
            "text": "Should I consider medications/supplements?"
          },
          {
            "id": "s7-medical-9",
            "level": 2,
            "timing": "future",
            "text": "How will adulthood affect my child?"
          },
          {
            "id": "s7-medical-10",
            "level": 2,
            "timing": "future",
            "text": "Should I expect other medical conditions?"
          },
          {
            "id": "s7-medical-11",
            "level": 2,
            "timing": "current",
            "text": "My child do sleep well. What can I do?"
          }
        ]
      },
      {
        "name": "Therapy",
        "emoji": "🧠",
        "questions": [
          {
            "id": "s7-therapy-1",
            "level": 1,
            "timing": "current",
            "text": "What are the most important therapies at this age?"
          },
          {
            "id": "s7-therapy-2",
            "level": 2,
            "timing": "future",
            "text": "Should I consider alternative therapies"
          },
          {
            "id": "s7-therapy-3",
            "level": 2,
            "timing": "future",
            "text": "Should I consider alternative support"
          }
        ]
      },
      {
        "name": "Education",
        "emoji": "📚",
        "questions": [
          {
            "id": "s7-education-1",
            "level": 1,
            "timing": "future",
            "text": "Higher Education  I should look for?"
          },
          {
            "id": "s7-education-2",
            "level": 2,
            "timing": "current",
            "text": "Should I have additional home education?"
          },
          {
            "id": "s7-education-3",
            "level": 2,
            "timing": "future",
            "text": "What should I expect from higher education?"
          },
          {
            "id": "s7-education-4",
            "level": 2,
            "timing": "future",
            "text": "What should expect from my child?"
          },
          {
            "id": "s7-education-5",
            "level": 2,
            "timing": "future",
            "text": "How do I plan education now and for next stage?"
          },
          {
            "id": "s7-education-6",
            "level": 2,
            "timing": "current",
            "text": "How do I communicate my child's needs"
          }
        ]
      },
      {
        "name": "Finance",
        "emoji": "💰",
        "questions": [
          {
            "id": "s7-finance-1",
            "level": 1,
            "timing": "future",
            "text": "Who will pay for higher education?"
          },
          {
            "id": "s7-finance-2",
            "level": 2,
            "timing": "future",
            "text": "Who will pay for therapies"
          },
          {
            "id": "s7-finance-3",
            "level": 2,
            "timing": "current",
            "text": "What other cost/income I should consider"
          }
        ]
      },
      {
        "name": "Legal",
        "emoji": "⚖️",
        "questions": [
          {
            "id": "s7-legal-1",
            "level": 1,
            "timing": "current",
            "text": "What are my rights?"
          },
          {
            "id": "s7-legal-2",
            "level": 2,
            "timing": "current",
            "text": "in my hometown"
          },
          {
            "id": "s7-legal-3",
            "level": 2,
            "timing": "current",
            "text": "in my county"
          },
          {
            "id": "s7-legal-4",
            "level": 2,
            "timing": "current",
            "text": "in my state"
          },
          {
            "id": "s7-legal-5",
            "level": 2,
            "timing": "current",
            "text": "In my country"
          },
          {
            "id": "s7-legal-6",
            "level": 2,
            "timing": "future",
            "text": "What other legal steps I should take to protect my adult child's future?"
          }
        ]
      },
      {
        "name": "Daily Life",
        "emoji": "🗓️",
        "questions": [
          {
            "id": "s7-dailylife-1",
            "level": 1,
            "timing": "future",
            "text": "my life changed. What should I plan for?"
          },
          {
            "id": "s7-dailylife-2",
            "level": 2,
            "timing": "current",
            "text": "Day routine"
          },
          {
            "id": "s7-dailylife-3",
            "level": 2,
            "timing": "current",
            "text": "Night Routine"
          },
          {
            "id": "s7-dailylife-4",
            "level": 2,
            "timing": "current",
            "text": "Week"
          },
          {
            "id": "s7-dailylife-5",
            "level": 2,
            "timing": "current",
            "text": "Month"
          },
          {
            "id": "s7-dailylife-6",
            "level": 2,
            "timing": "current",
            "text": "Year"
          },
          {
            "id": "s7-dailylife-7",
            "level": 2,
            "timing": "current",
            "text": "Weekend"
          },
          {
            "id": "s7-dailylife-8",
            "level": 2,
            "timing": "current",
            "text": "Holidays"
          },
          {
            "id": "s7-dailylife-9",
            "level": 2,
            "timing": "current",
            "text": "Birthday"
          },
          {
            "id": "s7-dailylife-10",
            "level": 2,
            "timing": "current",
            "text": "Vacation"
          },
          {
            "id": "s7-dailylife-11",
            "level": 2,
            "timing": "future",
            "text": "Next stage"
          }
        ]
      },
      {
        "name": "Family",
        "emoji": "👪",
        "questions": [
          {
            "id": "s7-family-1",
            "level": 1,
            "timing": "future",
            "text": "what should I Expect?"
          },
          {
            "id": "s7-family-2",
            "level": 2,
            "timing": "current",
            "text": "Parents"
          },
          {
            "id": "s7-family-3",
            "level": 2,
            "timing": "current",
            "text": "sibling"
          },
          {
            "id": "s7-family-4",
            "level": 2,
            "timing": "current",
            "text": "Grandparents"
          },
          {
            "id": "s7-family-5",
            "level": 2,
            "timing": "current",
            "text": "Extended Family"
          },
          {
            "id": "s7-family-6",
            "level": 2,
            "timing": "current",
            "text": "What should I do with regard to:"
          }
        ]
      },
      {
        "name": "Crisis Management",
        "emoji": "🚨",
        "questions": [
          {
            "id": "s7-crisismanagement-1",
            "level": 1,
            "timing": "future",
            "text": "What crisis I should expect?"
          },
          {
            "id": "s7-crisismanagement-2",
            "level": 2,
            "timing": "current",
            "text": "What should I do in case of crisis?"
          }
        ]
      }
    ]
  },
  {
    "id": "s8",
    "emoji": "🌳",
    "label": "Ages 40+",
    "sub": "Later life",
    "ageKey": "40+",
    "minAge": 41,
    "maxAge": 200,
    "description": "Later life — continuity of care and protecting the future.",
    "categories": [
      {
        "name": "Medical",
        "emoji": "🩺",
        "questions": [
          {
            "id": "s8-medical-1",
            "level": 1,
            "timing": "current",
            "text": "What is my medical routine?"
          },
          {
            "id": "s8-medical-2",
            "level": 2,
            "timing": "current",
            "text": "Does my child's medical routine need to be different"
          },
          {
            "id": "s8-medical-3",
            "level": 2,
            "timing": "future",
            "text": "What should I expect from my doctor"
          },
          {
            "id": "s8-medical-4",
            "level": 2,
            "timing": "current",
            "text": "What should I ask/tell my doctor"
          },
          {
            "id": "s8-medical-5",
            "level": 2,
            "timing": "current",
            "text": "Which Doctor should I talk to?"
          },
          {
            "id": "s8-medical-6",
            "level": 2,
            "timing": "future",
            "text": "What medical situation(s) should I expect?"
          },
          {
            "id": "s8-medical-7",
            "level": 2,
            "timing": "current",
            "text": "What do I do in case of a medical emergency?"
          },
          {
            "id": "s8-medical-8",
            "level": 2,
            "timing": "current",
            "text": "Should I consider medications/supplements?"
          },
          {
            "id": "s8-medical-9",
            "level": 2,
            "timing": "future",
            "text": "How will adulthood affect my child?"
          },
          {
            "id": "s8-medical-10",
            "level": 2,
            "timing": "future",
            "text": "Should I expect other medical conditions?"
          },
          {
            "id": "s8-medical-11",
            "level": 2,
            "timing": "current",
            "text": "My child do sleep well. What can I do?"
          }
        ]
      },
      {
        "name": "Therapy",
        "emoji": "🧠",
        "questions": [
          {
            "id": "s8-therapy-1",
            "level": 1,
            "timing": "current",
            "text": "What are the most important therapies at this age?"
          },
          {
            "id": "s8-therapy-2",
            "level": 2,
            "timing": "future",
            "text": "Should I consider alternative therapies"
          },
          {
            "id": "s8-therapy-3",
            "level": 2,
            "timing": "future",
            "text": "Should I consider alternative support"
          }
        ]
      },
      {
        "name": "Legal",
        "emoji": "⚖️",
        "questions": [
          {
            "id": "s8-legal-1",
            "level": 1,
            "timing": "current",
            "text": "What are my rights?"
          },
          {
            "id": "s8-legal-2",
            "level": 2,
            "timing": "current",
            "text": "in my hometown"
          },
          {
            "id": "s8-legal-3",
            "level": 2,
            "timing": "current",
            "text": "in my county"
          },
          {
            "id": "s8-legal-4",
            "level": 2,
            "timing": "current",
            "text": "in my state"
          },
          {
            "id": "s8-legal-5",
            "level": 2,
            "timing": "current",
            "text": "In my country"
          },
          {
            "id": "s8-legal-6",
            "level": 2,
            "timing": "future",
            "text": "What other legal steps I should take to protect my adult child's future?"
          }
        ]
      },
      {
        "name": "Daily Life",
        "emoji": "🗓️",
        "questions": [
          {
            "id": "s8-dailylife-1",
            "level": 1,
            "timing": "future",
            "text": "my life changed. What should I plan for?"
          },
          {
            "id": "s8-dailylife-2",
            "level": 2,
            "timing": "current",
            "text": "Day routine"
          },
          {
            "id": "s8-dailylife-3",
            "level": 2,
            "timing": "current",
            "text": "Night Routine"
          },
          {
            "id": "s8-dailylife-4",
            "level": 2,
            "timing": "current",
            "text": "Week"
          },
          {
            "id": "s8-dailylife-5",
            "level": 2,
            "timing": "current",
            "text": "Month"
          },
          {
            "id": "s8-dailylife-6",
            "level": 2,
            "timing": "current",
            "text": "Year"
          },
          {
            "id": "s8-dailylife-7",
            "level": 2,
            "timing": "current",
            "text": "Weekend"
          },
          {
            "id": "s8-dailylife-8",
            "level": 2,
            "timing": "current",
            "text": "Holidays"
          },
          {
            "id": "s8-dailylife-9",
            "level": 2,
            "timing": "current",
            "text": "Birthday"
          },
          {
            "id": "s8-dailylife-10",
            "level": 2,
            "timing": "current",
            "text": "Vacation"
          },
          {
            "id": "s8-dailylife-11",
            "level": 2,
            "timing": "future",
            "text": "Next stage"
          }
        ]
      },
      {
        "name": "Family",
        "emoji": "👪",
        "questions": [
          {
            "id": "s8-family-1",
            "level": 1,
            "timing": "future",
            "text": "what should I Expect?"
          },
          {
            "id": "s8-family-2",
            "level": 2,
            "timing": "current",
            "text": "Parents"
          },
          {
            "id": "s8-family-3",
            "level": 2,
            "timing": "current",
            "text": "sibling"
          },
          {
            "id": "s8-family-4",
            "level": 2,
            "timing": "current",
            "text": "Grandparents"
          },
          {
            "id": "s8-family-5",
            "level": 2,
            "timing": "current",
            "text": "Extended Family"
          },
          {
            "id": "s8-family-6",
            "level": 2,
            "timing": "current",
            "text": "What should I do with regard to:"
          }
        ]
      },
      {
        "name": "Crisis Management",
        "emoji": "🚨",
        "questions": [
          {
            "id": "s8-crisismanagement-1",
            "level": 1,
            "timing": "future",
            "text": "What crisis I should expect?"
          },
          {
            "id": "s8-crisismanagement-2",
            "level": 2,
            "timing": "current",
            "text": "What should I do in case of crisis?"
          }
        ]
      }
    ]
  }
];


// The 8 age stages are the milestones on the GPS path. Kept the old export name
// GPS_MILESTONES so existing screens keep working; GPS_STAGES is the clear alias.
const GPS_MILESTONES = GPS_STAGES;

// Answer scale shown under every question. One tap = one micro-answer;
// the AI layer interprets them, the app never judges an answer.
const GPS_ANSWER_OPTIONS = [
  { id: 'yes',    label: 'Yes',          emoji: '👍' },
  { id: 'no',     label: 'No',           emoji: '👎' },
  { id: 'unsure', label: 'Not sure',     emoji: '🤔' },
  { id: 'na',     label: 'Not relevant', emoji: '➖' },
];

Object.assign(window, { GPS_STAGES, GPS_MILESTONES, GPS_ANSWER_OPTIONS });
