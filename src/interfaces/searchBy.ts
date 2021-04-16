/**
 * {SearchBy} @interface -> is given as argument in SearchByActions
 * but pass there @classes which implements this interface
 */
export default interface SearchBy {}

/**
 * There are three types of searches:
 * Searching by category -> use {SearchByCategory} @class in SearchByActions
 * Searching by subcategory -> use {SearchBySubcategory} @class  in SearchByActions
 * Searching by phrase -> use {SearchByPhrase} @class  in SearchByActions
 */

class SearchByCategory implements SearchBy {
  constructor(c: string) {
    this.category = c;
  }
  category: string;
}

class SearchBySubcategory {
  constructor(c: string, s: string) {
    this.category = c;
    this.subcategory = s;
  }
  category: string;
  subcategory: string;
}

class SearchByPhrase {
  constructor(p: string) {
    this.phrase = p;
  }
  phrase: string;
}

export { SearchByCategory, SearchBySubcategory, SearchByPhrase };
