// Global variable
const form = FormApp.openById("theIdOf_vacationTripDestinationForm")

function vacationTripDestinationFunction() {
	// Delete all items in the form
	deleteFormItems(form)

	// 1. Get the continents as an array
	const continents = continentsData.map((obj) => obj.continent)

	// 2. Create a dropdown list item and set it as required
	const continentsDropdown = form.addListItem()
	continentsDropdown.setTitle("Which continent would you like to visit?")
	continentsDropdown.setHelpText("Choose a continent for your next vacation trip!")
	continentsDropdown.setRequired(true)

	// 3. Create the pages based on continents
	const pages = continents.map((continent) => form.addPageBreakItem().setTitle(continent))

	// 4. Create choices dynamically with their related pages
	const continentsChoices = continents.map((continent, index) => {
		return continentsDropdown.createChoice(continent, pages[index])
	})

	// 5. Set list item choices and navigate to according page
	continentsDropdown.setChoices(continentsChoices)

	// For each page, create a dropdown list item with the available countries for the selected continent
	pages.forEach((page) => {
		// Get the selected continent. It's the page title!
		const selectedContinentName = page.getTitle()

		// 1. Get the selected continent's countries as an array
		const selectedContinent = continentsData.find((obj) => obj.continent === selectedContinentName)
		const countries = selectedContinent ? selectedContinent.countries.map((obj) => obj.country) : []

		// 2. Create a dropdown list item and set it as required
		const countriesDropdown = form.addListItem()
		countriesDropdown.setTitle(`Which country in ${selectedContinentName} would you like to visit?`)
		countriesDropdown.setHelpText(`Choose a country in ${selectedContinentName} for your next vacation trip!`)
		countriesDropdown.setRequired(true)

		// 3. Create the pages based on countries
		const countriesPages = countries.map((country) => form.addPageBreakItem().setTitle(country))

		// 4. Create choices dynamically with their related pages
		const countriesChoices = countries.map((country, index) => {
			return countriesDropdown.createChoice(country, countriesPages[index])
		})

		// 5. Set list item choices and navigate to according page
		countriesDropdown.setChoices(countriesChoices)

		// Get the index where countriesDropdown was created in the form
		const countriesDropdownIndex = countriesDropdown.getIndex()
		// Get the index of the actual page where countriesDropdown should be moved to
		const pageIndex = page.getIndex()

		// 6. Move countriesDropdown from its actual index/position in the form to be after/under its related page
		form.moveItem(countriesDropdownIndex, pageIndex + 1)

		// For each country, create a dropdown list item with the available destinations for the selected country
		countriesPages.forEach((countryPage) => {
			// Get the selected country. It's the page title!
			const selectedCountryName = countryPage.getTitle()

			// 1. Get the selected country's destinations
			const selectedCountry = selectedContinent.countries.find((obj) => obj.country === selectedCountryName)
			const destinations = selectedCountry.destinations

			// 2. Create a dropdown list item with the destinations as choices and set it as required
			const destinationsDropdown = form.addListItem()
			destinationsDropdown.setTitle(`Which destination in ${selectedCountryName} would you like to visit?`)
			destinationsDropdown.setHelpText(
				`Choose a destination in ${selectedCountryName} for your next vacation trip!`
			)
			destinationsDropdown.setChoiceValues(destinations)
			destinationsDropdown.setRequired(true)

			// 3. Move destinationsDropdown from its actual index/position in the form to be after/under its related page
			const destinationsDropdownIndex = destinationsDropdown.getIndex()
			const countryPageIndex = countryPage.getIndex()
			form.moveItem(destinationsDropdownIndex, countryPageIndex + 1)

			// 4. Submit the choice since it's the last step in the form!
			countryPage.setGoToPage(FormApp.PageNavigationType.SUBMIT)
		})
	})
}
