const debug = require("debug")("server:db");
const chalk = require("chalk");

const fs = require("fs");
const XmlStream = require("xml-stream");
const models = require("../models");
const { slugify } = require("../utils");

class Counter {
    constructor(xml) {
        this.x = 0;
        this.y = 0;
        this.xml = xml;
        this.step = 1000;
    }
    pause = () => {
        this.x++;
        if (this.x % this.step === 0) {
            debug("pause");
            this.xml.pause();
        }
    };
    resume = () => {
        this.y++;
        if (this.x === this.y) {
            debug("resume", this.x);

            try {
                this.xml.resume();
            } catch (error) {}
        }
    };
}

async function foundModel(_id, model) {
    try {
        const result = await model.findOne({ _id });
        return result !== null;
    } catch (error) {
        debug(error);
    }
    return false;
}

async function importEntity(item, model_name, counter, model) {
    const { id, alias } = item;
    delete item.id;
    const _id = Number(id);
    const newitem = { _id, alias, ...item };

    // log("model_name", model_name);
    if (model_name === "title") {
        newitem.alias = slugify(newitem.title);
        newitem.image = newitem.image === "null" ? null : newitem.image;
    }

    // log("newitem", newitem);
    try {
        if (id) {
            const exists = await foundModel(_id, model);
            if (!exists) {
                const forsave = new model(newitem);
                const saved = await forsave.save();

                debug(saved);
            }
        }
    } catch (error) {
        debug(error);
    }
    counter.resume();
}

async function importFrom(name, model) {
    const file = `xml/${name}.xml`;
    const stream = fs.createReadStream(file);
    const xml = new XmlStream(stream);
    const counter = new Counter(xml);
    xml.collect("expdata");
    xml.on("endElement: expdata", function (item) {
        counter.pause();
        importEntity(item.$, name, counter, model);
    });
}

module.exports = async () => {
    // await importFrom("category", models.category);
    // await importFrom("label", models.label);
    // await importFrom("artist", models.artist);
    // await importFrom("format", models.format);
    // await importFrom("title", models.title);
    // await importFrom("product", models.product);
    debug(`XML init is complete ${chalk.green("✓")}`);
};
