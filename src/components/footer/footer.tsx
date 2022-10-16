import { component$ } from "@builder.io/qwik";
export const Footer = component$(() => {
  return (
    <footer>
      <p style={{ textAlign: "center", color: "black" }}>
        Planningly saves your plan to your browser's local storage. <br />
        None of your inputs are being sent to a remote server. <br />
        <br />
        Made by{" "}
        <a
          href="https://www.github.com/dfxe"
          rel="noopener noreffer"
          target="_blank"
        >
          dfxe
        </a>
      </p>
    </footer>
  );
});

export default Footer;
