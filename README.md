# Welcome to FootnoteGenius

FootnoteGenius is your solution for effortlessly enhancing your HTML web pages with footnotes. It simplifies the process, allowing you to focus on your content.

## Key Features:

- **Seamless Integration:** Embed footnotes directly into your HTML code with ease, ensuring a polished and professional appearance for your web content.

- **Customizable Styling:** FootnoteGenius adds classes to all elements, simplifying the design adjustments for your page.

- **User-Friendly:** With straightforward instructions, FootnoteGenius makes customizing the look of your footnotes a breeze.

- **Cross-Browser Compatibility:** Rest assured that your footnotes will display correctly across various web browsers, providing a seamless reading experience for all users.

- **Efficient Workflow:** Save time and concentrate on your content creation, as FootnoteGenius automates the footnote numbering and referencing process.

## How to Use:

1. Add the `footnote-genius.min.js` script to your HTML document.

2. Wherever you want a footnote reference, insert a `<sup>` element with the `html-footnote` class. Place the contents of the footnote inside it, excluding the list number.

3. Create a container div (or any other element) where you want the footnotes to appear and add the `html-footnotes-container` class to it.

4. Call `FootnoteGenius.init()` when your document is ready.

## Customize Your Footnotes

Tailor your footnotes effortlessly using the `data-fn-` attributes **within the container**. This attribute allows you to group footnotes, adjust their visual presentation, and establish links between references and footnotes with ease.

- **Grouping Footnotes:** To group footnotes, specify a name for the group using the `data-fn-group="name"` attribute. Be sure to use this attribute on **both** the `<sup>` element and the container.

- **Numbering Style:** The default numbering style is `1 2 ...`, but you can change it using the `data-fn-index-style` attribute on the container. It accepts the following values:
  - `data-fn-index-style="i"` for Roman numerals.
  - `data-fn-index-style="I"` for uppercase Roman numerals.
  - `data-fn-index-style="ab"` for lettered list.
  - `data-fn-index-style="AB"` for uppercase lettered list.
  - `data-fn-index-style="*"` for a starred list.

- **Brackets:** By default, brackets `()` are added for reference and footnote. You can modify the brackets using the `data-fn-brackets="[]"` attribute on the container or remove them using `data-fn-brackets="false"`.

- **Creating Links:** To add a link from the reference to the footnote, simply include the `data-fn-create-links` attribute on the container.

- **Return Links:** To add a return link from the footnote to the reference, include the `data-fn-create-return-links` attribute on the container.

I trust you'll find it enjoyable to use! :)
