import { component$ } from "@builder.io/qwik";
import { QwikCity } from "@builder.io/qwik-city";
import { RouterHead } from "./components/router-head/router-head";
import Timesheet from "./components/timesheet/timesheet";

import "./styles/global.css";

export default component$(() => {
  /**
   * The root of a QwikCity site always start with the <QwikCity> component,
   * immediately followed by the document's <head> and <body>.
   *
   * Dont remove the `<head>` and `<body>` elements.
   */
  return (
    <QwikCity>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <RouterHead />
      </head>
      <body lang="en">
        <Timesheet />
      </body>
    </QwikCity>
  );
});
