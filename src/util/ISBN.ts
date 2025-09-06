// import dependencies
import isbn3 from "isbn3";

/**
 * ISBN utility functions
 * Just a simple wrapper for isbn3 library
 */
const ISBNUtil = {
    /**
     * Check if a string is a valid ISBN
     * @param ISBN - the ISBN to check
     * @returns {boolean} true if the ISBN is valid, false otherwise
     */
    isISBN: (ISBN: string): boolean => {
        const parsedISBN = isbn3.parse(ISBN);
        return parsedISBN?.isValid || false;
    },

    /**
     * Normalize an ISBN
     * @param ISBN - the ISBN to normalize (can be ISBN-10 or ISBN-13)
     * @returns {string} the normalized ISBN (ISBN-13 without hyphens)
     */
    normalizeISBN: (ISBN: string): string => {
        const parsedISBN = isbn3.parse(ISBN);
        if (parsedISBN) {
            return isbn3.asIsbn13(ISBN) || "";
        }
        return "";
    },
};

export default ISBNUtil;
