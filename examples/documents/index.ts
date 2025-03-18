import Promptree from 'promptree';
import { DocumentsList } from "./components";

const documents = [
  { name: "doc1", content: "content1", tags: ["tag1", "tag2", "tag3"] },
  { name: "doc2", content: "content2", author: "alice" },
];
console.log(Promptree.format(DocumentsList, { documents }));
// 2 relevant documents were found :

// Name : doc1
// Tags : tag1-tag2-tag3
// Content : content1
// --
// Name : doc2
// Author : alice
// Content : content2