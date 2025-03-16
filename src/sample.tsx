import { ForEach } from "./components/ForEach";
import { Fragment } from "./components/Fragment";
import { Line } from "./components/Line";
import { NewLine } from "./components/NewLine";
import { Prompt, Promptree } from "./promptree";

interface Document {
  name: string;
  date: Date;
  author?: string;
  tags?: string[];
  content: string;
}

interface DocumentProps { document: Document }
interface DocumentsListProps { documents: Document[] }

const DocumentsList: Prompt<DocumentsListProps> = ({ documents }) => {
  return (
    <Fragment>
      <Line>{documents.length} relevant documents were found :</Line>
      <NewLine />
      <ForEach
        items={documents}
        separator={`--`}
        render={(d) => <DocumentComponent document={d} />}
      />
    </Fragment>
  );
};

const DocumentComponent: Prompt<DocumentProps> = ({ document }) => (
  <Fragment>
    <Line>Name of the document : {document.name}</Line>
    <Line>Date : {document.date.toString()}</Line>
    {document.author && <Line>Author : {document.author}</Line>}
    {document.tags && document.tags.length > 0 && (
      <Line>
        Tags :{" "}
        <ForEach
          items={document.tags}
          render={(tag) => tag}
          separator=" / "
          inline
        />
      </Line>
    )}
    <Line>Content : {document.content}</Line>
  </Fragment>
);

// Example usage
const documents = [
  { name: "doc1", date: new Date("2025-03-16"), author: "me", content: "content1", tags: ["tag1", "tag2", "tag3"] },
  { name: "doc2", date: new Date("2025-03-16"), content: "content2" },
  { name: "doc3", date: new Date("2025-03-16"), content: "content3" },
];

console.log(Promptree.format(DocumentsList, { documents }));