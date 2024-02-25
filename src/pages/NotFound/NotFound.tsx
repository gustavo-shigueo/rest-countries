import "./not_found.css";
import { A } from "@solidjs/router";
import { Header } from "src/components/Header";

export default function NotFound() {
  return (
    <>
      <Header />
      <main class="not_found">
        <h2>Not Found</h2>

        <p>
          The page you are looking for does not exist. Please, return to the{" "}
          <A href="/">home page</A>.
        </p>
      </main>
    </>
  );
}
