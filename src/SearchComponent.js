class SearchComponent {
  constructor(items) {
    this.items = items;
  }

  search(query) {
    if (!query) {
      return this.items;
    }

    const filter = query.toUpperCase();
    return this.items.filter((item) => {
      const itemText = item.toUpperCase();
      return itemText.indexOf(filter) > -1;
    });
  }
}

export default SearchComponent;
