const fetch = require("node-fetch");

const jsdom = require("jsdom");
const { JSDOM } = jsdom;

const fetchStories = async () => {
    const siteUrl = "https://time.com";
    const resp = await fetch(siteUrl);

    if (resp.ok) {
        const content = await resp.text();
        const dom = new JSDOM(content);
        const { document } = dom.window;

        const storiesDataAttribute = '[data-module_name="Latest Stories"]'

        const selectedStoriesSections = document.querySelectorAll(storiesDataAttribute);
        const storiesSection = selectedStoriesSections.length > 0 ? selectedStoriesSections[0] : undefined;

        if (storiesSection) {
            const listItems = storiesSection.getElementsByTagName("li");
            const stories = Array.from(listItems).map((item) => {
                const storyLink = item.getElementsByTagName("a")[0];
                const href = storyLink.attributes.getNamedItem("href");
                return ({
                    title: storyLink.innerHTML,
                    link: href ? `${siteUrl}${href.value}` : ""
                });
            });

            return stories;
        }

        throw new Error("Stories section was not found");
    }

    throw new Error("Error while retrieving stories");
}

module.exports = fetchStories;