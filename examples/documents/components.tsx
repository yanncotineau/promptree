import { Prompt } from "../../src";
import { ForEach } from "../../src/components/ForEach";
import { Line } from "../../src/components/Line";
import { NewLine } from "../../src/components/NewLine";
import { Promptree } from "../../src/promptree";

export interface Document {
  name: string;
  content: string;
  author?: string;
  tags?: string[];
}
export const DocumentsList: Prompt<{ documents: Document[] }> = ({ documents }) => (
  <>
    <Line>{documents.length} relevant documents were found :</Line>
    <NewLine />
    <ForEach
      items={documents}
      separator={`--`}
      render={(d) => <DocumentComponent document={d} />}
    />
  </>
);
export const DocumentComponent: Prompt<{ document: Document }> = ({ document }) => (
  <>
    <Line>Name : {document.name}</Line>
    {document.author && <Line>Author : {document.author}</Line>}
    {document.tags && document.tags.length > 0 && (
      <Line>
        Tags :{" "}
        <ForEach items={document.tags} render={(tag) => tag} inline separator="-" />
      </Line>
    )}
    <Line>Content : {document.content}</Line>
  </>
);

