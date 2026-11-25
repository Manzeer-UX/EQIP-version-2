import { CaseStudyPage, caseStudyMetadata } from "@/components/sections/CaseStudyPage";
import { field } from "@/content/site";

const study = field.studies.find((s) => s.slug === "enterprise-erp-modernisation")!;

export const metadata = caseStudyMetadata(study);

export default function Page() {
  return <CaseStudyPage study={study} />;
}
