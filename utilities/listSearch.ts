export const listSearch = (list: any[], search: string) => {
  const results = [];
  /* Search Visitors for matching searchTerm */
  for (const item of list) {
    // Concat String Null Safe
    let probe = '';
    if (item.name != null) {
      probe = probe + item.name;
    }
    if (item.lastName != null) {
      probe = probe + item.lastName;
    }

    // drop all whitespace and drop case
    probe = probe.replace(/\s/g, '').toLowerCase();
    search = search.replace(/\s/g, '').toLowerCase();

    // is searchTerm in probe
    if (probe.indexOf(search) > -1) {
      results.push(item);
    }
  }
  return results;
};
