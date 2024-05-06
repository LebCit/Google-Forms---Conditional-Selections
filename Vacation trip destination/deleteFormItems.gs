function deleteFormItems(form) {
	const items = form.getItems()
	items.forEach((item) => {
		form.deleteItem(item)
	})
}
