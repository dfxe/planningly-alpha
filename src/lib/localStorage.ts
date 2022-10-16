const planStateKey = "planState";

export type StoredPlanState = {
  id: string;
  time: { startTime: string; endTime: string };
  description: string;
  isHere: boolean;
}[];

export const saveToLocalStorage = (planState: StoredPlanState) => {
  localStorage.setItem(planStateKey, JSON.stringify(planState));
};

export const loadFromLocalStorage = () => {
  const state = localStorage.getItem(planStateKey);
  if (state) {
    let nextState: StoredPlanState = JSON.parse(state);

    return nextState;
  }
  return null;
};
