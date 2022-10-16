const gameStateKey = "planState";

type StoredPlanState = {
  id: string;
  time: string;
  description: string;
};

export const saveToLocalStorage = (planState: StoredPlanState) => {
  localStorage.setItem(
    gameStateKey,
    JSON.stringify({
      id: planState.id,
      time: planState.time,
      description: planState.description,
    })
  );
};

export const loadFromLocalStorage = () => {
  const state = localStorage.getItem(gameStateKey);
  if (state) {
    let nextState: StoredPlanState = JSON.parse(state);
    nextState = {
      id: nextState.id,
      time: nextState.time,
      description: nextState.description,
    };
    return nextState;
  }
  return null;
};
