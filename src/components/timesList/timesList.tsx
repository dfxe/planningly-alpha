import { component$, useStore, $ } from "@builder.io/qwik";
import { CanvasClock } from "../canvasClock/canvasClock";

import {
  saveToLocalStorage,
  loadFromLocalStorage,
} from "../../lib/localStorage";
export interface ListItem {
  timeList: {
    id: string;
    time: { startTime: string; endTime: string };
    description: string;
    isHere: boolean;
  }[];
}
export const TimeList = component$(() => {
  const store = useStore({
    timeList: [
      {
        id: Math.random().toString(16).slice(3, -1),
        time: { startTime: "12:33", endTime: "14:33" },
        description: "",
        isHere: false,
      },
    ],
  });

  const ping = (item): string => {
    //TODO need to cover minutes too
    if (
      +item.time.startTime.substring(0, 2) <= new Date().getHours() &&
      new Date().getHours() <= +item.time.endTime.substring(0, 2) &&
      new Date().getMinutes() <= +item.time.endTime.substring(3, 5)
    ) {
      console.log("dd");
      return "current-ping";
    }
    return "last-ping";
  };

  return (
    <>
      <CanvasClock store={store} />
      <ul
        window:onLoad$={() => {
          if (loadFromLocalStorage()) {
            //if localStorage is not empty
            store.timeList = [...loadFromLocalStorage()!];
          }
        }}
        window:onBlur$={() => {
          saveToLocalStorage(store.timeList);
        }}
        style={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        {store.timeList.map((item) => {
          return (
            <li
              onMouseEnter$={() => {
                store.timeList.map((entry) =>
                  entry.id === item.id
                    ? (entry.isHere = true)
                    : (entry.isHere = false)
                );
              }}
              onMouseLeave$={() => {
                store.timeList.map((entry) => (entry.isHere = false));
              }}
              className="time-plan-row"
            >
              <div className={ping(item)}></div>
              <div
                style={{
                  display: "flex",
                  //TODO need to swtich row to col when on mobile
                  flexDirection: "column",
                  justifyContent: "justify-between",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    marginRight: "5rem",
                    marginBottom: "1rem",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "space-around",
                    }}
                  >
                    <div style={{ display: "flex", flexDirection: "column" }}>
                      <p style={{ fontWeight: 400 }}>Start time</p>
                      <input
                        type="time"
                        value={item.time.startTime}
                        onChange$={(e) => {
                          item.time.startTime = (
                            e.target! as HTMLInputElement
                          ).value;
                          saveToLocalStorage(store.timeList);
                        }}
                      ></input>
                    </div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strok-width={1.5}
                      stroke="currentColor"
                      width={"1rem"}
                      height={"1rem"}
                      style={{ marginInline: "2rem 2rem" }}
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M8.25 4.5l7.5 7.5-7.5 7.5"
                      />
                    </svg>

                    <div style={{ display: "flex", flexDirection: "column" }}>
                      <p style={{ fontWeight: 400 }}>End time</p>
                      <input
                        type="time"
                        value={item.time.endTime}
                        onChange$={(e) => {
                          item.time.endTime = (
                            e.target! as HTMLInputElement
                          ).value;
                          saveToLocalStorage(store.timeList);
                        }}
                      ></input>
                    </div>
                    <button
                      onClick$={() => {
                        if (store.timeList.length > 1) {
                          //TODO Filter function faulty
                          store.timeList = [
                            ...store.timeList.filter((entry) => {
                              entry.id !== item.id;
                            }),
                          ];
                          saveToLocalStorage(store.timeList);
                        }
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width={1.5}
                        stroke="currentColor"
                        style={{ marginInline: "2rem" }}
                        width="1rem"
                        height="1rem"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                        />
                      </svg>
                    </button>
                  </div>
                </div>

                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                  }}
                >
                  <textarea
                    style={{ width: "20rem" }}
                    rows={3}
                    placeholder="some explanatory description of your plan..."
                    value={item.description}
                    onChange$={(e) => {
                      item.description = (e.target! as HTMLInputElement).value;
                      saveToLocalStorage(store.timeList);
                    }}
                  ></textarea>
                </div>
              </div>
              &nbsp;&nbsp;&nbsp;&nbsp;
            </li>
          );
        })}
      </ul>
      <button
        onClick$={() => {
          store.timeList = [
            ...store.timeList,
            {
              id: Math.random().toString(16).slice(3, -1),
              time: { startTime: "", endTime: "" },
              description: "",
              isHere: false,
            },
          ];
        }}
        className="add-entry-button"
      >
        Add entry
      </button>
    </>
  );
});

export default TimeList;
