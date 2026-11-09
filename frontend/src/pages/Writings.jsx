import PageHeader from '../components/PageHeader.jsx';
import WritingList from '../components/WritingList.jsx';
import { writings } from '../data/writings.js';

export default function Writings() {
  return (
    <>
      <PageHeader eyebrow={`${writings.length} articles`} title="Writings.">
        Notes on building for the web: frontend craft, backend reliability, and the small decisions that make software
        easier to live with.
      </PageHeader>
      <section className="shell pb-[60px]">
        <WritingList items={writings} />
      </section>
    </>
  );
}
