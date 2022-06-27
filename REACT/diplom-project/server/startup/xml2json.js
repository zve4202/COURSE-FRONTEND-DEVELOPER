exports.xml2json = async () => {
  const xmlToJson = require("xml-to-json-stream");
  const fs = require("fs");
  const xml = require("../xml/discogs_20081014_releases.xml");
  const parser = xmlToJson({ attributeMode: true });

  // const stream = parser.createStream();
  // const jsonFile = fs.createWriteStream("jsonFile.json");
  parser.xmlToJson(xml, (err, json) => {
    if (err) {
      console.log(err);
      //error handling
    }
    console.log(json);

    //json
    //{
    //  employee: {
    //      name: "Alex"
    //  }
    //}
  });

  //   process.stdin.pipe(stream).pipe(jsonFile);
};
