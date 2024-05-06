// Global variable
const form = FormApp.openById("theIdOf_pageBreakForm")

function pageBreakFunction() {
	// Delete all items in the form
	const items = form.getItems()
	items.forEach((item) => {
		form.deleteItem(item)
	})

	// Create a list item on the first page
	const item = form.addListItem().setTitle("Where do you want to go?")

	// Create 2 pages after the first page
	const pages = [form.addPageBreakItem().setTitle("Page two"), form.addPageBreakItem().setTitle("Page three")]

	// Set list item choices and navigate to according page
	item.setChoices([item.createChoice("Page 2", pages[0]), item.createChoice("Page 3", pages[1])])

	// When reaching a selected page, submit upon completion or get back to the first page
	pages.forEach((page) => page.setGoToPage(FormApp.PageNavigationType.SUBMIT))
}
