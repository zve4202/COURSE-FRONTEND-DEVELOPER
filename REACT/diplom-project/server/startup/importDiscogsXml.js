const { log } = require("console");
const fs = require("fs");
const XmlStream = require("xml-stream");
const models = require("../models");

class Counter {
  constructor(xml) {
    this.x = 0;
    this.y = 0;
    this.xml = xml;
    this.step = 100;
  }
  pause = () => {
    this.x++;
    if (this.x % this.step === 0) {
      console.log("pause");
      this.xml.pause();
    }
  };
  resume = () => {
    this.y++;
    if (this.x === this.y) {
      console.log("resume");
      this.xml.resume();
    }
  };
}

async function foundModel(id, model) {
  try {
    const result = await model.findOne({ _id: id });
    return result !== null;
  } catch (error) {
    console.log(error);
  }
  return false;
}

async function importLabel(item, counter) {
  const { id, name, parentLabel } = item;
  if (id) {
    const exists = await foundModel(id, models.d_label);
    if (!exists) {
      const newItem = new models.d_label({
        _id: id,
        name: name,
        parentId: parentLabel ? parentLabel.$?.id : null,
      });
      const saved = await newItem.save();

      console.log(saved);
    }
  }
  counter.resume();
}

async function importLabels() {
  var file = "xml/discogs_labels.xml";
  var stream = fs.createReadStream(file);
  var xml = new XmlStream(stream);
  const counter = new Counter(xml);
  xml.collect("label");
  xml.on("endElement: label", function (item) {
    importLabel(item, counter);
    counter.pause();
  });
}

async function importArtiat(item, counter) {
  const { id, name, realname } = item;
  if (id && name) {
    const exists = await foundModel(id, models.artist);
    if (!exists) {
      const newItem = new models.artist({
        _id: id,
        name: name,
        realname: realname,
      });
      const saved = await newItem.save();

      console.log(saved);
    }
  }
  counter.resume();
}

async function importArtists() {
  var file = "xml/discogs_artists.xml";
  var stream = fs.createReadStream(file);
  var xml = new XmlStream(stream);
  const counter = new Counter(xml);
  xml.collect("artist");
  xml.on("endElement: artist", function (item) {
    importArtiat(item, counter);
    counter.pause();
  });
}

const defaultRelese = () => ({
  images: [],
  barcodes: [],
  catNo: null,
  artist: null,
  title: null,
  label: null,
  format: null,
});

async function importReleases() {
  var file = "xml/discogs_releases.xml";
  var stream = fs.createReadStream(file);
  var xml = new XmlStream(stream);
  const counter = new Counter(xml);
  let release = defaultRelese();
  xml.collect("release");

  xml.on("endElement: image", function (item) {
    // console.log(item);
    const { type, uri, width, height } = item.$;
    if (["primary", "secondary"].includes(type) && (width === height) === 600) {
      release.images.push(uri);
    }
  });

  xml.on("endElement: artist", function (item) {
    const { id } = item;
    if (id && !release.artist) {
      release.artist = Number(id);
    }
  });

  // xml.on("endElement: title", function (item) {
  //   release.title = item.$text;
  // });

  xml.on("endElement: format", function (item) {
    const { descriptions } = item;
    const { name, qty, text } = item.$;
    // console.log({ name, qty, text, descriptions });
    if (!release.format) {
      release.format = {
        name,
        qty: Number(qty),
        text,
        description: descriptions.description,
      };
    }
  });
  xml.on("endElement: label", function (item) {
    // console.log(item);
    const { catno, id } = item.$;
    release.catNo = catno;
    release.label = Number(id);
  });

  xml.on("endElement: identifier", function (item) {
    const { type, value } = item.$;
    if (type === "Barcode") {
      let barcode = String(value).replace(/\D/gi, "");
      if (!release.barcodes.includes(barcode)) release.barcodes.push(barcode);
    }
  });

  xml.on("startElement: release", function (item) {
    release = defaultRelese();
  });

  xml.on("endElement: release", function (item) {
    const { id } = item.$;
    const { title, genres, styles, country, released, notes } = item;
    release = {
      _id: Number(id),
      ...release,
      title,
      genre: genres.genre,
      style: styles.style,
      country,
      released,
      notes,
    };
    // const barcode = barcodes.pop();
    // delete item.identifiers;
    // item.barcode = barcode;
    // console.log(item);
    console.log(release);
    //importArtiat(item, counter);
    counter.pause();
  });
}

exports.importXml = async () => {
  // importLabels();
  // await importArtists();
  importReleases();
};
