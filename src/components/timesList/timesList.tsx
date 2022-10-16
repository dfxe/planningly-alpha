import { component$, useStore } from "@builder.io/qwik";
import { CanvasClock } from "../canvasClock/canvasClock";
import { colors } from "../canvasClock/canvasClock";
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
        id: "this-time-entry-num0" + "a",
        time: { startTime: "12:33", endTime: "14:33" },
        description: "",
        isHere: false,
      },
      {
        id: "this-time-entry-num-1" + "a",
        time: { startTime: "14:34", endTime: "15:39" },
        description: "",
        isHere: false,
      },
      {
        id: "this-time-entry-num-3" + "a",
        time: { startTime: "16:34", endTime: "17:39" },
        description: "",
        isHere: false,
      },
      {
        id: "this-time-entry-num-2" + "a",
        time: { startTime: "18:34", endTime: "19:39" },
        description: "",
        isHere: false,
      },
      {
        id: "this-time-entry-num-4" + "a",
        time: { startTime: "20:34", endTime: "21:39" },
        description: "",
        isHere: false,
      },
      {
        id: "this-time-entry-num-5" + "a",
        time: { startTime: "22:34", endTime: "23:39" },
        description: "",
        isHere: false,
      },
    ],
  });

  return (
    <>
      <CanvasClock store={store} />
      <ul
        style={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        {store.timeList.map((item, i) => {
          return (
            <li
              onMouseEnter$={() => {
                store.timeList.map((entry) =>
                  entry.id === item.id
                    ? (entry.isHere = true)
                    : (entry.isHere = false)
                );
                //console.table(store.timeList);
              }}
              className="time-plan-row"
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "justify-between",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    marginRight: "5rem",
                  }}
                >
                  {i === 0 ? <p>Time</p> : <></>}
                  <div style={{ display: "flex", flexDirection: "row" }}>
                    <div style={{ display: "flex", flexDirection: "column" }}>
                      <p style={{ fontWeight: 400 }}>Start time</p>
                      <input
                        type="time"
                        value={item.time.startTime}
                        onChange$={(e) => {
                          item.time.startTime = (
                            e.target! as HTMLInputElement
                          ).value;
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
                        }}
                      ></input>
                    </div>
                  </div>
                </div>

                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                  }}
                >
                  {i === 0 ? <p>Description</p> : <></>}
                  <textarea
                    cols={40}
                    rows={3}
                    value={item.description}
                    onChange$={(e) => {
                      item.description = (e.target! as HTMLInputElement).value;
                    }}
                  ></textarea>
                </div>
              </div>
              {i === 0 ? (
                <></>
              ) : (
                <button
                  disabled={store.timeList.length <= 1}
                  onClick$={() => {
                    if (store.timeList.length > 1) {
                      store.timeList = store.timeList.filter(
                        (entry) => entry.id !== item.id
                      );
                      console.log(store.timeList);
                    }
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width={1.5}
                    stroke="currentColor"
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
              )}
              &nbsp;&nbsp;&nbsp;&nbsp;
            </li>
          );
        })}
      </ul>
      <button
        disabled={
          store.timeList[store.timeList.length - 1].description !== "" &&
          store.timeList[store.timeList.length - 1].time.startTime !== "" &&
          store.timeList[store.timeList.length - 1].time.endTime !== ""
        }
        onClick$={() => {
          if (
            store.timeList[store.timeList.length - 1].time.startTime !== "" &&
            store.timeList[store.timeList.length - 1].time.endTime !== "" &&
            store.timeList.length !== colors.length
          ) {
            store.timeList = [
              ...store.timeList,
              {
                id:
                  "this-time-entry-num" +
                  (store.timeList.length + 1).toString() +
                  "a",
                time: { startTime: "", endTime: "" },
                description: "",
                isHere: false,
              },
            ];
          }
        }}
        className="add-entry-button"
      >
        Add entry
      </button>
    </>
  );
});

export default TimeList;
