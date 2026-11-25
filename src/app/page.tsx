import { About } from "@/components/sections/About";
import { Capabilities } from "@/components/sections/Capabilities";
import { Closing } from "@/components/sections/Closing";
import { Contexts } from "@/components/sections/Contexts";
import { Evidence } from "@/components/sections/Evidence";
import { Field } from "@/components/sections/Field";
import { Hero } from "@/components/sections/Hero";
import { Problem } from "@/components/sections/Problem";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Problem />
      <Capabilities />
      <Contexts />
      <Evidence />
      {/* One Paper ground for both sections, so no sub-pixel seam shows between them. */}
      <div className="bg-paper-100">
        <About />
        <Field />
      </div>
      <Closing />
    </>
  );
}
