import Container from "../Container";
import ShowcaseCard from "./ShowcaseCard";
import { showcaseSites } from "../../lib/showcase";

/** Cuantas tarjetas cargan con prioridad — las visibles sin hacer scroll. */
const PRIORITY_COUNT = 4;

export default function ShowcaseGrid() {
  return (
    <Container>
      <div className="grid grid-cols-2 gap-x-5 gap-y-10 md:grid-cols-3 md:gap-x-8 md:gap-y-14 lg:grid-cols-4">
        {showcaseSites.map((site, i) => (
          <ShowcaseCard key={site.id} site={site} priority={i < PRIORITY_COUNT} />
        ))}
      </div>
    </Container>
  );
}
