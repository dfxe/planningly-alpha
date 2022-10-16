import { component$ } from "@builder.io/qwik";
import Header from "../header/header";
import Footer from "../footer/footer";
import TimeList from "../timesList/timesList";
export const Timesheet = component$(() => {
  return (
    <>
      <Header />

      <h1>planningly</h1>
      <h3>no, but this time!</h3>
      <TimeList />
      <Footer />
    </>
  );
});

export default Timesheet;
