import { component$, useClientEffect$, $, useRef } from "@builder.io/qwik";
import { ListItem } from "../timesList/timesList";
export const colors = [
  "#54709a",
  "#7176a4",
  "#8f7bab",
  "#ab80ac",
  "#c586aa",
  "#db8da5",
  "#ec989e",
  "#f8a497",
  "#feb491",
  "#ffc58f",
  "#fbb67b",
  "#f6a669",
  "#f19657",
  "#ed8546",
  "#e87437",
  "#e36128",
  "#de4d1b",
  "#d9330e",
  "#d30003",
].reverse();
interface Props {
  store: ListItem;
}
export const CanvasClock = component$(({ store }: Props) => {
  const canvasRef = useRef<HTMLCanvasElement>();

  const renderTime = $((ctx: CanvasRenderingContext2D | null) => {
    if (!ctx) {
      return;
    }

    const formatTime = (time: string): string[] => {
      return time.split(":");
    };
    const now = new Date();
    //const today = now.toDateString();
    //const time = now.toLocaleTimeString();
    const hrs = now.getHours();
    const min = now.getMinutes();
    const sec = now.getSeconds();
    const mil = now.getMilliseconds();
    const smoothsec = sec + mil / 1000;
    const smoothmin = min + smoothsec / 60;
    //round corners for arc
    ctx.lineCap = "round";
    ctx.strokeStyle = "#ccc";
    ctx.lineWidth = 20;
    ctx.shadowBlur = 0;
    ctx.shadowColor = "#ccc";
    // background
    const gradient = ctx.createRadialGradient(160, 160, 5, 160, 160, 300);
    gradient.addColorStop(0, "white");
    gradient.addColorStop(1, "white");
    ctx.fillStyle = gradient;
    //ctx.fillStyle = "rgba(0 ,0 ,0, 1)";
    ctx.fillRect(0, 0, 500, 500);

    // hours
    ctx.beginPath();
    ctx.arc(
      160,
      160,
      135, //start angle
      (Math.PI / 180) * 270,
      (Math.PI / 180) * (hrs * 30 - 90)
    );
    ctx.stroke();
    let i = 0;
    ctx.strokeStyle = "#ccc";
    // minutes
    ctx.beginPath();
    ctx.arc(
      160,
      160,
      105,
      (Math.PI / 180) * 270,
      (Math.PI / 180) * (smoothmin * 6 - 90)
    );

    ctx.stroke();
    for (const item of store.timeList) {
      // plan time
      // hours start time
      ctx.strokeStyle = colors[++i];

      if (!item.isHere) {
        ctx.lineWidth = 20;
      } else {
        //highlight
        ctx.lineWidth = 35;
        ctx.beginPath();
        ctx.arc(
          160,
          160,
          105,
          (Math.PI / 180) * (+formatTime(item.time.startTime)[1] * 6 - 90),
          (Math.PI / 180) * (+formatTime(item.time.endTime)[1] * 6 - 90)
        );

        ctx.stroke();
      }
      ctx.beginPath();
      ctx.arc(
        160,
        160,
        135, // radius
        (Math.PI / 180) *
          ((+formatTime(item.time.startTime)[0] - 12) * 30 - 90),
        (Math.PI / 180) * ((+formatTime(item.time.endTime)[0] - 12) * 30 - 90)
      );
      ctx.stroke();
    }

    i = 0;
    ctx.strokeStyle = "#ccc";
    // minutes

    // seconds
    ctx.beginPath();
    ctx.arc(
      160,
      160,
      75,
      (Math.PI / 180) * 270,
      (Math.PI / 180) * (smoothsec * 6 - 90)
    );
    ctx.stroke();
    /* ctx.fillStyle = "rgba(00, 255, 255, 1)";
    ctx.fillText(today, 175, 250);

    ctx.fillStyle = "rgba(00, 255, 255, 1)";
    ctx.fillText(time + ":" + mil, 175, 280); */
  });

  useClientEffect$(() => {
    const interval = setInterval(() => {
      renderTime(canvasRef.current!.getContext("2d"));
    }, 100);
    return () => clearInterval(interval);
  });

  return <canvas ref={canvasRef} width="320" height="320"></canvas>;
});

export default CanvasClock;
