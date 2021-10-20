export default {
  searchFailure: `Sorry, there are no movies matching your search query. Please try again.`,
  watchedBtnTrue: 'remove from watched',
  watchedBtnFalse: 'add to watched',
  queueBtnTrue: 'remove from queue',
  queueBtnFalse: 'add to queue',
  emptyLibraryList(listName) {
    return `Sorry, it seems like you don't have any saved movies in ${listName} list.`;
  },
};
