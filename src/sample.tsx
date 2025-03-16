// src/sample.tsx
import { Promptree, Fragment, Line, PromptComponent } from "./promptree";

interface DocumentProps {
  document: {
    name: string;
    date: Date;
    author?: string;
    content: string;
  };
}

interface DocumentsListProps {
  documents: DocumentProps["document"][];
}

const DocumentsList: PromptComponent<DocumentsListProps> = ({ documents }) => {
  return (
    <Fragment>
      <Line>{documents.length} relevant documents were found :</Line>
      {Promptree.join(
        documents.map((d) => <DocumentComponent document={d} />),
        "\n---\n"
      )}
    </Fragment>
  );
};

const DocumentComponent: PromptComponent<DocumentProps> = ({ document }) => {
  return (
    <Fragment>
      <Line>Name of the document : {document.name}</Line>
      <Line>Date : {document.date.toString()}</Line>
      {document.author && <Line>Author : {document.author}</Line>}
      <Line>Content : {document.content}</Line>
    </Fragment>
  );
};

// Example usage
const documents = [
  { name: "doc1", date: new Date("2025-03-16T13:26:31+01:00"), author: "me", content: "content1" },
  { name: "doc2", date: new Date("2025-03-16T13:26:31+01:00"), content: "content2" },
  { name: "doc3", date: new Date("2025-03-16T13:26:31+01:00"), content: "content3" },
];

console.log(Promptree.format(DocumentsList, { documents }));