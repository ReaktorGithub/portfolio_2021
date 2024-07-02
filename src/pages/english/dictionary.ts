import { EVerbForms } from "./enums";
import { IDictionary } from "./types";

export const replaceTemplate = [
  // что заменить, чем заменить
  ["do not", "don't"],
  ["does not", "doesn't"],
  ["did not", "didn't"],
  ["'ll ", " will "],
  ["'ll not ", " will not "],
]

export const dictionaryStub: IDictionary = {
  close: {
    id: 1,
    past: "closed",
    heShe: "closes",
    wrong: EVerbForms.REGULAR,
  },
  open: {
    id: 2,
    past: "opened",
    heShe: "opens",
    wrong: EVerbForms.REGULAR,
  },
  see: {
    id: 3,
    past: "saw",
    heShe: "sees",
    wrong: EVerbForms.WRONG,
  },
  love: {
    id: 4,
    past: "loved",
    heShe: "loves",
    wrong: EVerbForms.REGULAR,
  },
  say: {
    id: 5,
    past: "said",
    heShe: "says",
    wrong: EVerbForms.WRONG,
  },
  go: {
    id: 6,
    past: "went",
    heShe: "goes",
    wrong: EVerbForms.WRONG,
  },
  make: {
    id: 7,
    past: "made",
    heShe: "makes",
    wrong: EVerbForms.WRONG,
  },
  work: {
    id: 8,
    past: "worked",
    heShe: "works",
    wrong: EVerbForms.REGULAR,
  },
  call: {
    id: 9,
    past: "called",
    heShe: "calls",
    wrong: EVerbForms.REGULAR,
  },
  need: {
    id: 10,
    past: "needed",
    heShe: "needs",
    wrong: EVerbForms.REGULAR,
  },
  put: {
    id: 11,
    past: "put",
    heShe: "puts",
    wrong: EVerbForms.WRONG,
  },
  hear: {
    id: 12,
    past: "heard",
    heShe: "hears",
    wrong: EVerbForms.WRONG,
  },
  move: {
    id: 13,
    past: "moved",
    heShe: "moves",
    wrong: EVerbForms.REGULAR,
  },
  follow: {
    id: 14,
    past: "followed",
    heShe: "follows",
    wrong: EVerbForms.REGULAR,
  },
  catch: {
    id: 15,
    past: "caught",
    heShe: "catches",
    wrong: EVerbForms.WRONG,
  },
}
