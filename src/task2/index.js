import csv from "csvtojson";
import path from "path";
import fs from "fs";
import { pipeline } from "stream";

const PATH_TO_CSV_FILE = path.resolve(__dirname, "csv/books.csv");
const PATH_TO_TXT_FILE = path.resolve(__dirname, "txt/books.txt");

const onPipelineError = error => {
  if (error) {
    console.error(`An error occurred: ${error}`);
  }
};

const readStream = fs.createReadStream(PATH_TO_CSV_FILE);
const writeStream = fs.createWriteStream(PATH_TO_TXT_FILE);

pipeline(
  readStream,
  csv(),
  writeStream,
  onPipelineError
);
